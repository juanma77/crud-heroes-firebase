import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';

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

}
