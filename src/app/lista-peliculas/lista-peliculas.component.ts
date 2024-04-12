import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ListaPeliculas } from '../models/lista.peliculas';
import { PeliculasService } from '../services/peliculas.service';
import {MatDialog} from '@angular/material/dialog';
import { FormPeliculaComponent } from '../form-pelicula/form-pelicula.component';
import { DetallePeliculaComponent } from '../detalle-pelicula/detalle-pelicula.component';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrl: './lista-peliculas.component.css'
})
export class ListaPeliculasComponent implements OnInit{
  peliculas$ = new BehaviorSubject<ListaPeliculas[] | null>(null);
  form: FormControl = new FormControl('');
  constructor(private peliculasService: PeliculasService,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getListaPeliculas('batman');
  }

  onBuscarPelicula():void{
    const value = this.form.value;
    this.getListaPeliculas(value)
  }
  onAgregarPelicula(){
    this.openDialogForm(null);
  }
  getListaPeliculas(nombre:string):void {
    this.peliculasService.getMoviesByName(nombre).subscribe((data: ListaPeliculas[]) => {
      this.addPeliculaStorage(data);
      this.peliculas$.next(data);
    });
  }

  addPeliculaStorage(peliculas:any):void{
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
  }
  openDialogVer(idImdb: any): void {
    const dialogConfig = {
      data: {
        idImdb: idImdb
      }
    };

    this.dialog.open(DetallePeliculaComponent, dialogConfig);
  }
  openDialogForm(idImdb: any): void {
    let dialogRef = this.dialog.open(FormPeliculaComponent, {
      data: {idImdb: idImdb}
    })

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res,'res')
      let peliculas = JSON.parse(localStorage.getItem('peliculas') || '[]');
      let index = peliculas.map((pelicula:any) => pelicula.imdbID).indexOf(res.data.imdbID);
      //Se revisa si la pelicula ya existe en el listado del LocalStorage
      index !== -1 ? peliculas[index] = res.data : peliculas.push(res.data);
      localStorage.setItem('peliculas', JSON.stringify(peliculas));
      this.peliculas$.next(peliculas);
    })
    
  }
  openDialogEliminar(idImdb: any): void {
    let dialogRef = this.dialog.open(ConfirmarEliminarComponent, {})

    dialogRef.afterClosed().subscribe((res) => {
      if(res){
      let peliculas = JSON.parse(localStorage.getItem('peliculas') || '[]');
      let index = peliculas.map((pelicula:any) => pelicula.imdbID).indexOf(idImdb);
      peliculas.splice(index, 1);
      localStorage.setItem('peliculas', JSON.stringify(peliculas));
      this.peliculas$.next(peliculas);
      }
       
    })
  }

  onBuscarPeliculaPorId(idImdb:any):void{
    this.openDialogVer(idImdb);
  }

  onEditarPelicula(idImdb:any):void{
    this.openDialogForm(idImdb);
  }
  
  onEliminarPelicula(idImdb:any):void{
    this.openDialogEliminar(idImdb);
  }
}
