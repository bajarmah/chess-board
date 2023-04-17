import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChessBoardModule } from 'ngx-chess-board';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainOuterComponent } from './main-outer/main-outer.component';

@NgModule({
  declarations: [AppComponent, MainOuterComponent],
  imports: [BrowserModule, AppRoutingModule, NgxChessBoardModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
