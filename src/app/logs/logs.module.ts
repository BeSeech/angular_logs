import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogsComponent} from './logs.component';
import {LogsService} from './logs.service';
import { LogRecordComponent } from './log-record/log-record.component';
import { LogRecordSetComponent } from './log-record-set/log-record-set.component';
import {NgFilterLogDirective} from './directive/filter-log.directive';
import {appStoreProviders} from './redux/store';
import { NgLogForDirective } from './directive/ng-log-for.directive';



@NgModule({
  declarations: [
    LogsComponent,
    LogRecordComponent,
    LogRecordSetComponent,
    NgFilterLogDirective,
    NgLogForDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogsComponent
  ],
  providers: [
    //если объявить LogsService тут. то возможны лишние экземпляры LogsService при включении в множество модулей
    //по этому у класса модуля добавляем метод forRoot регистрирующий провайдер и вызываем этот метод только при
    //включении модуля в главный модуль приложения
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

/*
Example:
  in ngModule:
    imports: [ LogsModule.forRoot() ]

 in template:
    <app-logs></app-logs>

 in component:
  constructor (private logs: LogsService) { }

using:
   this.logs.add(s, color);
*/
