import { Injectable } from '@angular/core'
import { HttpClient ,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Sale } from '../models/sale'
import { Cart } from '../models/cart'

export interface montlysale{
	_id: any
	totalAmount: Number
	count: Number
}

@Injectable({
	providedIn: 'root'
})

export class SaleService {

	constructor(private http: HttpClient) { }

	private url:string = "https://protected-escarpment-77600.herokuapp.com"
    //private url:string = "http://localhost:80"
  	private headers = new HttpHeaders().set('Content-Type', 'application/json')

	// Get All Sales
	getSales(): Observable<Sale[]> {
		return this.http.get<any>(this.url + "/sale");
	}

	getCartSales(): Observable<Cart[]> {
		return this.http.get<any>(this.url + "/cart");
	}

	getArcSales(): Observable<Sale[]> {
		return this.http.get<any>(this.url + "/sale/arc");
	}

	getLatestSale(): Observable<Sale[]> {
		return this.http.get<any>(this.url + "/sale/latest");
	}

	getOldestSale(): Observable<Sale[]> {
		return this.http.get<any>(this.url + "/sale/oldest");
	}

	getMonthlySales(): Observable<montlysale[]> {
		return this.http.get<any>(this.url + "/sale/monthly");
	}

	// Get Sale by ID
	getSale(id): Observable<Sale> {
		return this.http.get<any>(
			this.url + "/sale/" + id
		)
	}

	getSaleByCode(id): Observable<Sale> {
		return this.http.get<any>(
			this.url + "/sale/slug/" + id
		)
	}

	// Add new Sale
	addSale(sale): Observable<any> {
		return this.http.post<any>(
			this.url + "/sale",
			sale,
			{ headers: this.headers }
		)
	}

	archiveSale(sale): Observable<any> {
		return this.http.post<any>(
			this.url + "/sale/archive",
			sale,
			{ headers: this.headers }
		)
	}

	unarchiveSale(sale): Observable<any> {
		return this.http.post<any>(
			this.url + "/sale/unarchive",
			sale,
			{ headers: this.headers }
		)
	}

	archiveMulSale(_ids): Observable<any> {
		return this.http.post<any>(
			this.url + "/sale/archive/many",
			_ids,
			{ headers: this.headers }
		)
	}
	

	// Update Sale
	updateSale(sale): Observable<any> {
		return this.http.put<any>(
			this.url + "/sale/" + sale._id,
			sale,
			{ headers: this.headers }
		)
	}

	// Delete Sale
	deleteSale(id): Observable<Sale> {
		return this.http.delete<Sale>(
			this.url + "/sale/" + id
		)
	}
}