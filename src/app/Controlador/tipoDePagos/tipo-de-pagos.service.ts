import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDePago } from '../../Modelo/tipo-de-pago';
import { environment } from '../../../Environments/environment';
import { MensajeRespuesta } from '../../Modelo/mensaje-respuesta';

@Injectable({
  providedIn: 'root'
})
export class TipoDePagosService {

  constructor(
    private http:HttpClient
  ) { }

  ConsultarTipoDePagos():Observable<TipoDePago[]>{
    return this.http.get<TipoDePago[]>(environment.API_URL + "/TipoDePagos/ConsultarTipoDePagos");
  }

  
  EjecutarAccionTipoDePago(tipoDePago: any):Observable<MensajeRespuesta>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      })
    };
    return this.http.post<MensajeRespuesta>(environment.API_URL + "/TipoDePagos/EjecutarAccionTipoDePago",tipoDePago, httpOptions);
  }

  BorrarTipoDePago(id: number):Observable<MensajeRespuesta>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      })
    };
    return this.http.delete<MensajeRespuesta>(environment.API_URL + `/TipoDePagos/BorrarTipoDePago/${id}`);
  }

}
