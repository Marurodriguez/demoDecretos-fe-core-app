import { EmpresaModel } from "../../models/Empresa.model";

export declare interface PageComponentInterface {
    /**
     * Funcion que avisa que cuando se cambia la empresa
     */
    changeEmpresa(empresaActual: EmpresaModel, empresaAnterior: EmpresaModel): void;
}