import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

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

    // console.log( form );
    // console.log( this.heroe ); 

    // Si ya existe el heroe entonces solo actualizamos su informacion; si no existe el heroe entonces creamos uno nuevo
    if( this.heroe.id ) {

      this.heroesService.updateHeroe( this.heroe ).subscribe( resp =>{

        console.log( resp );
  
      });

    } else {

      this.heroesService.createNewHeroe( this.heroe ).subscribe( resp =>{

        console.log( resp );
  
      });

    }

  }

}
