import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ProductComponent} from './product/product.component';
import {CategoryComponent} from './category/category.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from "ngx-spinner";  
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {SidenavModule} from 'angular-ng-sidenav';

import {MatTableModule,MatSortModule,
        MatPaginatorModule,MatFormFieldModule,
        MatInputModule,MatSelectModule,
        MatCardModule,MatSnackBarModule} from '@angular/material';


import { FileUploadModule } from 'ng2-file-upload';


import {AuthGuardService} from './auth-guard.service'

import {HttpClientModule} from '@angular/common/http';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { InventoryIndexComponent } from './admin/inventory/inventory-index/inventory-index.component';
import { InventoryProductsComponent } from './admin/inventory/inventory-products/inventory-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCreateComponent } from './admin/forms/product-create/product-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    CategoryComponent,
    ProductlistComponent,
    ProfileComponent,
    AdminHomeComponent,
    InventoryIndexComponent,
    InventoryProductsComponent,
    ProductCreateComponent,
  ],
  imports: [
    HttpClientModule,
    NgxPaginationModule,
    FilterPipeModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SidenavModule,
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FileUploadModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
