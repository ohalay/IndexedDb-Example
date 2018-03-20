import { Cache } from '../сache/cache';
import { IEntity } from '../сache/ientity';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocalStorageCache implements Cache {

    add<T>(key: string, data: T): T {
        const currentDate = new Date();
        currentDate.setSeconds(currentDate.getSeconds() + environment.cacheDuration);

        const entity: IEntity<T> = {
            expiryDate: currentDate,
            data
        };
        localStorage.setItem(key, JSON.stringify(entity));

        return data;
    }

    remove(key: string) {

        localStorage.removeItem(key);
    }

    get<T>(key: string): Observable<T> {

        const value = localStorage.getItem(key);
        if (!value) {
            return null;
        }

        const entity: IEntity<T>  = JSON.parse(value);
        if (!entity || new Date(entity.expiryDate) <= new Date()) {
            return null;
        }

        return Observable.of(entity.data);
    }
}
