import { Injectable } from '@angular/core';


@Injectable()
export class TitleBarService {
  
  private _title: string = "";
  private _subTitle: string = "";
  private _icon: string = "";


  constructor () {

  }
  

  public get title(): string{
    return this._title;
  } 
  public set title(value: string){
    this._title = value; 
  }
  public get subTitle(): string{
    return this._subTitle;
  } 
  public set subTitle(value: string){
    this._subTitle = value; 
  }
  public get icon(): string{
    return this._icon;
  } 
  public set icon(value: string){
    this._icon = value; 
  }
}
