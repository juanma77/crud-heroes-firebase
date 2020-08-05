import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  public url = 'https://crud-heroes-firebase.firebaseio.com';

  constructor( private httpClient: HttpClient ) {

    

  }

  public createNewHeroe( heroe: HeroeModel ) {

    return this.httpClient.post( `${ this.url }/heroes.json`, heroe ).pipe(

      map( (resp: any) =>{

        heroe.id = resp.name; 
        return heroe; 

      })

    );



  }
}
