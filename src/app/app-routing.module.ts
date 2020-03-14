import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductComponent} from './product/product.component';
import {CategoryComponent} from './category/category.component';
import {LoginComponent} from './login/login.component';
import {ProductlistComponent} from './productlist/productlist.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ProfileComponent} from './profile/profile.component';


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
    canActivate: [AuthGuardService]
  },
  {
		path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuardService]
  },
  {
		path: 'products/:id',
    component: ProductlistComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
