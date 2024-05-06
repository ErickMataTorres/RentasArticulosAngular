import { Component, OnInit } from '@angular/core';
import { Permiso } from '../../Modelo/permiso';
import { Rol } from '../../Modelo/rol';
import { RolesService } from '../../Controlador/roles/roles.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { PermisosService } from '../../Controlador/permisos/permisos.service';

const materialModules = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
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
  imports: [materialModules, FormsModule, ReactiveFormsModule],
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.css',
})
export class PermisosComponent implements OnInit {

  permisoForm = new FormGroup({
    idRol: new FormControl(),
    opciones: new FormControl()
  });
  
  roles?: Rol[];

  inactivo = true;

  constructor(
    private _rolesS: RolesService,
    private _permisosS: PermisosService
  ) {}

  task: Task = {
    name: 'Menú',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Roles', completed: false, color: 'primary'},
      { name: 'Categorías', completed: false, color: 'primary'},
      { name: 'Estados de un artículo', completed: false, color: 'primary'},
      { name: 'Tipo de pagos', completed: false, color: 'primary'},
      { name: 'Tipo de ventas', completed: false, color: 'primary'},
      { name: 'Permisos', completed: false, color: 'primary'},
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
    this.ConsultarPermisosPorIdRol();
  }

  ConsultarRoles():void{
    this._rolesS.ConsultarRoles().subscribe(response => (this.roles=response));
  }

  ConsultarPermisosPorIdRol(): void {
    this._permisosS.ConsultarPermisosPorIdRol(this.permisoForm.get("idRol")?.value).subscribe(response => {
      this.setAll(false);
      let responseOpciones = JSON.parse(response.opciones);
      this.task.subtasks?.map(data => {
        if (responseOpciones !== null) {
          responseOpciones.forEach((op: any) => {
            if (data.name === op) {
              data.completed = true;
            }
          });
        }
      });
    });
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
    this.permisoForm.patchValue({
      opciones: JSON.stringify(nuevoArreglo)
    });

    this._permisosS.GuardarPermiso(this.permisoForm.value).subscribe(response=>{
      const type = response.id === 1 ? "primary" : "warning";
      this.appendAlert(response.nombre, type);
      this.inactivo=true;
      this.permisoForm.reset();
      this.setAll(false);
    });

  }

  appendAlert = (message:string, type:string) => {
    const alertPlaceholder = document.getElementById("liveAlertPlaceholder")!;
    const idUnico = Date.now().toString() + Math.random().toString();
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert" id="${idUnico}">
         <div class="text-center">${message}</div>
      </div>`
    ].join('')
    alertPlaceholder.append(wrapper);
    setTimeout(()=>{
      document.getElementById(idUnico)?.remove();
    },8000);
  }

}
