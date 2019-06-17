import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  w3_open() {
    document.getElementById("mySidebar").style.width = "250px";
  }

}
