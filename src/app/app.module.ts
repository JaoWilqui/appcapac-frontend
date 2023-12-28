import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CoreModule } from './_core/core.module';
import { InitializerModule } from './_initializer/initializer.module';
import { SharedModule } from './_shared/shared.module';
import { _userReducer } from './_store/user/user.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    InitializerModule,
    CoreModule,
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot({
      user: _userReducer,
    }),
  ],
  exports: [CommonModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
