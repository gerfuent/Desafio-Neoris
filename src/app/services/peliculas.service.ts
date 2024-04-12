import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ListaPeliculas } from '../models/lista.peliculas';
import { environment } from '../../environments/environment.development';
import { DetallePeliculas } from '../models/detalle.peliculas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }


   //Obtener lista de peliculas por nombre
   getMoviesByName(nombre:string):Observable<ListaPeliculas[]>{
    console.log('getMoviesByNameTs',nombre)
    return this.http.get<ListaPeliculas[]>(environment.apiHost +'/'+ `?s=${nombre}&r=`+environment.r,
    {headers:{ 
      'X-RapidAPI-Key': 'b834ef8077mshcfabc75140b0a6fp156d58jsna98b7590c781',
      'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
    }})
    .pipe(
      map((data:any) => {data.Search
        if(data.Search === undefined){
          this.openSnackBar('No se encontraron peliculas con el nombre ingresado.');
        }
        this.openSnackBar('Peliculas encontradas.');
        return data.Search
      }),
      catchError((error:any) => {
        console.error('Error:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  //Obtener detalle de pelicula por id
  getMoviesById(id:string):Observable<DetallePeliculas>{
    console.log('getMoviesByIdTs',id)
    return this.http.get<DetallePeliculas>(environment.apiHost +'/'+ `?i=${id}&r=`+environment.r,
    {headers:{ 
      'X-RapidAPI-Key': 'b834ef8077mshcfabc75140b0a6fp156d58jsna98b7590c781',
      'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
    }})
      .pipe(
        map((data:any) => data)
      );
  } 

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
