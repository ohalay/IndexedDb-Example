import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpCacheServiceService } from './httpCacheService/http-cache-service.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private httpCacheServiceService: HttpCacheServiceService) {
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
