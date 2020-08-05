import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2'; 
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  public heroe = new HeroeModel(); 

  constructor( private heroesService: HeroesService, private route: ActivatedRoute  ) { }

  ngOnInit() {

    // Obtenemos el id que pasamos por parametro 
    const id = this.route.snapshot.paramMap.get('id');

    // Si el id es por ejemplo 2cv5s5v66a7gr6a4
    if( id !== 'nuevo' ) {

      this.heroesService.getHeroe( id ).subscribe( (resp: HeroeModel) =>{

        // Igualamos el heroe (es decir, todo el objeto) a la respuesta total que obtenemos
        this.heroe = resp; 

        // El id de nuestro heroe (es decir, el del objeto) sera igual al id que obtenemos por parametro 
        this.heroe.id = id;

      })

    }

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
