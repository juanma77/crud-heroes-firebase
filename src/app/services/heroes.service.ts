import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';

import { map, delay } from 'rxjs/operators';

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

  // Para obtener un listado de todos los heroes en la bd; el delay es para que el Observable tarde x cantidad de milisegundos en entregarnos la respuesta 
  public getHeroes() {

    return this.httpClient.get( `${ this.url }/heroes.json` ).pipe(

      map(resp =>

        this.createHeroesArray( resp ),
        delay( 0 )


      )

    );


  }

  // Usamos este metodo para regresar lo que nos retorna, y usarlo en el map del metodo de arriba 
  private createHeroesArray( heroesObj: Object ) {

   const heroes: HeroeModel[] = [];

   // Si no tenemos ninugn heroe en la bd 
   if( heroesObj === null ) {

    return []; 


   }

   // Para obtener la key del objeto (que seria el id del heroe) y asignarsela al heroe.id
  Object.keys( heroesObj ).forEach( key =>{

    const heroe: HeroeModel = heroesObj[key];

    heroe.id = key;

    heroes.push( heroe );

  });

  return heroes; 

  }

  // Para obtener un unico heroe
  public getHeroe( id: string ) {

    return this.httpClient.get(` ${ this.url }/heroes/${ id }.json`);

  }

  // Para eliminar un heroe
  public deleteHeroe( id: string ) {

    return this.httpClient.delete(` ${ this.url }/heroes/${ id }.json`);

  }
}
