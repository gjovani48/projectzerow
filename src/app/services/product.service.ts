import { Injectable } from '@angular/core'
import { HttpClient , HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Product } from '../models/product'

@Injectable({
	providedIn: 'root'
})

export class ProductService {

	constructor(private http: HttpClient) { }
	// private url = this.httpconfig.getURL()
  // 	private headers = this.httpconfig.getHeaders()
  private url:string = "https://protected-escarpment-77600.herokuapp.com"
  private local_url:string = "http://localhost:80"
  private headers = new HttpHeaders().set('Content-Type', 'application/json')

	// Get All Products
	getProducts(): Observable<Product[]> {
		return this.http.get<any>(this.url + "/product");
	}

	getArchProducts(): Observable<Product[]> {
		return this.http.get<any>(this.url + "/product/arc");
	}

	// Get Product by ID
	getProduct(id): Observable<Product> {
		return this.http.get<any>(
			this.url + "/product/" + id
		)
	}

	getProductsOnCategory(categoryList){
		return this.http.post<any>(
			this.url + "/product/findIn",
			categoryList,
			{ headers: this.headers }
		)
	}

	// Add New Product
	addProduct(product): Observable<any> {
		return this.http.post<any>(
			this.url + "/product",
			product,
			{ headers: this.headers }
		)
	}



	archiveProduct(product): Observable<any> {
		return this.http.post<any>(
			this.url + "/product/archive",
			product,
			{ headers: this.headers }
		)
	}

	unarchiveProduct(product): Observable<any> {
		return this.http.post<any>(
			this.url + "/product/unarchive",
			product,
			{ headers: this.headers }
		)
	}

	// Update Product
	updateProduct(product): Observable<any> {
		return this.http.put<any>(
			this.url + "/product/" + product._id,
			product,
			{ headers: this.headers }
		)
	}

	// Delete Product
	deleteProduct(id): Observable<any> {
		return this.http.delete<any>(
			this.url + "/product/" + id
		)
	}
}
