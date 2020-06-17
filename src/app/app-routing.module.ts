import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductComponent} from './product/product.component';
import {CategoryComponent} from './category/category.component';
import {LoginComponent} from './login/login.component';
import {ProductlistComponent} from './productlist/productlist.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ProfileComponent} from './profile/profile.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {InventoryIndexComponent} from './admin/inventory/inventory-index/inventory-index.component';
import {InventoryProductsComponent} from './admin/inventory/inventory-products/inventory-products.component';
import {InventoryRedeemableComponent} from './admin/inventory/inventory-redeemable/inventory-redeemable.component';
import {InventoryCategoryComponent} from './admin/inventory/inventory-category/inventory-category.component';
import {ProductCreateComponent} from './admin/forms/product-create/product-create.component';
import {CategoryCreateComponent} from './admin/forms/category-create/category-create.component';
import {PostCreateComponent} from './admin/forms/post-create/post-create.component';
import {PostComponent} from './admin/post/post.component';
import {PosIndexComponent} from './admin/point-of-sale/pos-index/pos-index.component';
import {UserIndexComponent} from './admin/users/user-index/user-index.component';

import { SalesComponent } from './admin/point-of-sale/sales/sales.component';
import { MsgIndexComponent } from './admin/msg/msg-index/msg-index.component';

import { AcrhiveIndexComponent } from './admin/archive/acrhive-index/acrhive-index.component';

import { ViewProductComponent } from './product/view-product/view-product.component';

import { WebPostComponent } from './web-post/web-post.component';

import { AccountConfigComponent } from './admin/account-config/account-config.component';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
	{
		path: "",
		redirectTo: "/home",
		pathMatch: "full"
	},
	{
		path: "home",
		component: HomeComponent
  },
  {
		path: 'products',
    component: ProductComponent,
  },
  {
    path: 'post',
    component: WebPostComponent,
  },
  {
		path: 'category',
    component: CategoryComponent,
  },
  {
		path: 'products/:id',
    component: ViewProductComponent,
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/home',
    component:AdminHomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/inventory',
    component:InventoryIndexComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/products',
    component: InventoryProductsComponent,
    canActivate: [AuthGuardService]
  },
   {
    path: 'admin/category',
    component: InventoryCategoryComponent,
    canActivate: [AuthGuardService]
  },
   {
    path: 'admin/redeemables',
    component: InventoryRedeemableComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/products/create',
    component: ProductCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/category/create',
    component: CategoryCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/post',
    component: PostComponent,
    canActivate: [AuthGuardService]
  },
   {
    path: 'admin/messages',
    component: MsgIndexComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/post/create',
    component: PostCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/point-of-sale',
    component: PosIndexComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/sales',
    component: SalesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/users',
    component: UserIndexComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/config',
    component: AccountConfigComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/archives',
    component: AcrhiveIndexComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
		path: "**",
		component: HomeComponent
	},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
