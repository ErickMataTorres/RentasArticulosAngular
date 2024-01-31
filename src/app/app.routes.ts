import { Routes } from '@angular/router';
import { RolesComponent } from './Vista/roles/roles.component';
import { InicioComponent } from './Vista/inicio/inicio.component';

export const routes: Routes = [
    {
        path:"roles", component:RolesComponent
    },
    {
        path:"", component:InicioComponent
    }
];
