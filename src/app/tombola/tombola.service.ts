import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {TombolaItem} from './tombolaItem';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TombolaService {

  private tombolaUrl = 'assets/Tombola2013-Samstag.json';

  constructor(private http:Http) { }

  getTombolaItems(): Promise<TombolaItem[]> {
    return this.http.get(this.tombolaUrl)
             .toPromise()
             .then(response => {
               const data = response.json();
               console.log('response', data);
               return data as TombolaItem[]
             })
             .catch(this.handleError);
}

// findInTombolaItems(id): Promise<TombolaItem> {
//   return this.getTombolaItems()
//     .then(tombolaItems: TombolaItem[] => {
//       tombolaItems.filter(tombolaItem: TombolaItem => tombolaItem.id === id)
//     });
//   }

private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}

}
