import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
  // status: boolean = false;
  constructor(private route: Router) { }
  url;
  ngOnInit() {
    this.url = this.route.url;
    // || 'find-rfp' || '' || '' || '' || '' || '' || '' || ''
    console.log("url: "+this.url);
    if (this.url == 'latest-rfp') {
      // this.status = true;
    }
  }

  w3_open() {
    document.getElementById("mySidebar").style.width = "250px";
  }

}
