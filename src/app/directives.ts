/* tslint:disable:directive-selector */
import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {LogsService} from './logs/logs.service';

@Directive({
  exportAs: 'popupEx',
  selector: '[popup]'
})
export class PopupDirective implements OnInit {
  @Input() message: string;

  constructor(private log: LogsService, private host: ElementRef) {
  }

  ngOnInit(): void {
    setTimeout(() => this.log.success('Directive has been attached to: ' + this.host.nativeElement.outerHTML), 0);
    console.log('Directive has been attached to: ' + this.host.nativeElement.outerHTML);
  }

  @HostListener('click')
  displayMessage(): void {
    alert(this.message);
  }

  getText(): string {
    return this.message;
  }
}
