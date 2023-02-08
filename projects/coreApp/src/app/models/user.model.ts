export class UserModel{
  public username: string = "";
  public roles: string = "";
  public admin: number = 0;
  public credentials: string = "";

  getData(fieldName: string, defaultValue: any){
    try {
      const value:any = this.data[fieldName];
      if(value == undefined || value == null){
        return defaultValue;
      }else{
        return this.data[fieldName];
      }
    }catch(ex){
      return defaultValue;
    }
  }

  public data: any; //información adicional especifica de la APP
}
