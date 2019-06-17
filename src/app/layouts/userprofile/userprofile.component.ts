import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  w3_close() {
    document.getElementById("mySidebar").style.width = "0";
  }

}
