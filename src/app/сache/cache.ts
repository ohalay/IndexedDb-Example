import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class Cache {

    abstract add<T>(key: string, data: T);

    abstract remove(key: string);

    abstract get<T>(key: string): Observable<T>;
}
