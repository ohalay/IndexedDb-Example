import { Cache } from '../сache/cache';
import { IEntity } from '../сache/ientity';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IndexedDbCache implements Cache {

  private tableName = 'httpResponces';

  getDb(): Observable<IDBDatabase> {
    const dbName = 'cache';
    return Observable.create(observer => {
      const req = window.indexedDB.open(dbName, 1);
      req.onsuccess = (e) => {
          const db = (<any>event.target).result;
          observer.next(db);
          db.close();
          observer.complete();
      };
      req.onupgradeneeded = (e: IDBVersionChangeEvent) => {
          const db = (<any>e.target).result;
            const obj = db.createObjectStore(this.tableName, { keyPath: 'id' });
            obj.createIndex('exp', 'expiryDate');
            const transaction = (<any>e.target).transaction;
            transaction.oncomplete = (event) => {
                observer.next(db);
                db.close();
                observer.complete();
            };
      };
      req.onblocked = event => observer.error('IndexedDB is blocked');
      req.onerror = (e: ErrorEvent) => observer.error(e.error);
    });
  }

  add<T>(key: string, data: T) {
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + environment.cacheDuration);

    const entity: IEntity<T> = {
      id: key,
      data,
      expiryDate: currentDate
    };

    this.getDb().subscribe(db => {
      db.transaction(this.tableName, 'readwrite')
      .objectStore(this.tableName)
      .add(entity);
    });
  }

  remove(key: string) {
    this.getDb().subscribe(db => {
      const transaction = db.transaction(this.tableName, 'readwrite');
      this.removeInTransaction(key, transaction);
    });
  }
  private removeInTransaction(key: string, transaction: IDBTransaction) {
      transaction.objectStore(this.tableName)
        .delete(key);
  }

  get<T>(key: string): Observable<T> {
    return Observable.create(observer => {
      this.getDb().subscribe(db => {
        const transaction = db.transaction(this.tableName, 'readwrite');
        const req = transaction.objectStore(this.tableName)
          .get(key);

        req.onsuccess = e => {
          let isExpired = false;
          if (req.result && req.result.expiryDate < new Date()) {
            this.removeInTransaction(key, transaction);
            isExpired = true;
          }
          observer.next(req.result && !isExpired
            ? req.result.data
            : null );
          observer.complete();
        };

        req.onerror = (e: ErrorEvent) => {
          observer.error(e.error);
        };
      });
    });
  }
}
