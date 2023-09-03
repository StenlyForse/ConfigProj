import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogListComponent } from './components/catalog/catalog-list/catalog-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddCatalogElemComponent } from './components/catalog/add-catalog-elem/add-catalog-elem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCatalogElemComponent } from './components/catalog/edit-catalog-elem/edit-catalog-elem.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthenticatedComponent } from './components/authenticated/authenticated.component';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from './auth.guard';
import { ConfiguratorComponent } from './components/configurator-folder/configurator/configurator.component';
import { SidebarComponent } from './components/configurator-folder/sidebar/sidebar.component';
import { ConfigsListComponent } from './components/configurator-folder/configs-list/configs-list.component';
import { EditConfigElemComponent } from './components/configurator-folder/edit-config-elem/edit-config-elem.component';
import { DataTablesModule } from "angular-datatables";
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogListComponent,
    AddCatalogElemComponent,
    EditCatalogElemComponent,
    AuthenticatedComponent,
    ConfiguratorComponent,
    SidebarComponent,
    ConfigsListComponent,
    EditConfigElemComponent,
    NavbarComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
