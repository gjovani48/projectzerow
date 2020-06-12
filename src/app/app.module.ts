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
        MatCheckboxModule,MatStepperModule,
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
import {CategoryDialog} from './admin/inventory/inventory-category/category-dialog';
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
import {MessageDialog} from './admin/msg/msg-index/msg-dialog';
import { SalesAcrhiveComponent } from './admin/archive/sales-acrhive/sales-acrhive.component';
import { ProductAcrhiveComponent } from './admin/archive/product-acrhive/product-acrhive.component';
import { MessageAcrhiveComponent } from './admin/archive/message-acrhive/message-acrhive.component';
import { CategoryAcrhiveComponent } from './admin/archive/category-acrhive/category-acrhive.component';
import { PostAcrhiveComponent } from './admin/archive/post-acrhive/post-acrhive.component';
import { UserAcrhiveComponent } from './admin/archive/user-acrhive/user-acrhive.component';
import { AcrhiveIndexComponent } from './admin/archive/acrhive-index/acrhive-index.component';
import { TmchnSalesComponent } from './admin/point-of-sale/tmchn-sales/tmchn-sales.component';
import { AccountConfigComponent } from './admin/account-config/account-config.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { WebPostComponent } from './web-post/web-post.component';

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
    CategoryDialog,
    ProductDialogCreate,
    PosSalesDialog,
    MessageDialog,
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
    SalesAcrhiveComponent,
    ProductAcrhiveComponent,
    MessageAcrhiveComponent,
    CategoryAcrhiveComponent,
    PostAcrhiveComponent,
    UserAcrhiveComponent,
    AcrhiveIndexComponent,
    TmchnSalesComponent,
    AccountConfigComponent,
    ViewProductComponent,
    WebPostComponent,
  ],
  entryComponents: [ProductDialog,UserModal,ProductDialogCreate,
                      CategorytDialogCreate,UserInformationDialog,EmailDialog,
                    HistoryDialog,SalesDialog,PosSalesDialog,MessageDialog,CategoryDialog],
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
    MatStepperModule,
    MatSidenavModule,
    MatCheckboxModule,
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
