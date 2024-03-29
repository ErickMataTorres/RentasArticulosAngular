import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RolesService } from '../../../Controlador/roles/roles.service';


const materialModules = [
  MatButtonModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatSelectModule
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
  rolesOpciones: any[] = [
    { vistaValor: "No", valor: "N" },
    { vistaValor: "Si", valor: "S" }
  ]

  rolForm = new FormGroup({
    id: new FormControl(this.data.rol.id),
    nombre: new FormControl(this.data.rol.nombre, [Validators.required]),
    administrador: new FormControl({value: this.data.rol.administrador, disabled: this.data.accion === "Borrar"})
  });

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _rolesS:RolesService
  ){}
  ngOnInit(): void {
    
  }
  EjecutarAccionRol():void{

    if(this.rolForm.value.nombre === "" || this.rolForm.value.administrador === ""){
      this.rolForm.get("nombre")?.markAsTouched();
      this.rolForm.get("administrador")?.markAsTouched();
    }else{
      if(this.data.accion === "Registrar" || this.data.accion === "Modificar"){
        this._rolesS.EjecutarAccionRol(this.rolForm.value).subscribe(response=>{
          this.dialogRef.close(response);
        })
      }else{
        this._rolesS.BorrarRol(this.rolForm.value.id).subscribe(response=>{
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
