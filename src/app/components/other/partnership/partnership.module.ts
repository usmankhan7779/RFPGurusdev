import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnershipComponent } from './partnership.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
const routes: Routes = [
  {
    path: '', component: PartnershipComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [PartnershipComponent]
})
export class PartnershipModule { }