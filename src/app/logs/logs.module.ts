import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogsComponent} from './logs.component';
import {LogsService} from './logs.service';
import { LogRecordComponent } from './log-record/log-record.component';
import { LogRecordSetComponent } from './log-record-set/log-record-set.component';
import {appStoreProviders} from './redux/store';
import { NgLogForDirective } from './directive/ng-log-for.directive';

@NgModule({
  declarations: [
    LogsComponent,
    LogRecordComponent,
    LogRecordSetComponent,
    NgLogForDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogsComponent
  ],
  providers: [
    appStoreProviders
  ]
})
export class LogsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LogsModule,
      providers: [LogsService]
    };

  }
}
