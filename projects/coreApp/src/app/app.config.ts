import { Inject, Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import 'rxjs/add/operator/map';

export class envType {
  public env: string;
}

@Injectable()
export class AppConfig {

  public mode: string = "dev";
  public user: string = "";
  public password: string = "";
  public version: string = "";

  public configLoaded: number = 0;

  private config: Object = null;
  private env: envType = null;

  public module: string = "";

  constructor(private http: HttpClient) {
  }



  /**
   * Use to get the data found in the second file (config file)
   */
  public getConfig(key: any, defaultValue: any) {
    try {
      return this.config[key];
    } catch (ex) {
      return defaultValue;
    }

  }

  /**
   * Use to get the data found in the first file (env file)
   */
  public getEnv(key: any) {
    return this.env[key];
  }

  public init() {
    if (this.configLoaded == 1) {
      return;
    } else {
      this.mode = this.getConfig("mode", "dev");
      if (this.mode.toLowerCase() == "prod") {
        this.user = "";
        this.password = "";
        this.version = this.getConfig("version", "");
      } else {
        this.user = this.getConfig("user", "");
        this.password = this.getConfig("password", "");
        this.version = this.getConfig("version", "");
      }
    }
    return;
  }

  private getPathModule(): string {
    if (this.module === "") {
      return "./assets/env/";
    } else {
      return "./assets/env/" + this.module + "/";
    }

  }


  private loadFileCofing(module: string, env: string) {
    let pathFile = this.getPathModule() + 'env' + '.' + env + '.json';
    try {
      this.http.get(pathFile).subscribe(data => {
        console.log(data);
        this.config = Object(data);
      });
    } catch (ex) {
      console.error("No se pudo cargar el archivo de configuración del servidor");
    }

  }


  public load(module: string) {
    this.module = module;
    try {
      this.http.get(this.getPathModule() + 'env.json').subscribe(data => {
        console.log(data);
        this.env = Object(data);
        this.loadFileCofing(module, this.env.env);
      });
    } catch (ex) {
      console.error("No se pudo cargar la configuración del servidor");
    }
  }
}
