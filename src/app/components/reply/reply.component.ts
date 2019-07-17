import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer-support/customer-service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  replyid;
  show;
  constructor(private support : CustomerService) { }

  ngOnInit() {
    window.scroll(0,0);
    this.replyid =localStorage.getItem('queryidget');
    alert(this.replyid);
    this.showrecord();
  }
  showrecord(){
    this.support.eachview(this.replyid).subscribe(data => {
     
this.show = data.reply_ticket;
alert(this.show);
console.log(this.show);
    })
  }

}
