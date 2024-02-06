import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from '../../Modelo/categoria';
import { CategoriasService } from '../../Controlador/categorias/categorias.service';

const materialModules = [
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule
];

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [materialModules],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'accion'];
  dataSource!: MatTableDataSource<Categoria>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(
    private _categoriasS: CategoriasService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
      this.ConsultarCategorias();
  }

  ConsultarCategorias():void{
    this._categoriasS.ConsultarCategorias().subscribe(response=>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort= this.sort!;
    });
  }

  openDialog(accion:string, categoria: Categoria) {
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        accion,
        categoria: categoria
      },
      width:"20%",
      minWidth:"300px"
    });
    dialogRef.afterClosed().subscribe(result=>{
      
      if(result!==""&&result!==undefined&&result!==null){
        const type = accion==="Registrar"?"primary": accion === "Modificar" ? "warning" : "danger";        
        this.appendAlert(result.nombre, type);
        this.ConsultarCategorias();
      }
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();

    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
