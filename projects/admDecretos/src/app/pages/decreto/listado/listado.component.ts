import { Component, OnInit } from '@angular/core';
import { DecretoService } from '../../../services/decreto.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  lista:any=[];

  constructor(private decretoService: DecretoService) { }

  ngOnInit(): void {
    this.listarDecretos();
  }

  listarDecretos()
  {
    this.decretoService.getDecretos().subscribe(
      res=>{
        this.lista=res;
        console.log(res);
      },
      err=>console.log(err)
    );

  }

eliminar(id: string) {
  if (confirm('El decreto se eliminará definitivamente, ¿estás seguro?')) {
    this.decretoService.deleteDecreto(id).subscribe(
      res => {
      this.listarDecretos();
    });
  }
}
}