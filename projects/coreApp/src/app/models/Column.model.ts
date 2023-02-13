/**
 * Es un modelo para mostrar la columna en el ngx-datatable
 * Se usa en el manager del listado
 */
export class ColumnModel{
  public name: string = "";         // Es la etiqueta que va a aparecer.
  public prop: string = "";         // Es el nombre de la propiedad de la entidad.
  public width: string = "100";     // Son las unidades del ancho
  public sortable: boolean = false; // Indica si la columna puede reordenarse
  public type: string = "string";   // Indica el tipo de valor de la columna: string, number o money.

  public constructor(name: string, prop: string, width: string = "100",type: string = "string", sortable: boolean = false ) {
    this.name = name;
    this.prop = prop;
    this.width = width;
    this.type = type;
    this.sortable = sortable;
  }
}
