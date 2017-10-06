import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {TombolaItem} from './tombolaItem';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TombolaService {

  private tombolaUrl = 'assets/Tombola2013-Samstag.json';

  constructor(private http:Http) { }

  public getTombolaItems(): Promise<TombolaItem[]> {
    return this.http.get(this.tombolaUrl)
             .toPromise()
             .then(response => {
               const data = response.json();
               console.log('response', data);
               return data as TombolaItem[]
             })
             .catch(this.handleError);
}

public findInTombolaItems(id): Promise<TombolaItem> {
  // console.log('findInTombolaItems 1', id);
  return this.getTombolaItems()
    .then((tombolaItems) => {
      // console.log('findInTombolaItems 2', id);
      return tombolaItems.filter((tombolaItem: TombolaItem) => {
        // console.log('findInTombolaItems 3', id, tombolaItem);
        return tombolaItem.id === parseInt(id);
      })[0];
    })
    // .catch(this.handleError);
};

private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}

}
