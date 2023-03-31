import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Decreto, DecretoService } from '../../../services/decreto.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  id:string="";
  decretoActual: Decreto={id:'',decreto:'',fecha:new Date(),denominacion:'',detalle:''};
  
  constructor(
    private decretoService:DecretoService,
    private antivateRouter: ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.id= this.antivateRouter.snapshot.params.id;
    this.decretoService.getUnDecreto(this.id).subscribe(
      res=>{
        this.decretoActual=res;
      },

      err=>console.log(err)
    );
  }
  
  guardar(){
    this.decretoService.editDecreto(this.id, this.decretoActual).subscribe(
      res=>{
        this.router.navigate(['/listado']);
      },

      err=>console.log(err)
    );
  }

}
