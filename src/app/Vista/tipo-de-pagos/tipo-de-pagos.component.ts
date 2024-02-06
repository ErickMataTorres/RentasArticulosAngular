import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoDePago } from '../../Modelo/tipo-de-pago';
import { MatDialog } from '@angular/material/dialog';
import { TipoDePagosService } from '../../Controlador/tipoDePagos/tipo-de-pagos.service';
import { DialogComponent } from '../roles/dialog/dialog.component';

const materialModules = [
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule
]

@Component({
  selector: 'app-tipo-de-pagos',
  standalone: true,
  imports: [materialModules],
  templateUrl: './tipo-de-pagos.component.html',
  styleUrl: './tipo-de-pagos.component.css'
})
export class TipoDePagosComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'comisionPorcentaje', 'accion'];
  dataSource!: MatTableDataSource<TipoDePago>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private _tipoDePagosS: TipoDePagosService,
    public dialog: MatDialog
  ){}
  ngOnInit(): void {
    this.ConsultarTipoDePagos();
  }

  ConsultarTipoDePagos():void{
    this._tipoDePagosS.ConsultarTipoDePagos().subscribe(response=>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort= this.sort!;
    });
  }

  openDialog(accion:string, tipoDePago: TipoDePago) {
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        accion,
        tipoDePago: tipoDePago
      },
      width:"20%",
      minWidth:"300px"
    });
    dialogRef.afterClosed().subscribe(result=>{
      
      if(result!==""&&result!==undefined&&result!==null){
        const type = accion==="Registrar"?"primary": accion === "Modificar" ? "warning" : "danger";        
        this.appendAlert(result.nombre, type);
        this.ConsultarTipoDePagos();
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
