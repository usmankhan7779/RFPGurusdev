import { HttpClientModule } from '@angular/common/http';
// import { FooterService } from './footer.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { FooterComponent } from './footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserprofileComponent } from 'src/app/layouts/userprofile/userprofile.component';
import { FootercmpComponent } from './footercmp.component';
import { FooterService } from '../footer/footer.service';

@NgModule({
    imports: [
        RouterModule,
        UserprofileComponent,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    declarations: [FootercmpComponent],
    exports:[FootercmpComponent],
    providers: [FooterService]
})
export class footeradminModule { }