import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cache } from '../сache/cache';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map, mapTo } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';



@Injectable()
export class HttpCache {

  constructor(private http: HttpClient, private cache: Cache) {}

  get<T>(partialUrl: string): Observable<T> {

    const observable = this.cache.get<T>(partialUrl);

    if (observable) {
     return observable;
    }

    return this.http.get<T>(`${environment.apiUrl}/${partialUrl}`)
      .do(res => this.cache.add<T>(partialUrl, res));
      // .pipe(
      //   map(res => this.cache.add<T>(partialUrl, res))
      // );
  }

}
