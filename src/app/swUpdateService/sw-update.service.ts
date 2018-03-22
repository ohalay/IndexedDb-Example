import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class SwUpdateService {

  constructor(updates: SwUpdate) {
    updates.available.subscribe(event => {
      // TODO
    });
  }
}
