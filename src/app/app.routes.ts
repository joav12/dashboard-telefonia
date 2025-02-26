import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormPlanosComponent } from './components/form-planos/form-planos.component';
import { FormPComponent } from './components/form-planos/form-p/form-p.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { FormCComponent } from './components/form-clientes/form-c/form-c.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'planos', component: FormPlanosComponent },
    {path: 'planos/form', component: FormPComponent },
    {path: 'planos/form/:id', component: FormPComponent },
    {path: 'clientes', component: FormClientesComponent },
    {path: 'clientes/form', component: FormCComponent },
    {path: 'clientes/form/:id', component: FormCComponent },
];
