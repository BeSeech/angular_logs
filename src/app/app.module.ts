import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {PopupDirective} from './directives';
import {AppComponent} from './app.component';
import {LogsModule} from './logs/logs.module';
import {appStoreProviders} from './logs/redux/store';

@NgModule({
  declarations: [
    AppComponent,
    PopupDirective
  ],
  imports: [
    BrowserModule,
    LogsModule.forRoot()
  ],
  providers: [
    appStoreProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  }
