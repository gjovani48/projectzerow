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
        MatCardModule,MatSnackBarModule,
        MatButtonModule,MatExpansionModule,
        MatSidenavModule, MatToolbarModule,MatIconModule,MatButtonToggleModule,
        MatProgressBarModule,
        MatDialogModule,MatTabsModule} from '@angular/material';


import { FileUploadModule } from 'ng2-file-upload';
import { NgxImgZoomModule } from 'ngx-img-zoom';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';



import {AuthGuardService} from './auth-guard.service'

import {HttpClientModule} from '@angular/common/http';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { InventoryIndexComponent } from './admin/inventory/inventory-index/inventory-index.component';
import { InventoryProductsComponent } from './admin/inventory/inventory-products/inventory-products.component';
import {ProductDialog} from './admin/inventory/inventory-products/product-dialog';
import {ProductDialogCreate} from './admin/inventory/inventory-products/product-dialog-create';
import {UserModal} from './admin/point-of-sale/pos-index/user-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCreateComponent } from './admin/forms/product-create/product-create.component';
import { InventoryCategoryComponent } from './admin/inventory/inventory-category/inventory-category.component';
import { CategorytDialogCreate } from './admin/inventory/inventory-category/category-dialog-create';
import { CategoryCreateComponent } from './admin/forms/category-create/category-create.component';
import { InventoryRedeemableComponent } from './admin/inventory/inventory-redeemable/inventory-redeemable.component';
import { PostComponent } from './admin/post/post.component';
import { PostCreateComponent } from './admin/forms/post-create/post-create.component';
import { ArticleListComponent } from './admin/post/article-list/article-list.component';
import { VideosComponent } from './admin/post/videos/videos.component';
import { PosIndexComponent } from './admin/point-of-sale/pos-index/pos-index.component';
import { UserIndexComponent } from './admin/users/user-index/user-index.component';
import { SalesComponent } from './admin/point-of-sale/sales/sales.component';


import {UserInformationDialog} from './admin/users/user-index/information-dialog';
import {EmailDialog} from './admin/users/user-index/email-dialog';
import {HistoryDialog} from './admin/users/user-index/history-dialog';


import {SalesDialog} from './admin/point-of-sale/sales/sales-dialog';
import {PosSalesDialog} from './admin/point-of-sale/pos-index/pos-sales-dialog';
import { MsgIndexComponent } from './admin/msg/msg-index/msg-index.component';

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
    ProductDialog,
    ProductDialogCreate,
    PosSalesDialog,
    EmailDialog,
    HistoryDialog,
    CategorytDialogCreate,
    UserModal,
    SalesDialog,
    UserInformationDialog,
    InventoryCategoryComponent,
    CategoryCreateComponent,
    InventoryRedeemableComponent,
    PostComponent,
    PostCreateComponent,
    ArticleListComponent,
    VideosComponent,
    PosIndexComponent,
    UserIndexComponent,
    SalesComponent,
    MsgIndexComponent,
  ],
  entryComponents: [ProductDialog,UserModal,ProductDialogCreate,
                      CategorytDialogCreate,UserInformationDialog,EmailDialog,
                    HistoryDialog,SalesDialog,PosSalesDialog],
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
    CKEditorModule,
    NgxImgZoomModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatSidenavModule,
     MatToolbarModule,
     MatProgressBarModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatButtonModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
