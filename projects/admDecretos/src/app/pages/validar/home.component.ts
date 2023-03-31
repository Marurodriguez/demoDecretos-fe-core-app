import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService } from '../../../../../coreApp/src/app/services/data.services';
import { enumWS } from '../../navigation/ws/ws-routes.config';
import { ValidateModel } from '../../models/Validate.model';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  public serial: string = "SM-016";
  public hdSerial: string = "-587283918";
  public loading: boolean = false;

  public validateModel: ValidateModel = new ValidateModel();
  public lValidate: number = 0;
  public cantValidaciones: number = 3;


  public constructor(public dataService: DataService, public cd: ChangeDetectorRef, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.serial = this.route.snapshot.paramMap.get('serial');
    this.hdSerial = this.route.snapshot.paramMap.get('pcid');
  }
  ngAfterViewInit() {
    // if(this.serial != ''){
    //   this.validar();
    // }
  }

  validar() {



    this.lValidate = 0;
    this.validateModel = null;
    this.cantValidaciones--;

    let date: Date = new Date();
    let day: number = date.getDate();
    let month: number = date.getMonth()+1;
    let sDay: string;
    let sMonth: string;

    if(day<10){
      sDay = "0" + day.toString();
    }else{
      sDay = day.toString();
    }
    if(month<10){
      sMonth = "0" + month.toString();
    }else{
      sMonth = month.toString();
    }


    let dateToday: string = sDay + "-" + sMonth + "-" + date.getFullYear();

    // let body: any = {
    //   "serial": this.serial,
    //   "hdserial": this.hdSerial,
    //   "hdserialpc": this.hdSerial,
    //   "date": dateToday
    // };

    // this.dataService.httpFunction(enumWS.VALIDATE_PC,this,body,"");
    this.loading = true;
    this.cd.markForCheck();
  }

  procesarData(data) {
    this.validateModel = data;

    this.lValidate = 1;
    this.cd.markForCheck();
  }


  responseOk(httpOperation:string, http: string, data: any, ws:any ){
    //Procesar-Data
    // switch(ws.enumUrl){
    //   case enumWS.VALIDATE_PC:
    //     this.procesarData(data);
    //     console.warn(data);
    //   break;
    // }
    this.loading = false;
    this.cd.markForCheck();
  }
  responseError(urlResource: string,httpOperation: string, data: any, ws?: any){
    // switch(ws.enumUrl){
    // }
    this.loading = false;
    this.cd.markForCheck();
  }

}
