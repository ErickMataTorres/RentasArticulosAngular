import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Rol } from '../../../Modelo/rol';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    nombre: new FormControl(this.data.rol.nombre),
    administrador: new FormControl(this.data.rol.administrador)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _rolesS:RolesService
  ){}
  ngOnInit(): void {
    
  }
  EjecutarAccion():void{
    this._rolesS.EjecutarAccion(this.rolForm.value).subscribe(response=>{
      console.log(response);
    })
  }
}
