import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[rowDetail]',
})
export class RowDetailDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
