import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyPortalComponent } from './agencyportal.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
const routes: Routes = [
  {
    path: '', component: AgencyPortalComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    TextMaskModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AgencyPortalComponent]
})
export class AgencyPortalModule { }
