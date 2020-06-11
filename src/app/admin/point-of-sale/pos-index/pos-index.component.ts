import {Component, OnInit, Inject,ViewChild,ElementRef,ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs';
import {UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {RedeemService} from '../../../services/redeem.service'
import {CategoryService} from '../../../services/category.service'
import {SaleService} from '../../../services/sale.service'
import {Router} from '@angular/router';
import {Sale} from '../../../models/sale';
import {Redeem} from '../../../models/redeem';
import {Product} from '../../../models/product';


import {UserModal} from './user-modal';
import {PosSalesDialog} from './pos-sales-dialog';

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
              private router: Router,private productService: ProductService, private redeemServices: RedeemService,
              private categoryService: CategoryService,public dialog: MatDialog,private changeDetectorRef: ChangeDetectorRef) { }

  categories = [];
  public dataSource;

  public sales:Sale[];
  public totalCost;
  public totalCost_points;
  public item = [];
  public redeemed_item = [];

  public amount_due = 0;
  public change = 0;

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


  @ViewChild('prod-content',{static: true}) prod_content: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  obs: Observable<any>;

  ngOnInit() {

  	this.getCategories();
  	this.getProducts();

  }


 public categoryProducts = [];
 public redeemables = [];

 public loading: boolean;
 public loadingAll:boolean;
 public inredeem:boolean = false;


  getProducts(){

  	this.loadingAll = true;
  	this.products=[];

    this.productService.getProducts().subscribe((response) => {
      this.loadingAll = false;
      this.products = response;
      this.dataSource = new MatTableDataSource<PosProduct>(this.products);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
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

  	this.conputeTotal()

  	
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




  addItemRedeem(row){

    var indx;

    if(this.redeemed_item.length<1){
      this.redeemed_item.push({_id:row._id,name:row.name,image:row.image,pzwpoints_req:row.pzwpoints_req,quantity:1});
    }
    else{

      if(this.redeemed_item.some((res,i)=>{return res._id === row._id && ~(indx = i)})){
        this.redeemed_item[indx].quantity+=1;
      }
      else{
        this.redeemed_item.push({_id:row._id,name:row.name,image:row.image,pzwpoints_req:row.pzwpoints_req,quantity:1});
      }
    }

    this.conputeTotalRedeem();

    
  }

  conputeTotalRedeem(){

    var x=[];

    for(var i=0; i<this.redeemed_item.length; i++){
        x[i] = parseFloat(this.redeemed_item[i].pzwpoints_req.toString())*parseFloat(this.redeemed_item[i].quantity.toString());
      }

      this.totalCost_points = x.reduce(function(a, b){
      return a + b;
    }, 0);
    

  }




  removeItem(index){
  	this.item.splice(index,1);
  	this.conputeTotal()
  }

   removeRedeemedItem(index){
    this.redeemed_item.splice(index,1);
    this.conputeTotalRedeem()
  }

  createSale(){

      var tr_code;

	  	var sales_data = new Sale();
	  	sales_data.user_id = this.selectedUser._id;
	  	sales_data.item = this.item;
	  	sales_data.total = this.totalCost;
	  	sales_data.amount_due = this.amount_due;
	  	sales_data.change = this.change;

	  	var pzwpoints = {
	  		pzwpoints: parseFloat(sales_data.total.toString())*.05
	  	}


	  	this.saleServices.addSale(sales_data).subscribe((res)=>{

        console.log(res)

        tr_code = res.transaction_code;
	  		

	  		if(res.status==true && this.selectedUser._id!=""){

	  			this.userService.addPZWPoints(sales_data.user_id,pzwpoints).subscribe((res)=>{


	  				if(res.status==true){
	  					alert('poins added to the user| transaction success'+" "+res.transaction_code);
	  				}

	  			})

          this.openPosSalesDialog(sales_data,res.transaction_code);

	  		}
	  		else if(res.status==true && this.selectedUser._id==""){
	  			alert('transaction success'+res.transaction_code);
          this.openPosSalesDialog(sales_data,res.transaction_code);
	  		}

	  	})


      


  }

  createRedeem(){

      var redeem_data = new Redeem();
      redeem_data.user_id = this.selectedUser._id;
      redeem_data.item = this.redeemed_item;
      redeem_data.total = this.totalCost_points;
      redeem_data.remaining_points = parseFloat(this.selectedUser.pzwpoints.toString()) - parseFloat(redeem_data.total.toString());

      var pzwpoints = {
        pzwpoints: this.totalCost_points
      }


      this.redeemServices.addRedeem(redeem_data).subscribe((res)=>{
        

        if(res.status==true){

          this.userService.deductPZWPoints(redeem_data.user_id,pzwpoints).subscribe((res)=>{


            if(res.status==true){
              alert('poins deducted to the user| transaction success');
            }

          })

        }

      })


  }

  payment(){

  	this.change = parseFloat(this.amount_due.toString()) - parseFloat(this.totalCost.toString());

  }

  onRightClick(){

  }

   openUserDialog(msg) {

    const dialogConfig = new MatDialogConfig();

  
    dialogConfig.height = '100%';
    dialogConfig.width = '300px';
    dialogConfig.position = {
	    'top': '0',
	    left: '0'
	};

    dialogConfig.data = {
        title: msg
    };

    const dialogRef = this.dialog.open(UserModal,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.selectedUser = result;
      this.dpname = this.selectedUser.firstname+' '+this.selectedUser.lastname;

    });


  }

  removeCustomer(){
  	this.selectedUser = null;
  	this.dpname = null;
  }


  cancellTransaction(){

    if(confirm("Are you sure you want tor cancel the current transaction?")==true){
      this.removeCustomer();
      this.item = [];
      this.redeemed_item = [];
    }


  }


  openRedeem(){

   this.inredeem = true;

    this.loading = true;
    this.categoryProducts = [];

    this.categoryService.getProductList('5e585e3fcbd1ba001710412c').subscribe(res=>{
          this.categoryProducts = res;
          console.log(res)

          this.loading = false;
      },
      err=>{
        console.log(err);
      })
    

  }

  closeRedeem(){
    this.inredeem = false;
  }

   openPosSalesDialog(sales,code) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = "450px"

    dialogConfig.position = {
      'top': "30px;"
    }

    dialogConfig.data = {
        sales_info: sales,
        client: this.selectedUser,
        transaction_code: code
    };

    const dialogRef = this.dialog.open(PosSalesDialog,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  getLatestSale(){

    this.saleServices.getLatestSale().subscribe((res)=>{

      console.log(res);

    })

  }

}
