import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EstadoArticulosService } from '../../../Controlador/estadoArticulos/estado-articulos.service';

const materialModules = [
  MatButtonModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule
];

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    materialModules,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {

  estadoArticulosForm = new FormGroup({
    id: new FormControl(this.data.estadoArticulo.id),
    nombre: new FormControl(this.data.estadoArticulo.nombre, [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _estadoArticulosS:EstadoArticulosService
  ){}

  ngOnInit(): void {
      
  }


  EjecutarAccionEstadoArticulo():void{

    if(this.estadoArticulosForm.value.nombre === ""){
      this.estadoArticulosForm.get("nombre")?.markAsTouched();
    }else{
      if(this.data.accion === "Registrar" || this.data.accion === "Modificar"){
        this._estadoArticulosS.EjecutarAccionEstadoArticulo(this.estadoArticulosForm.value).subscribe(response=>{
          this.dialogRef.close(response);
        })
      }else{
        this._estadoArticulosS.BorrarEstadoArticulo(this.estadoArticulosForm.value.id).subscribe(response=>{
          this.dialogRef.close(response);
        })
      }
    }
  }

  SoloLetras(event: KeyboardEvent):void {
    const soloLetras = /^[a-zA-ZñÑáéíóú]+$/;

    if ((event.target as HTMLInputElement).value === "") {
        if (event.code === "Space") {
            event.preventDefault();
            return;
        }
    }
    if (!soloLetras.test(event.key) && event.code !== "Space") {
        event.preventDefault();
    }
}

}
