import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpCache } from './httpCacheService/http-cache.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private httpCacheServiceService: HttpCache) {
  }

  ngOnInit(): void {
    this.updateTitle();
  }

  updateTitle(): void {

    this.httpCacheServiceService.get('values')
      .subscribe(resp => {
        this.title = <string>resp;
      });
  }
}
