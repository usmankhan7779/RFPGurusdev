import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddrfpsComponent } from './addrfps.component';

import {  MatDatepickerModule,MatCheckboxModule,MatChipsModule } from '@angular/material';

import { MatNativeDateModule, DateAdapter } from '@angular/material';



const routes: Routes = [
  {
    path: '', component: AddrfpsComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    CKEditorModule,
    ReactiveFormsModule, MatIconModule,
    FormsModule,
    Ng2SearchPipeModule,MatChipsModule,
   HttpClientModule,

  
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    TextMaskModule,
    MatDatepickerModule,
    MatCheckboxModule,


    RouterModule.forChild(routes)
  ],
  declarations: [AddrfpsComponent]
})
export class AddRfpsModule { }
