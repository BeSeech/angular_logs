import {Component} from '@angular/core';
import {LogsService} from './logs/LogsService';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RxTest';

  isTestActive = false;

  private testSubscribtion1: any;
  private testSubscribtion2: any;

  constructor(private logs: LogsService) {
  }

  test() {
    const testInstance = Observable.interval(1)
      .do(v => this.logs.sub('inObservable: ' + v)).share();

    this.testSubscribtion1 = testInstance.auditTime(1000)
      .scan((a, v) => a += v)
      .subscribe(v => this.logs.info('inObserver1: ' + v),
        (err) => {
          this.logs.error('Error1: ' + err);
          this.isTestActive = false;
        }, () => {
          this.logs.info('completed1');
          this.stopTest();
        });

    this.testSubscribtion2 = testInstance.auditTime(1000)
      .scan((a, v) => a += v)
      .subscribe(v => this.logs.info('inObserver2: ' + v),
        (err) => {
          this.logs.error('Error2: ' + err);
          this.isTestActive = false;
        }, () => {
          this.logs.info('completed2');
          this.stopTest();
        });

  }

  runTest(): void {
    this.isTestActive = true;
    this.logs.debug('Test has been started');
    // test here
    this.test();
    // test here
  }

  stopTest(): void {
    if (this.testSubscribtion1) {
      this.testSubscribtion1.unsubscribe();
    }
    if (this.testSubscribtion2) {
      this.testSubscribtion2.unsubscribe();
    }
    this.logs.debug('Test has been stopped');
    this.isTestActive = false;
  }
}
