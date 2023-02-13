/**
 * Permite la configuración de los proyectos.
 */
export class ProyectConfigModel{
  public name: string = "";
  public title: string = "";
  public sideBarImg: string = "";
  private _image: string = "";
  public get image(): string {
    return this.replaceVars(this._image);
  }
  public set image(value: string) {
    this._image = value;
  }
  public icon: string = "";
  public assetsUrl: string = "";

  public imageClass: string = "logo-img";
  // public logo: string = "";
  public showUser: boolean = true;
  public showAlert: boolean = false;
  public showActivity: boolean = false;
  public showThemeCustimizer: boolean = false;
  public showFind: boolean = false;
  public userExpand: boolean = false;

  public userName: string = "";
  public userDesc: string = "";

  public fieldUserName: string = "username";
  public fieldUserDesc: string = "data.data.dependencia.nombre";



  public userAuthenticatedMode: string = "basic";

  // Login
  public loginUserName: string = "";
  public loginPassWord: string = "";
  public loginAutoLogin: boolean = false;
  public loginHide: boolean = false;
  public loginAllowRegister:boolean = false;
  public loginAllowForgotPassword: boolean = false;
  public loginOrLoginWith: boolean = false;
  public loginTitle: string = "Login";
  public loginRemember: boolean = false;
  public loginFailed: string = "Error al ingresar";
  public loginDesc: string = "Bienvenido al Sistema";

  private _loginImg: string = "assets/img/gallery/login.png";
  public get loginImg(): string {
    return this.replaceVars(this._loginImg);
  }
  public set loginImg(value: string) {
    this._loginImg = value;
  }
  public loginUrl: number;

  //Para el footer
  public empresa: string = "";
  public urlEmpresa: string = "";

  public routesList: any;

  replaceVars(str: string): string {
    return str.replace(new RegExp("-assetsUrl-",'g'),this.assetsUrl);
  }
}
