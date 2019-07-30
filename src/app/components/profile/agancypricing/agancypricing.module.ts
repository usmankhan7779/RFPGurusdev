// import { PricingService } from './pricing.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
// import { PricingComponent } from './pricing.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
// import { PaymentmethodsService } from '../../profile/paymentmethods/paymentmethods.service';
import {CountdownModule} from "ng2-countdown-timer";
import { MainService } from 'src/app/services/main.service';

const routes: Routes = [
 
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    CountdownModule,
    TextMaskModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers: []
})
export class PricingModule { }
