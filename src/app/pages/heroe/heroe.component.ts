import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  public heroe = new HeroeModel(); 

  constructor( private heroesService: HeroesService ) { }

  ngOnInit() {
  }

  public saveHeroe( form: NgForm ) {

    if( form.invalid ) {

      console.log( 'Formulario no válido' );
      return; 

    }

    Swal.fire({

      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false,
      icon: 'info'

    });
    Swal.showLoading();

    // console.log( form );
    // console.log( this.heroe ); 

    let request : Observable<any>;

    // Si ya existe el heroe entonces solo actualizamos su informacion; si no existe el heroe entonces creamos uno nuevo
    if( this.heroe.id ) {

      request = this.heroesService.updateHeroe( this.heroe ); 

      /*this.heroesService.updateHeroe( this.heroe ).subscribe( resp =>{

        console.log( resp );
  
      });*/

    } else {

      request = this.heroesService.createNewHeroe( this.heroe );

      /*this.heroesService.createNewHeroe( this.heroe ).subscribe( resp =>{

        console.log( resp );
  
      });*/

    }

    request.subscribe( resp =>{

      Swal.fire({

        title: this.heroe.name,
        text: 'Registro actualizado con éxito',
        allowOutsideClick: false,
        icon: 'success'

      });

    });

  }

}
