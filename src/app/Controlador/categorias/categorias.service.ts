import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../Modelo/categoria';
import { environment } from '../../../Environments/environment';
import { MensajeRespuesta } from '../../Modelo/mensaje-respuesta';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(
    private http: HttpClient
  ) { }

    ConsultarCategorias():Observable<Categoria[]>{
      return this.http.get<Categoria[]>(environment.API_URL + "/Categorias/ConsultarCategorias");
    }

    
    EjecutarAccionCategoria(categoria: any):Observable<MensajeRespuesta>{
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type":"application/json"
        })
      };
      return this.http.post<MensajeRespuesta>(environment.API_URL + "/Categorias/EjecutarAccionCategoria",categoria, httpOptions);
    }

    BorrarCategoria(id: number):Observable<MensajeRespuesta>{
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type":"application/json"
        })
      };
      return this.http.delete<MensajeRespuesta>(environment.API_URL + `/Categorias/BorrarCategoria/${id}`);
    }

}
