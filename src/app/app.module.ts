// ------------------- Components
import { AppComponent } from './app.component';

// ------------------- Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AgmCoreModule } from '@agm/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// ----- Layouts
import { CommonLayoutModule } from './layouts/common/common.module';

// ------------------- Services
import { SharedData } from './services/shared-service';
import { SeoService } from './services/seoService';

// ------------------- Randoms
import { AuthInterceptor, SetHeaders } from './AuthGuards/auth.interceptor';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthGuard } from './AuthGuards/auth.guard';
import { AuthLogin } from './AuthGuards/auth.login';
import { DatePipe } from '@angular/common';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("210115018603-187b6essbhk7booo33ab36d1u8cn3jpp.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("692540294438102")
  }
]);
export function provideConfig() {
  return config;
}

import { TextMaskModule } from 'angular2-text-mask';
import { Http, HttpModule } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { FootercmpComponent } from './components/common/footercmp/footercmp.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    HttpModule,
    
    TextMaskModule,
    Ng2SearchPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPnJ0zatoiPOI1GOeeS7HCj7AxIW183tg'
    }),

    CommonLayoutModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    DatePipe,
    SeoService,
    SharedData,
    AuthGuard,
    AuthLogin,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    SetHeaders
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
