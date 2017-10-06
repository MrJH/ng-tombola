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

  public notFound = false;

  constructor(private tombolaService: TombolaService) { }

  ngOnInit() {
    // this.getListOfTombolaItems()
  }

  public onEnter(id: string) {
    this.getTombolaItemById(id);
    id = '';
  }

  public getTombolaItemById(id: string) {
    console.log('id', id);
    this.notFound = false;
    this.tombolaService.findInTombolaItems(id)
      .then((item: TombolaItem) => {
        if(!item) {
          this.notFound = true;
        }
        this.tombolaItems = [item];
      }).catch(() => {
        console.log("not found!");
        this.notFound = true;
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
