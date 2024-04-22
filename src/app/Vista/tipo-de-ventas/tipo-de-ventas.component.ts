import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoDeVenta } from '../../Modelo/tipo-de-venta';
import { TipoDeVentasService } from '../../Controlador/tipoDeVentas/tipo-de-ventas.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

const materialModules = [
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule
];

@Component({
  selector: 'app-tipo-de-ventas',
  standalone: true,
  imports: [materialModules],
  templateUrl: './tipo-de-ventas.component.html',
  styleUrl: './tipo-de-ventas.component.css'
})
export class TipoDeVentasComponent implements OnInit{
  
  displayedColumns: string[] = ['nombre', 'accion'];
  dataSource!: MatTableDataSource<TipoDeVenta>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private _tipoDeVentasS: TipoDeVentasService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
      this.ConsultarTipoDeVentas();
  }

  ConsultarTipoDeVentas():void{
    this._tipoDeVentasS.ConsultarTipoDeVentas().subscribe(response=>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort= this.sort!;
    });
  }

  openDialog(accion:string, tipoDeVenta: TipoDeVenta) {
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        accion,
        tipoDeVenta: tipoDeVenta
      },
      width:"20%",
      minWidth:"300px"
    });
    dialogRef.afterClosed().subscribe(result=>{
      
      if(result!==""&&result!==undefined&&result!==null){
        const type = accion==="Registrar"?"primary": accion === "Modificar" ? "warning" : "danger";        
        this.appendAlert(result.nombre, type);
        this.ConsultarTipoDeVentas();
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
