import { Routes } from '@angular/router';
import { RolesComponent } from './Vista/roles/roles.component';
import { InicioComponent } from './Vista/inicio/inicio.component';
import { CategoriasComponent } from './Vista/categorias/categorias.component';
import { EstadoArticulosComponent } from './Vista/estado-articulos/estado-articulos.component';
import { TipoDePagosComponent } from './Vista/tipo-de-pagos/tipo-de-pagos.component';
import { TipoDeVentasComponent } from './Vista/tipo-de-ventas/tipo-de-ventas.component';
import { PermisosComponent } from './Vista/permisos/permisos.component';

export const routes: Routes = [
    {
        path:"", component:InicioComponent
    },
    {
        path:"roles", component:RolesComponent
    },
    {
        path:"categorias", component:CategoriasComponent
    },
    {
        path:"estadoArticulos", component:EstadoArticulosComponent
    },
    {
        path:"tipoDePagos", component:TipoDePagosComponent
    },
    {
        path:"tipoDeVentas", component:TipoDeVentasComponent
    },
    {
        path:"permisos",component: PermisosComponent
    }
];
