import { HttpClientModule } from '@angular/common/http';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRfpsComponent } from './all-rfps.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';


const routes: Routes = [
  {
    path: '', component: AllRfpsComponent
  }
]
@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    TextMaskModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [AllRfpsComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AllRfpsModule { }