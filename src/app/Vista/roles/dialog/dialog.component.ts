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
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


const materialModules = [
  MatButtonModule,
  MatInputModule,
  FormsModule,
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Rol
  ){}
  ngOnInit(): void {
      
  }
}