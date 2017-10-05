import { Component, OnInit } from '@angular/core';
import { TombolaItem } from './tombolaItem';
import { TombolaService } from './tombola.service';

@Component({
  selector: 'app-tombola',
  templateUrl: './tombola.component.html',
  styleUrls: ['./tombola.component.css']
})
export class TombolaComponent implements OnInit {

  public tombolaItems: TombolaItem[];

  constructor(private tombolaService: TombolaService) { }

  ngOnInit() {
    this.tombolaService.getTombolaItems()
    .then((tombolaItems: TombolaItem[]) => {
      console.log('tombolaItems', tombolaItems);
      this.tombolaItems = tombolaItems;
    });
  }



}
