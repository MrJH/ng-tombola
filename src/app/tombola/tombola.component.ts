import { Component, OnInit } from '@angular/core';
import { TombolaItem } from './tombolaItem';
import { TombolaService } from './tombola.service';

@Component({
  selector: 'app-tombola',
  templateUrl: './tombola.component.html',
  styleUrls: ['./tombola.component.scss']
})
export class TombolaComponent implements OnInit {

  public tombolaItems: TombolaItem[] = [];

  public notFound = '';

  constructor(private tombolaService: TombolaService) { }

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

    this.tombolaService.findInTombolaItems(id)
      .then((item: TombolaItem) => {
        if(!item) {
          this.notFound = id;
        } else {
          if (this.tombolaItems.length > 9){
            this.tombolaItems.pop();
          }
          this.tombolaItems = [item,...this.tombolaItems];
        }
      }).catch(() => {
        console.log("not found!");
        this.notFound = id;
      });
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
