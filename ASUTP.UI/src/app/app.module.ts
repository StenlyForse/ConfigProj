import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogListComponent } from './components/catalog/catalog-list/catalog-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddCatalogElemComponent } from './components/catalog/add-catalog-elem/add-catalog-elem.component';
import { FormsModule } from '@angular/forms';
import { EditCatalogElemComponent } from './components/catalog/edit-catalog-elem/edit-catalog-elem.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthenticatedComponent } from './components/authenticated/authenticated.component';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from './auth.guard';
import { ConfiguratorComponent } from './components/configurator/configurator.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogListComponent,
    AddCatalogElemComponent,
    EditCatalogElemComponent,
    AuthenticatedComponent,
    ConfiguratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
