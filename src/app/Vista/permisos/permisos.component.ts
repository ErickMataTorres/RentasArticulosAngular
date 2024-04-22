import { Component, OnInit } from '@angular/core';
import { Permiso } from '../../Modelo/permiso';
import { Rol } from '../../Modelo/rol';
import { RolesService } from '../../Controlador/roles/roles.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  FormsModule,
  MatCheckboxModule,
  MatButtonModule
];

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [materialModules],
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.css',
})
export class PermisosComponent implements OnInit {
  
  roles?: Rol[];

  inactivo = true;

  constructor(private _rolesS: RolesService) {}

  task: Task = {
    name: 'Menú',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Roles', completed: false, color: 'primary'},
      {name: 'Categorías', completed: false, color: 'primary'},
      {name: 'Estados de un artículo', completed: false, color: 'primary'},
      {name: 'Tipo de pagos', completed: false, color: 'primary'},
      {name: 'Tipo de ventas', completed: false, color: 'primary'},
      {name: 'Permisos', completed: false, color: 'primary'},
    ],
  };

  allComplete: boolean = false;

  ngOnInit(): void {
    this.ConsultarRoles();
  }

  ActivoInactivo():void{
    if(this.inactivo===true){
      this.inactivo=false;
    }
  }

  ConsultarRoles():void{
    this._rolesS.ConsultarRoles().subscribe(response => (this.roles=response));
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
    
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  Guardar():void{
    let nuevoArreglo: string[] = [];
    this.task.subtasks?.map(data=>{
      if(data.completed === true){
        nuevoArreglo.push(data.name);
      }
    });
    console.log(JSON.stringify(nuevoArreglo));
  }

}
