import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TombolaItem } from './tombolaItem';
import { TombolaService } from './tombola.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-tombola',
  templateUrl: './tombola.component.html',
  styleUrls: ['./tombola.component.scss']
})
export class TombolaComponent implements OnInit {

  private yearAndDayPrefix = "2017-";
  private yearAndDay: string;
  public day = "Samstag";
  private localStorageItemPrefix: string;
  public tombolaItems: TombolaItem[] = [];

  public notFound = '';
  public maxItemCount = 20;

  constructor(
    private tombolaService: TombolaService,
    protected localStorage: AsyncLocalStorage,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.getListOfTombolaItems()
    this.route.queryParamMap
        .map((params: Params) => params.params)
        .subscribe( (params) => {
            if(params){
              if(params['tag']) {
               this.day = params['tag'];
             } else {
               this.day = "Samstag"
             }
             if(params['reset'] && params['reset'] === 'machEsWirklich') {
               this.localStorage.clear().subscribe(() => {});
             }
           } else {
             this.day = "Samstag"
           }
           this.yearAndDay = this.yearAndDayPrefix + this.day;
           this.localStorageItemPrefix = this.yearAndDay + '_';
           console.log('set yearAndDay', this.yearAndDay);

           let storedItems = [];
           Array.from({length:500},(v,k)=>k+1).forEach((index) => {
               const id = this.localStorageItemPrefix + index;
               console.log(id);
               this.localStorage.getItem(id).subscribe((item) => {
                   if(item) {
                       storedItems.push(item);
                   }
               });
           });
           console.log(storedItems);
           //var blob = new Blob([storedItems], {type: "text/plain;charset=utf-8"});
           //FileSaver.saveAs(blob, "Tombola-Ausgabe-2017.json");

         });


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

    console.log('this.yearAndDay', this.yearAndDay);
    this.localStorage.getItem<TombolaItem>(this.localStorageItemPrefix + id).subscribe((item) => {
      if(item) {
        item.showed.push(new Date());
        this.localStorage.setItem(this.localStorageItemPrefix + id, item).subscribe(() => {});
          this.addToItems(item);
      } else {
        this.tombolaService.findInTombolaItems(id, this.yearAndDay)
          .then((item: TombolaItem) => {
            if(!item) {
              this.notFound = id;
            } else {
              item.showed.push(new Date());
              this.localStorage.setItem(this.localStorageItemPrefix + id, item).subscribe(() => {});
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
    this.tombolaService.findInTombolaItems(id, this.yearAndDay)
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
    this.tombolaService.getTombolaItems(this.yearAndDay)
    .then((tombolaItems: TombolaItem[]) => {
      console.log('tombolaItems', tombolaItems);
      this.tombolaItems = tombolaItems;
    });
  }



}
