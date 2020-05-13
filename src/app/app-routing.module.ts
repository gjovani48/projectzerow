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
import {ProductCreateComponent} from './admin/forms/product-create/product-create.component';
import {CategoryCreateComponent} from './admin/forms/category-create/category-create.component';
import {PostCreateComponent} from './admin/forms/post-create/post-create.component';
import {PostComponent} from './admin/post/post.component';
import {PosIndexComponent} from './admin/point-of-sale/pos-index/pos-index.component';
import {UserIndexComponent} from './admin/users/user-index/user-index.component';


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
		path: 'category',
    component: CategoryComponent,
  },
  {
		path: 'products/:id',
    component: ProductlistComponent,
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin-home',
    component:AdminHomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'inventory',
    component:InventoryIndexComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'inventory-products',
    component: InventoryProductsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'inventory-products-create',
    component: ProductCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'inventory-category-create',
    component: CategoryCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'post',
    component: PostComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'post-create',
    component: PostCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'point-of-sale',
    component: PosIndexComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    component: UserIndexComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
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
