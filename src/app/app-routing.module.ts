import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductComponent} from './product/product.component';
import {CategoryComponent} from './category/category.component';
import {LoginComponent} from './login/login.component';
// import {AuthGuardService} from './auth-guard.service';


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
    // canActivate: [AuthGuardService]
  },
  {
		path: 'category',
    component: CategoryComponent,
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
