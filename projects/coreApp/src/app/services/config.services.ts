import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.services';
import { HttpClient } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as shajs from 'sha.js'


@Injectable()
export class ConfigService {

  // public set configs(value: ConfigItem[]){
  //   for(let config of value){
  //     config.name = config.name.toUpperCase().trim();
  //   }
  //   this._configs = value;
  //   this.getConfigs();
  // }

  // private getConfigs(){

  // }

  // public getConfig(name: string, defaultValue?: string): string{
  //   name = name.toUpperCase().trim();
  //   for(let config of this._configs){
  //     if(config.name === name){
  //       return config.value;
  //     }
  //   }
  //   return defaultValue;
  // }

}
