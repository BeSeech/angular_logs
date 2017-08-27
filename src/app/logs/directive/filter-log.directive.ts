/* tslint:disable:directive-selector */
import {
  AfterContentChecked, Directive, Input, OnInit, TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[ngFilterLog]'
})
export class NgFilterLogDirective {

  @Input()
  set ngFilterLog(condition) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(private viewContainer: ViewContainerRef,
              private template: TemplateRef<any>) {
  }
}
