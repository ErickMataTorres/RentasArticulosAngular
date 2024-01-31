import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../../Modelo/rol';
import { environment } from '../../../Environments/environment';
import { MensajeRespuesta } from '../../Modelo/mensaje-respuesta';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http: HttpClient
  ) { }

    ConsultarRoles():Observable<Rol[]>{
      return this.http.get<Rol[]>(environment.API_URL + "/Roles/ConsultarRoles");
    }

    EjecutarAccion(rol: Rol):Observable<MensajeRespuesta>{
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type":"application/json"
        })
      };
      return this.http.post<MensajeRespuesta>(environment.API_URL + "/Roles/EjecutarAccionRol",rol, httpOptions);
    }

}
