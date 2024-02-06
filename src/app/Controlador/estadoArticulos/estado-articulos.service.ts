import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoArticulo } from '../../Modelo/estado-articulo';
import { environment } from '../../../Environments/environment';
import { MensajeRespuesta } from '../../Modelo/mensaje-respuesta';

@Injectable({
  providedIn: 'root'
})
export class EstadoArticulosService {

  constructor(
    private http:HttpClient
  ) { }

  ConsultarEstadoArticulos():Observable<EstadoArticulo[]>{
    return this.http.get<EstadoArticulo[]>(environment.API_URL + "/EstadoArticulos/ConsultarEstadoArticulos");
  }

  
  EjecutarAccionEstadoArticulo(estadoArticulo: any):Observable<MensajeRespuesta>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      })
    };
    return this.http.post<MensajeRespuesta>(environment.API_URL + "/EstadoArticulos/EjecutarAccionEstadoArticulo",estadoArticulo, httpOptions);
  }

  BorrarEstadoArticulo(id: number):Observable<MensajeRespuesta>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      })
    };
    return this.http.delete<MensajeRespuesta>(environment.API_URL + `/EstadoArticulos/BorrarEstadoArticulo/${id}`);
  }

}
