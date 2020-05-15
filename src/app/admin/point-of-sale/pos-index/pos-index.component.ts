import {Component, OnInit, ViewChild,ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs';
import {UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {SaleService} from '../../../services/sale.service'
import {Router} from '@angular/router';
import {Sale} from '../../../models/sale';
import {Product} from '../../../models/product';


import {UserModal} from './user-modal';

// import {ProductDialog} from './product-dialog';
import { NgxImgZoomService } from 'ngx-img-zoom';

import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';

 export interface Item {
    s_product: any
    quantity: number
}

export interface PosProduct {
    _id: any
    category_id: any
    name: String
    description: String
    price: Number
    image: String
    quantity: Number
    pzwpoints_req: Number
}

@Component({
  selector: 'app-pos-index',
  templateUrl: './pos-index.component.html',
  styleUrls: ['./pos-index.component.scss']
})






export class PosIndexComponent implements OnInit {

    constructor(private ngxImgZoom: NgxImgZoomService,
              private _snackBar: MatSnackBar,private userService: UserService,private saleServices: SaleService,
              private router: Router,private productService: ProductService, 
              private categoryService: CategoryService,public dialog: MatDialog,private changeDetectorRef: ChangeDetectorRef) { }

  categories = [];
  public dataSource;

  public sales:Sale[];
  public totalCost;
  public item = [];

  public posProduct:PosProduct[];
  public selectedUser = {
  	 _id: '',
    firstname: '',
    middlename: '',
    lastname: '',
    phone: '',
    email: '',
    fingerprint_id: '',
    pzwpoints: '',
  };

  public dpname = '';


  products = []
  productsFilter: any = { name: ''};
  productsFilterAll: any = { name: ''};


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  obs: Observable<any>;

  ngOnInit() {

  	this.getCategories();
  	this.getProducts();

  }


 public categoryProducts = [];

 public loading: boolean;
 public loadingAll:boolean;


  getProducts(){

  	this.loadingAll = true;
  	this.products=[];

    this.productService.getProducts().subscribe((response) => {
      this.products = response;
      this.dataSource = new MatTableDataSource<PosProduct>(this.products);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      this.loadingAll = false;
    })
  }


 getCategories(){

    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
      this.dataSource = new MatTableDataSource(response);

      console.log(response);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

  }

  getProductsList(product){

  	this.loading = true;
  	this.categoryProducts = [];

  	this.categoryService.getProductList(product._id).subscribe(res=>{
          this.categoryProducts = res;
          console.log(product)

          this.loading = false;
      },
      err=>{
        console.log(err);
      })

  }


  addItem(row){

  	var indx;

  	if(this.item.length<1){
  		this.item.push({_id:row._id,name:row.name,image:row.image,price:row.price,quantity:1});
  	}
  	else{

  		if(this.item.some((res,i)=>{return res._id === row._id && ~(indx = i)})){
  			this.item[indx].quantity+=1;
  		}
  		else{
  			this.item.push({_id:row._id,name:row.name,image:row.image,price:row.price,quantity:1});
  		}
  	}

  	

  	
  }

  conputeTotal(){

  	var x=[];

  	for(var i=0; i<this.item.length; i++){
  		x[i] = parseFloat(this.item[i].price.toString())*parseFloat(this.item[i].quantity.toString());
  	}

  	this.totalCost = x.reduce(function(a, b){
		return a + b;
	}, 0);
  	

  	console.log(this.totalCost);

  }

  removeItem(index){
  	this.item.splice(index,1);
  }

  createSale(){

	  	var sales_data = new Sale();
	  	sales_data.user_id = this.selectedUser._id;
	  	sales_data.item = this.item;
	  	sales_data.total = this.totalCost;

	  	var pzwpoints = {
	  		pzwpoints: parseFloat(sales_data.total.toString())*0.5
	  	}


	  	this.saleServices.addSale(sales_data).subscribe((res)=>{
	  		

	  		if(res.status==true && this.selectedUser._id!=""){

	  			this.userService.addPZWPoints(sales_data.user_id,pzwpoints).subscribe((res)=>{


	  				if(res.status==true){
	  					alert('poins added to the user| transaction success');
	  				}

	  			})

	  		}
	  		else if(res.status==true && this.selectedUser._id==""){
	  			alert('transaction success');
	  		}

	  	})


  }

  onRightClick(){

  }

   openProductDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '100%';
    dialogConfig.width = '300px';
    dialogConfig.position = {
	    'top': '0',
	    left: '0'
	};

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(UserModal,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.selectedUser = result;
      this.dpname = this.selectedUser.firstname+' '+this.selectedUser.lastname;
    });


  }
}
