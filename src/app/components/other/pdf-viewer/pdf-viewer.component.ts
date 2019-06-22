import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  pdfSrc: string ;
  a;
  b;

  constructor() { }
  // https://storage.rfpgurus.com/bplrfpgurus/794940-Bid-Ad-Lake-Elmo-Regional-Park-Reserve-Improvements
  ngOnInit() {
    // alert(localStorage.getItem('web_info'))
    // this.pdfSrc = localStorage.getItem('web_info')
this.a = 'https://storage.rfpgurus.com/bplrfpgurus/'
this.b='794940-Bid-Ad-Lake-Elmo-Regional-Park-Reserve-Improvements'
    // https://storage.rfpgurus.com/bplrfpgurus/794917-Water-10794916.zip
    
    this.pdfSrc = this.a +this.b
    alert(this.pdfSrc)
    console.log(this.pdfSrc)
  }

}
