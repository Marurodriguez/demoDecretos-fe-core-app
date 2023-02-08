import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, Output, ViewEncapsulation, ViewChild, AfterContentChecked, AfterContentInit, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import swal from 'sweetalert2';
import { AbmObject, ManagerABMService } from '../../../services/manager-abm.service';



@Component({
  selector: 'sm-abm',
  templateUrl: './sm-abm.component.html',
  styleUrls: ['./sm-abm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SmAbmComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/
  @Input() ms: ManagerABMService;
  @Input() disabled: boolean = false;

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
  @ViewChild('tableResponsive') tableResponsive: any;

  /************************************************************************************************************************
   * Constructor && Implements
   *
   ************************************************************************************************************************/
  constructor(private cd: ChangeDetectorRef,
              public router: Router, public route: ActivatedRoute,
              ){

   }
  ngOnInit(): void {
    this.ms.ngOnInit();
  }
  ngAfterViewInit(): void {
    this.ms.ngAfterViewInit();
  }

  getRows(): any {
    return this.ms.getRows();
  }
  getRowsByIndex(rowNumber: number ): any {
    return this.ms.getRows()[rowNumber];
  }
  getColHtmlClass(component: AbmObject): string {
    if(component && component.colHtmlClass) {
      return component.colHtmlClass;
    }
  }
}
