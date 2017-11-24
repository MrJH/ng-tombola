import { Component, OnInit } from '@angular/core';
import { TombolaItem } from './tombolaItem';
import { TombolaService } from './tombola.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';


@Component({
  selector: 'app-tombola',
  templateUrl: './tombola.component.html',
  styleUrls: ['./tombola.component.scss']
})
export class TombolaComponent implements OnInit {

  public tombolaItems: TombolaItem[] = [];

  public notFound = '';
  public maxItemCount = 20;

  constructor(
    private tombolaService: TombolaService,
    protected localStorage: AsyncLocalStorage
  ) { }

  ngOnInit() {
    // this.getListOfTombolaItems()
  }

  public onEnter(id: string) {
    this.addToCurrentTombolaItems(id);
    id = '';
  }

  public reload() {
    this.tombolaItems = [];
    this.notFound = '';
  }

  public addToCurrentTombolaItems(id: string){
    console.log('id', id);
    this.notFound = '';

    this.localStorage.getItem<TombolaItem>('item_' + id).subscribe((item) => {
      if(item) {
        item.showed.push(new Date());
        this.localStorage.setItem('item_' + id, item).subscribe(() => {});
          this.addToItems(item);
      } else {
        this.tombolaService.findInTombolaItems(id)
          .then((item: TombolaItem) => {
            if(!item) {
              this.notFound = id;
            } else {
              item.showed.push(new Date());
              this.localStorage.setItem('item_' + id, item).subscribe(() => {});
              this.addToItems(item);
            }
          }).catch(() => {
            console.log("not found!");
            this.notFound = id;
          });
      }

    });
  }

  private addToItems(item: TombolaItem) {
    if (this.tombolaItems.length > this.maxItemCount){
      this.tombolaItems.pop();
    }
    this.tombolaItems = [item,...this.tombolaItems];
  }

  public getTombolaItemById(id: string) {
    console.log('id', id);
    this.notFound = '';
    this.tombolaService.findInTombolaItems(id)
      .then((item: TombolaItem) => {
        if(!item) {
          this.notFound = id;
        }
        this.tombolaItems = [item];
      }).catch(() => {
        console.log("not found!");
        this.notFound = id;
      });
  }

  private getListOfTombolaItems() {
    this.tombolaService.getTombolaItems()
    .then((tombolaItems: TombolaItem[]) => {
      console.log('tombolaItems', tombolaItems);
      this.tombolaItems = tombolaItems;
    });
  }



}
