import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { EstadoArticulo } from '../../Modelo/estado-articulo';
import { EstadoArticulosService } from '../../Controlador/estadoArticulos/estado-articulos.service';

const materialModules = [
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule
];

@Component({
  selector: 'app-estado-articulos',
  standalone: true,
  imports: [materialModules],
  templateUrl: './estado-articulos.component.html',
  styleUrl: './estado-articulos.component.css'
})
export class EstadoArticulosComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'accion'];
  dataSource!: MatTableDataSource<EstadoArticulo>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private _estadoArticulosS: EstadoArticulosService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
      this.ConsultarEstadoArticulos();
  }

  ConsultarEstadoArticulos():void{
    this._estadoArticulosS.ConsultarEstadoArticulos().subscribe(response=>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort= this.sort!;
    });
  }

  openDialog(accion:string, estadoArticulo: EstadoArticulo) {
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        accion,
        estadoArticulo: estadoArticulo
      },
      width:"20%",
      minWidth:"300px"
    });
    dialogRef.afterClosed().subscribe(result=>{
      
      if(result!==""&&result!==undefined&&result!==null){
        const type = accion==="Registrar"?"primary": accion === "Modificar" ? "warning" : "danger";        
        this.appendAlert(result.nombre, type);
        this.ConsultarEstadoArticulos();
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
