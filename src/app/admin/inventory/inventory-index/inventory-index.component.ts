import { Component, OnInit } from '@angular/core';
import {InventoryProductsComponent} from '../inventory-products/inventory-products.component';
import {InventoryCategoryComponent} from '../inventory-category/inventory-category.component';
import { UserService, UserDetails} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inventory-index',
  templateUrl: './inventory-index.component.html',
  styleUrls: ['./inventory-index.component.scss']
})
export class InventoryIndexComponent implements OnInit {

  isAdmin : boolean;

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.userService.profile().subscribe(
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

}
