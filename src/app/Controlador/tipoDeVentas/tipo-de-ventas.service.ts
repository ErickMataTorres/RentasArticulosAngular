import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDeVenta } from '../../Modelo/tipo-de-venta';
import { environment } from '../../../Environments/environment';
import { MensajeRespuesta } from '../../Modelo/mensaje-respuesta';

@Injectable({
  providedIn: 'root'
})
export class TipoDeVentasService {

  constructor(
    private http: HttpClient
  ) { }

  ConsultarTipoDeVentas():Observable<TipoDeVenta[]>{
    return this.http.get<TipoDeVenta[]>(environment.API_URL + "/TipoDeVentas/ConsultarTipoDeVentas");
  }

  
  EjecutarAccionTipoDeVenta(tipoDeVenta: any):Observable<MensajeRespuesta>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      })
    };
    return this.http.post<MensajeRespuesta>(environment.API_URL + "/TipoDeVentas/EjecutarAccionTipoDeVenta",tipoDeVenta, httpOptions);
  }

  BorrarTipoDeVenta(id: number):Observable<MensajeRespuesta>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      })
    };
    return this.http.delete<MensajeRespuesta>(environment.API_URL + `/TipoDeVentas/BorrarTipoDeVenta/${id}`);
  }

}
