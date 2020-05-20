import { Injectable } from '@angular/core'
import { HttpClient ,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Redeem } from '../models/redeem'

@Injectable({
	providedIn: 'root'
})

export class RedeemService {

	constructor(private http: HttpClient) { }

	//private url:string = "https://protected-escarpment-77600.herokuapp.com"
    private url:string = "http://localhost:80"
  	private headers = new HttpHeaders().set('Content-Type', 'application/json')


	// Get All Redeems
	getRedeems(): Observable<Redeem[]> {
		return this.http.get<any>(this.url + "/redeem");
	}

	// Get Redeem by ID
	getRedeem(id): Observable<Redeem> {
		return this.http.get<any>(
			this.url + "/redeem/" + id
		)
	}

	// Add New Redeem
	addRedeem(redeem): Observable<any> {
		return this.http.post<any>(
			this.url + "/redeem",
			redeem,
			{ headers: this.headers }
		)
	}

	// Update Redeem
	updateRedeem(redeem): Observable<any> {
		return this.http.put<any>(
			this.url + "/redeem/" + redeem._id,
			redeem,
			{ headers: this.headers }
		)
	}

	// Delete Redeem
	deleteRedeem(id): Observable<Redeem> {
		return this.http.delete<Redeem>(
			this.url + "/redeem/" + id
		)
	}
}