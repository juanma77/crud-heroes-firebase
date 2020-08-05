import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor( private heroesService: HeroesService ) { }

  public heroes: HeroeModel[] = [];

  ngOnInit() {

    this.heroesService.getHeroes().subscribe( resp =>{

      // La resp tiene el arreglo de heroes 
      console.log( resp ); 

      this.heroes = resp;


    });

  }

  public deleteHeroe( heroe: HeroeModel, i: number ) {

    Swal.fire({

      title: '¿Está seguro?',
      text: `¿Está seguro que desea borrar a ${ heroe.name }?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
      

    }).then( resp =>{

      // Si la respuesta es true, borramos el heroe
      if( resp.value ) {

        // A partir de la posicion i comenzamos y la cantidad de elementos a borrar es uno
        this.heroes.splice( i, 1 );


        this.heroesService.deleteHeroe( heroe.id ).subscribe();

      }

    });


  }

}
