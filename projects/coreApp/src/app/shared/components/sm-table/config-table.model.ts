
export class TableConfigurationOptionsModel {
  buttonsWidth: string = "10%";
  buttonsLabel: string = "-";
  clickRow: boolean = false;
  iconCell: string = "fal fa-file-invoice-dollar";
  style: string = "style-light"
}
export class TableConfigurationButtonsModel {
  name: string = "";
  type: string = "button";
  urlClick: string = "";
  icon: "fa fa-edit primary";
  class: "btn btn-large";
}

export class TableConfigurationColsModel {
  name: string = "";
  label: string = "";
  width: string = "20%";
  type: string = "string"; //selected,especial,money,number,string,yesNo

  public constructor(name: string, label: string, type: string, width: string) {
    this.name = name;
    this.label = label;
    this.width = width;
    this.type = type;
  }
}

export class TableConfigurationModel {
  public options: TableConfigurationOptionsModel; 
  public buttons: TableConfigurationButtonsModel[] = Array<TableConfigurationButtonsModel>();
  public cols: TableConfigurationColsModel[] = Array<TableConfigurationColsModel>();
  public url: any = "";
  public data: any = [];

  public constructor() {
    this.options = new TableConfigurationOptionsModel();
    this.buttons.length = 0;
    this.cols.length = 0;
    this.url = "";
    this.data = [];
  }
}