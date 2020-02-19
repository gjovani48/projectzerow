import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../models/user'

@Injectable({
	providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  private url:string = "https://protected-escarpment-77600.herokuapp.com"
  private headers = new HttpHeaders().set('Content-Type', 'application/json')


	// Get All Users
	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.url + "/user");
	}

	// Get User by ID
	getUser(id): Observable<User> {
		return this.http.get<User>(
			this.url + "/user/" + id
		)
	}

	// Get User by Fingerprint
	getUserFingerprint(id): Observable<User> {
		return this.http.get<User>(
			this.url + "/user/fingerprint/" + id
		)
	}

	// Add New User
	addUser(user): Observable<any> {
		return this.http.post<any>(
			this.url + "/user",
			user,
			{ headers: this.headers }
		)
	}

	// Add Fingerprint ID
	addFingerprint(user): Observable<any> {
		return this.http.put<any>(
			this.url + '/user/' + user._id + '/fingerprintid',
			user,
			{ headers: this.headers }
		)
	}

	// Add PZW Points
	addPZWPoints(user): Observable<any> {
		return this.http.put<any>(
			this.url + '/user/' + user._id + '/pzwpoints',
			user,
			{ headers: this.headers }
		)
	}

	// Update User
	updateUser(user): Observable<any> {
		return this.http.put<any>(
			this.url + "/user/" + user._id,
			user,
			{ headers: this.headers }
		)
	}


	// Delete User
	deleteUser(id): Observable<User> {
		return this.http.delete<User>(
			this.url + "/user/" + id
		)
	}
}
