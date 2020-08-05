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

  // Para crear un nuevo heroe en la base de datos 
  public createNewHeroe( heroe: HeroeModel ) {

    return this.httpClient.post( `${ this.url }/heroes.json`, heroe ).pipe(

      map( (resp: any) =>{

        heroe.id = resp.name; 
        return heroe; 

      })

    );



  }

  // Para actualizar un heroe; la propiedad spread (...) sirve para no tener que escribir todas las propiedades de un objeto; así se crea una copia de cada una de las propiedades del objeto heroe en el nuevo objeto heroeTemp; tenemos que crear el tempHeroe para que al actualizar un heroe no se cree un campo con el id del mismo
  public updateHeroe( heroe: HeroeModel ) {

    const tempHeroe = {

      ...heroe

    }

    delete tempHeroe.id; 

    return this.httpClient.put( `${ this.url }/heroes/${ heroe.id }.json`, tempHeroe );


  }
}
