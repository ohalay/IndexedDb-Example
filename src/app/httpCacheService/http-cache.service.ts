import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cache } from '../сache/cache';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';




@Injectable()
export class HttpCache {

  constructor(private http: HttpClient, private cache: Cache) {}

  get<T>(partialUrl: string): Observable<T> {

    return this.cache.get<T>(partialUrl)
    .pipe(
      switchMap(res => res
        ? Observable.of(res)
        : this.http.get<T>(`${environment.apiUrl}/${partialUrl}`)
          .do(httpRes => this.cache.add<T>(partialUrl, httpRes))
       )
     );
  }

}
