import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CategoriasService } from '../../../Controlador/categorias/categorias.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
];

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    materialModules,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit{

  categoriaForm = new FormGroup({
    id: new FormControl(this.data.categoria.id),
    nombre: new FormControl(this.data.categoria.nombre, [Validators.required])
  });
  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoriasS:CategoriasService
  ){}

  ngOnInit(): void {
      
  }

  EjecutarAccionCategoria():void{

    if(this.categoriaForm.value.nombre === ""){
      this.categoriaForm.get("nombre")?.markAsTouched();
    }else{
      if(this.data.accion === "Registrar" || this.data.accion === "Modificar"){
        this._categoriasS.EjecutarAccionCategoria(this.categoriaForm.value).subscribe(response=>{
          this.dialogRef.close(response);
        })
      }else{
        this._categoriasS.BorrarCategoria(this.categoriaForm.value.id).subscribe(response=>{
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
