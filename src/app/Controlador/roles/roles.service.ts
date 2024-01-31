import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../../Modelo/rol';
import { environment } from '../../../Environments/environment';

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

}
