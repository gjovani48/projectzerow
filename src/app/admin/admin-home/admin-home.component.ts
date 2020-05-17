import { Component, OnInit } from '@angular/core';
import { UserService, UserDetails} from '../../services/user.service';
import { ProductService,} from '../../services/product.service';
import { CategoryService,} from '../../services/category.service';
import { SaleService,} from '../../services/sale.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private userServices: UserService,private router: Router, private productServices: ProductService, 
    private categoryServices:CategoryService, private saleServices: SaleService) { }

  isAdmin : boolean;

  public users = [];
  public categories = [];
  public products = [];
  public sales = [];

  ngOnInit() {
    this.getProfile();
    this.getData();
  }

  getProfile(){
    this.userServices.profile().subscribe(
      user=>{
        this.isAdmin = user.is_admin;
        
        if(this.isAdmin!=true){
          this.router.navigateByUrl('/home');
        }
        
      },
      err=>{
        console.log(err);
        // this.router.navigateByUrl('/login');
      }
    )

  }


  getData(){

    this.userServices.getUsers().subscribe((res)=>{
        this.users = res;
    })

    this.productServices.getProducts().subscribe((res)=>{
        this.products = res;
    })

    this.categoryServices.getCategories().subscribe((res)=>{
        this.categories = res;
    })

    this.saleServices.getSales().subscribe((res)=>{
        this.sales = res;
    })

  }

}
