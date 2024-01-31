import { Component, OnInit, ViewChild } from '@angular/core';
import { RolesService } from '../../Controlador/roles/roles.service';
import { Rol } from '../../Modelo/rol';


const materialModules = [
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule
]
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [materialModules],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'administrador', 'accion'];
  dataSource!: MatTableDataSource<Rol>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  
  constructor(
    private _rolesS: RolesService,
    public dialog: MatDialog
  ){}

    ngOnInit(): void {
        this.ConsultarRoles();
    }

    ConsultarRoles():void{
      this._rolesS.ConsultarRoles().subscribe(response=>{
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator!;
        this.dataSource.sort= this.sort!;
      });
    }

    openDialog(accion:string, rol: Rol) {
      this.dialog.open(DialogComponent,{
        data:{
          accion,
          rol: rol
        }
      });
    }

    appendAlert = (message:string, type:string) => {
      const alertPlaceholder = document.getElementById("liveAlertPlaceholder")!;
      const idUnico = Date.now().toString() + Math.random().toString();
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert" id="${idUnico}">
           <div>${message}</div>
        </div>`
      ].join('')
      alertPlaceholder.append(wrapper);
      setTimeout(()=>{
        document.getElementById(idUnico)?.remove();
      },8000);
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource!.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource?.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
