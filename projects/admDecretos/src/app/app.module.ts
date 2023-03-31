import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
// import { DeviceDetectorModule } from 'ngx-device-detector';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '../../../coreApp/src/app/shared/shared.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './navigation/content/content-layout.component';
import { FullLayoutComponent } from './navigation/full/full-layout.component';

import { AuthService } from '../../../coreApp/src/app/shared/auth/auth.service';
import { AuthGuard } from '../../../coreApp/src/app/shared/auth/auth-guard.service';
import { WINDOW_PROVIDERS } from '../../../coreApp/src/app/shared/services/window.service';
import { AppConfig } from '../../../coreApp/src/app/app.config';
import { ChartsModule } from 'ng2-charts';
import { CoreModule } from '../../../coreApp/src/app/shared/core.module';
import { SharedAppModule } from './SharedApp.module';
import { ComponentsProyectModule } from './components/components-proyect.module';
import { UserService } from './services/User.service';
import { LoadingInterceptor } from '../../../coreApp/src/app/interceptors/Loading.interceptor';
import { LoadingComponent } from '../../../coreApp/src/app/shared/components/loading-component/loading.component';
import { NgbDateCustomParserFormatter } from './formatter/NgbDateCustomParseFormatter';
import { TitleBarService } from './services/TitleBar.service';
import { BrowserModule } from '@angular/platform-browser';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY', //YOUR_API_KEY
  authDomain: 'YOUR_AUTH_DOMAIN', //YOUR_AUTH_DOMAIN
  databaseURL: 'YOUR_DATABASE_URL', //YOUR_DATABASE_URL
  projectId: 'YOUR_PROJECT_ID', //YOUR_PROJECT_ID
  storageBucket: 'YOUR_STORAGE_BUCKET', //YOUR_STORAGE_BUCKET
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID', //YOUR_MESSAGING_SENDER_ID
  appId: 'YOUR_APP_ID', //YOUR_APP_ID
  measurementId: 'YOUR_MEASUREMENT_ID' //YOUR_MEASUREMENT_ID
};


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initConfig(config: AppConfig) {
  return () => config.load('contablePlus');
}

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, LoadingComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    SharedAppModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    ChartsModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserModule,
    // DeviceDetectorModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAP_API_KEY'
    }),
    PerfectScrollbarModule,
    FormsModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfig],
      multi: true
    },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    UserService,
    TitleBarService,
    WINDOW_PROVIDERS
  ],
  exports: [
    SharedAppModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
