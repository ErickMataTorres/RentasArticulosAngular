import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TipoDePagosService } from '../../../Controlador/tipoDePagos/tipo-de-pagos.service';

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
  tipoDePagoForm = new FormGroup({
    id: new FormControl(this.data.tipoDePago.id),
    nombre: new FormControl(this.data.tipoDePago.nombre, [Validators.required]),
    comisionPorcentaje: new FormControl(this.data.tipoDePago.comisionPorcentaje, [Validators.required])
  });
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _tipoDePagosS:TipoDePagosService
  ){}

  ngOnInit(): void {
      
  }

  EjecutarAccionTipoDePago():void{

    if(this.tipoDePagoForm.value.nombre === "" || this.tipoDePagoForm.value.comisionPorcentaje === ""){
      this.tipoDePagoForm.get("nombre")?.markAsTouched();
      this.tipoDePagoForm.get("comisionPorcentaje")?.markAsTouched();
    }else{
      if(this.data.accion === "Registrar" || this.data.accion === "Modificar"){
        this._tipoDePagosS.EjecutarAccionTipoDePago(this.tipoDePagoForm.value).subscribe(response=>{
          this.dialogRef.close(response);
        })
      }else{
        this._tipoDePagosS.BorrarTipoDePago(this.tipoDePagoForm.value.id).subscribe(response=>{
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
