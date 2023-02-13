import { ProyectConfigModel } from './../models/proyect-config.model';

import { Injectable } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app/app.config';

// Reglas de Negocio y Funciones Particulares de la Applicación
// Para las funciones comunes se debe utilizar function.services

@Injectable()
export class MainService {


    public constructor(private router: Router, private http: HttpClient, private appConfig: AppConfig) { }


    public provincias: any[]=
    [
      {"id": 1,"codigo":"CABA","nombre":"CABA","uuid":"1"},
      {"id": 2,"codigo":"BA","nombre":	"Buenos Aires","uuid":"2"},
      {"id": 3,"codigo":"CT","nombre":	"Catamarca","uuid": "3"},
      {"id": 4,"codigo":"CHC","nombre":"Chaco","uuid": "4"},
      {"id": 5,"codigo":"CHB","nombre":"Chubut","uuid": "5"},
      {"id": 6,"codigo":"CD","nombre":"Córdoba","uuid": "6"},
      {"id": 7,"codigo":"CR","nombre":"Corrientes","uuid": "7"},
      {"id": 8,"codigo":"ER","nombre":"Entre Ríos","uuid": "8"},
      {"id": 9,"codigo":"FM","nombre":"Formosa","uuid": "9"},
      {"id": 10,"codigo":"JJ","nombre":"Jujuy","uuid": "10"},
      {"id": 11,"codigo":"LP","nombre":"La Pampa","uuid": "11"},
      {"id": 12,"codigo":"LR","nombre":"La Rioja","uuid": "12"},
      {"id": 13,"codigo":"MZ","nombre":"Mendoza","uuid": "13"},
      {"id": 14,"codigo":"MS","nombre":"Misiones","uuid": "14"},
      {"id": 15,"codigo":"NQ","nombre":"Neuquén","uuid": "15"},
      {"id": 16,"codigo":"RN","nombre":"Río Negro","uuid": "16"},
      {"id": 17,"codigo":"ST","nombre":"Salta","uuid": "17"},
      {"id": 18,"codigo":"SJ","nombre":"San Juan","uuid": "18"},
      {"id": 19,"codigo":"SL","nombre":"San Luis","uuid": "19"},
      {"id": 20,"codigo":"SC","nombre":"Santa Cruz","uuid": "20"},
      {"id": 21,"codigo":"SF","nombre":"Santa Fe","uuid": "21"},
      {"id": 22,"codigo":"SE","nombre":"Santiago del Estero","uuid": "22"},
      {"id": 23,"codigo":"TF","nombre":"Tierra del Fuego","uuid": "23"},
      {"id": 24,"codigo":"TC","nombre":"Tucumán","uuid": "24"},
      {"id": 25,"codigo":"N/E", "nombre": "[NO ESPECIFICADA]","uuid": "25"},
    ]


}
