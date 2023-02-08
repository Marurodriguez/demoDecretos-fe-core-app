import { UserModel } from './../../../models/user.model';
import { ConfigService } from '../../../shared/services/config.service';
import { Component, ViewChild, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../../../shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { config } from 'process';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit, AfterViewInit {

  loginFormSubmitted = false;
  isLoginFailed = false;
  mensaje: string = "";
  errorCode: number = 0;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute, public configService: ConfigService) {


  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.configService.proyectConfig.loginAutoLogin == true) {
      this.loginForm.controls.username.setValue(this.configService.proyectConfig.loginUserName);
      this.loginForm.controls.password.setValue(this.configService.proyectConfig.loginPassWord);
    }
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if(this.configService.proyectConfig.loginAutoLogin == true) {
      this.onSubmit();
    }
  }
  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.isLoginFailed = false;
    this.mensaje = "";
    this.errorCode = 0;
    this.authService.signinUser(this.loginForm.value.username, this.loginForm.value.password, this);
    /*this.authService.signinUser(this.loginForm.value.username, this.loginForm.value.password)
      .then((res) => {
        this.spinner.hide();
        this.router.navigate(['/page']);
      })
      .catch((err) => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: ' + err)
      }
      );*/
  }
  /**
   *
   * @param user recibe el usuario logineado y si dio error recibe solo con el usuario
   * @param status status = 1 -> Login Ok, status = -1 usuario y contraseña incorrecto, status = -2 Fallo del servidor
   */
  responseLogin(user: UserModel, status: number){
    this.spinner.hide();
    this.mensaje = "";

    switch(status){
      case 1: //login Ok
        //alert("login ok");
        this.isLoginFailed = false;
        this.router.navigate(['']);
      break;
      case -1: //usuario o contraseña incorrectos
        this.errorCode = status;
        this.mensaje = "El usuario o contraseña son incorrectos";
        alert(this.mensaje);
        // this.isLoginFailed = true;
      break;
      default: //fallo del servidor (-2 u otros)
        this.errorCode = status;
        this.mensaje = "Fallo al conectarse con el servidor";
        alert(this.mensaje);
        // this.isLoginFailed = true;
      break;
    }

  }

}
