import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatIconModule, MatSlideToggleModule, MatSelectModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { RecapchaModule } from '../recapcha/recapcha.module';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { SignupService } from './signup.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
const routes: Routes = [
  {
    path: '', component: SignupComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    TextMaskModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes),
    RecapchaModule,
    InternationalPhoneModule,
    HttpClientModule
  ],
  declarations: [SignupComponent],
  providers: [SignupService],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SignupModule { }