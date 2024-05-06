import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permiso } from '../../Modelo/permiso';
import { environment } from '../../../Environments/environment';
import { MensajeRespuesta } from '../../Modelo/mensaje-respuesta';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(
    private http: HttpClient
  ) { }

  ConsultarPermisosPorIdRol(idRol: number):Observable<Permiso>{
    return this.http.get<Permiso>(environment.API_URL + `/Permisos/ConsultarPermisosPorIdRol?idRol=${idRol}`);
  }

  GuardarPermiso(permiso: any):Observable<MensajeRespuesta>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      })
    };
    return this.http.post<MensajeRespuesta>(environment.API_URL + "/Permisos/GuardarPermisos", permiso, httpOptions);

  }

}
