import { Component, Inject } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { PeliculasService } from '../services/peliculas.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetallePeliculas } from '../models/detalle.peliculas';

@Component({
  selector: 'app-form-pelicula',
  templateUrl: './form-pelicula.component.html',
  styleUrl: './form-pelicula.component.css'
})
export class FormPeliculaComponent {
  peliculaDetalle$ = new BehaviorSubject<DetallePeliculas | null>(null);
  peliculaForm: FormGroup = new FormGroup({});

    get peliculasFormControl() {
    return this.peliculaForm.controls;
  }
  constructor(
    public dialogRef: MatDialogRef<FormPeliculaComponent>,
    private peliculasService: PeliculasService, 
    @Inject(MAT_DIALOG_DATA) public idImdb: any, 
    private fb:FormBuilder,

  ) {

  }
  ngOnInit(): void {
    this.setForm();
    this.getDetallePeliculas(this.idImdb.idImdb);
    console.log(this.getImdbID());
    
  }
  getDetallePeliculas(idImdb:any) {
    if(idImdb !== null){
      this.peliculasService.getMoviesById(idImdb).subscribe((d:any) => {
        const  peliculas = JSON.parse(localStorage.getItem('peliculas') || '[]').filter((a:any) => a.imdbID === idImdb)[0];
        this.peliculaForm.setValue({
          imdbID: peliculas.imdbID,
          Title: peliculas.Title,
          Year: peliculas.Year,
          Type: peliculas.Type,
          Poster: peliculas.Poster,
        })
        this.peliculaDetalle$.next(d);
      });
    }

  }

  setForm(){
    this.peliculaForm = this.fb.group({
      imdbID: [this.getImdbID()],
      Title:['',Validators.required],
      Type: ['',Validators.required],
      Year:  ['',[Validators.required]],
      Poster:['',Validators.required],
    
    });
  }


  onFormSubmit(){
  console.log(this.peliculaForm.valid,'status')
  console.log(this.peliculaForm.value);
  this.peliculaDetalle$.next(this.peliculaForm.value);
  this.dialogRef.close({data: this.peliculaForm.value});
  }

  getImdbID():string{
    let idImdb = parseInt(JSON.parse(localStorage.getItem('correlativoId') ||'0'))+1
    localStorage.setItem('correlativoId',idImdb.toString());
    return 'nt'+'0'.repeat(7-idImdb.toString().length)+idImdb.toString();
    
  }
}
