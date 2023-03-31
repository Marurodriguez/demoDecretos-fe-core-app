import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Decreto, DecretoService } from '../../../services/decreto.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  decretoNuevo: Decreto={id:'',decreto:'',fecha:new Date(),denominacion:'',detalle:''};

  constructor(private decretoService: DecretoService, private router:Router) { }

  ngOnInit(): void {
    this.validateForms(); // llamada a la función de validación de formularios
  }

  agregar(){

    
    this.decretoService.saveDecreto(this.decretoNuevo).subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['listado']);
      },
      err=>console.log(err)
    );
  }

  
  private validateForms() {
    const forms = document.querySelectorAll('.requires-validation') as NodeListOf<HTMLFormElement>;
    Array.from(forms).forEach((form: HTMLFormElement) => {
      form.addEventListener('submit', (event: Event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }
  
  
  
  
}
