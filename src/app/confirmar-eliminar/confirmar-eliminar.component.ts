import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminar',
  templateUrl: './confirmar-eliminar.component.html',
  styleUrl: './confirmar-eliminar.component.css'
})
export class ConfirmarEliminarComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmarEliminarComponent>) {
  }

  ngOnInit(): void {
  }

  onDelete(){
    this.dialogRef.close({data: true});
   }
  onCancel(){
    this.dialogRef.close({data: false});
  }
}
