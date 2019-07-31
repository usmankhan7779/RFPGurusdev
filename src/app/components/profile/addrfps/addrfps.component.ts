import { Component, OnInit } from '@angular/core';
import { AgancyPricingService} from '../agancypricing/agancypricing.service';
@Component({
  selector: 'app-addrfps',
  templateUrl: './addrfps.component.html',
  styleUrls: ['./addrfps.component.css']
})
export class AddrfpsComponent implements OnInit {

  constructor(private _serv1 : AgancyPricingService) { }
agen;
states;
subcat;
category;
sub_categories;
  ngOnInit() {
  }
  select_state() {
    
    this._serv1.admindropdown(this.states).subscribe(
      data => {
       
        if (data.Agencies) {
        this.agen = data.Agencies;

        }
      

      })
  
  // if (this.states) {
  //   delete this.agencies
  //   delete this.cates;
  //   delete this.subcate;
  // }

}

remove1(val, index){
  this.subcat.splice(index, 1);
}
remove(val, index) {
  this.category.splice(index, 1);
  
}
subcategory(value) {
  this._serv1.rfpsubcat(value).subscribe(
    data => {
      this.sub_categories = data.sub_categories;
    }
  )
}
}
