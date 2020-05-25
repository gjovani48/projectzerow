import { Component, OnInit } from '@angular/core';
import {InventoryProductsComponent} from '../inventory-products/inventory-products.component';
import {InventoryCategoryComponent} from '../inventory-category/inventory-category.component';
import {InventoryRedeemableComponent} from '../inventory-redeemable/inventory-redeemable.component';
import { UserService, UserDetails} from '../../../services/user.service';
import { ProductService,} from '../../../services/product.service';
import { CategoryService,} from '../../../services/category.service';
import { SaleService,} from '../../../services/sale.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inventory-index',
  templateUrl: './inventory-index.component.html',
  styleUrls: ['./inventory-index.component.scss']
})
export class InventoryIndexComponent implements OnInit {

  isAdmin : boolean;

    constructor(private userServices: UserService,private router: Router, private productServices: ProductService, 
    private categoryServices:CategoryService, private saleServices: SaleService) { }

  ngOnInit() {
    this.getProfile();
    this.getData();
  }

  public users = [];
  public categories = [];
  public products = [];
  public sales = [];

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

  public quantity_list = [];
  public price_list = [];

   getData(){

    this.userServices.getUsers().subscribe((res)=>{
        this.users = res;
    })

    this.productServices.getProducts().subscribe((res)=>{
        this.products = res;

        res.forEach((item,index)=>{

        this.quantity_list.push(item.quantity);
        this.price_list.push(parseFloat(item.price.toString())*parseFloat(item.quantity.toString()));

      }) 

    })

    this.categoryServices.getCategories().subscribe((res)=>{
        this.categories = res;
    })

    this.saleServices.getSales().subscribe((res)=>{
        this.sales = res;
    })

  }

  totalQty(a,b){
    return a+b;
  }

  totalPrice(a,b){
    return a+b;
  }

}
