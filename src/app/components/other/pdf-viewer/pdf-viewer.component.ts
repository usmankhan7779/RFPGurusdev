import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllRfpsService } from '../../all/all-rfps/all-rfps.service';
import swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css'],
  providers: [ AllRfpsService]
})
export class PdfViewerComponent implements OnInit {
  pdfSrc;
  a;
  b;
  query ;

  constructor(private route: ActivatedRoute,private _serv: AllRfpsService) { }
  // https://storage.rfpgurus.com/bplrfpgurus/794940-Bid-Ad-Lake-Elmo-Regional-Park-Reserve-Improvements
  ngOnInit() {
  
    this.route.queryParams
    .subscribe(params => {
      this.query = params['query']
    })

    this.pdfSrc = 'http://192.168.29.223:8000/testpdf/'+this.query
    // this.pdfSrc = this.get_download_file();
    // this.get_download_file();
    console.log(this.pdfSrc)
    // this.pdfSrc = this.a +this.b
    // alert(this.pdfSrc)
    console.log(this.pdfSrc)
  }
   get_download_file() {
    // alert(info)
    this.pdfSrc =   this._serv.view_filedownload(this.query).subscribe(
      data => {
        // if (data['status'] = "200") {
          swal(
            'File Downloaded Successfully!',
            '',
            'success'
          )
        // }
      });
  }

}
