import localePT from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';

import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
  registerLocaleData,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CoreModule } from './_core/core.module';
import { InitializerModule } from './_initializer/initializer.module';
import { SharedModule } from './_shared/shared.module';
import { _userReducer } from './_store/user/user.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
registerLocaleData(localePT);
@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    InitializerModule,

    CoreModule,
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot({
      user: _userReducer,
    }),
  ],
  exports: [CommonModule, BrowserModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
