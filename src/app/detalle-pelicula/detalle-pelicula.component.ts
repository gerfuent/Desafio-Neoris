import { Component, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DetallePeliculas } from '../models/detalle.peliculas';
import { PeliculasService } from '../services/peliculas.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent {
  peliculaDetalle$ = new BehaviorSubject<DetallePeliculas | null>(null);
  prefijo:string = '' 
  constructor(private peliculasService: PeliculasService, @Inject(MAT_DIALOG_DATA) public idImdb: any) {

   }
   ngOnInit(): void {
    this.getDetallePeliculas(this.idImdb.idImdb);
  }
  getDetallePeliculas(idImdb:string) {
    //Validar el prefijo del idImdb si es tt buscara la pelicula en la API
    //si es nt corresponde una pelicula creada en el local storage
    this.prefijo = idImdb.slice(0,2);
    if(this.prefijo === 'tt'){
      //Obtener detalle de pelicula desde la API
      this.peliculasService.getMoviesById(idImdb).subscribe((data:any) => {
        this.peliculaDetalle$.next(data);
      });
    }
    else{
      //Obtener detalle de pelicula desde el LocalStorage
      const  peliculas = JSON.parse(localStorage.getItem('peliculas') || '[]').filter((a:any) => a.imdbID === idImdb)[0];
      this.peliculaDetalle$.next(peliculas);
    }
  }
}

