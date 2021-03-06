import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LocalStorageCache } from './localStorage/local-storage-cache';
import { Cache } from './сache/cache';
import { HttpCache } from './httpCacheService/http-cache.service';
import { IndexedDbCache } from './indexedDb/indexed-db-cache.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js' /*, {enabled: environment.production}*/)
  ],
  providers: [
    { provide: Cache, useClass: IndexedDbCache },
    HttpCache,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
