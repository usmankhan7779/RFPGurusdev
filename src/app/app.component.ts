import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from './services/seoService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  status;
  constructor(private router: Router) { }

  ngAfterViewInit() {
  }


}
