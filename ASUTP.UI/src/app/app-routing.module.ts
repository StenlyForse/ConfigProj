import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogListComponent } from './components/catalog/catalog-list/catalog-list.component';
import { AddCatalogElemComponent } from './components/catalog/add-catalog-elem/add-catalog-elem.component';
import { EditCatalogElemComponent } from './components/catalog/edit-catalog-elem/edit-catalog-elem.component';
import { AuthenticatedComponent } from './components/authenticated/authenticated.component';
import { AuthGuard } from 'src/app/auth.guard';
import { ConfiguratorComponent } from './components/configurator/configurator.component';

const routes: Routes = [
  /*{
    path:'',
    component: CatalogListComponent
  },*/
  {path:'auth', component: AuthenticatedComponent},
  {path:'catalog', component: CatalogListComponent, canActivate: [AuthGuard]},
  {path:'catalog/add', component: AddCatalogElemComponent, canActivate: [AuthGuard]},
  // Страница конкретного элемента
  {path:'catalog/edit/:id', component: EditCatalogElemComponent, canActivate: [AuthGuard]},
  {path:'configurator', component: ConfiguratorComponent, canActivate: [AuthGuard]},
  // путь по дефолту
  {path:'', redirectTo: 'auth', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
