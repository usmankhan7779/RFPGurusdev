import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatChipsModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddrfpsComponent } from './addrfps.component';
const routes: Routes = [
  {
    path: '', component: AddrfpsComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    TextMaskModule,
    HttpClientModule,
    RouterModule.forChild(routes),

     
    CKEditorModule,Ng2SearchPipeModule,
    MatChipsModule,
  
    MatDatepickerModule,
    MatNativeDateModule,
 
 
  
 
 
    MatCheckboxModule,
  




  ],
  declarations: [AddrfpsComponent]
})
export class AddRfpsModule { }
