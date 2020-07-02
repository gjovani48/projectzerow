import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../models/user';
import {Router} from '@angular/router';

export interface UserDetails{
  _id: string
  firstname: string
  middlename: string
  lastname: string
  phone: string
  email: string
  password: string
  fingerprint_id: string
  pzwpoints: any
  registration_code: string
  exp: number
  iat: number
}

interface TokenResponse{
  token: string
}

export interface TokenPayload{
  _id: string
  firstname: string
  middlename: string
  lastname: string
  email: string
  password: string
}

export interface user_info{
  firstname: string
  middlename: string
  lastname: string
  phone: string
  email: string
  password: string
}


@Injectable({
	providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  //private url:string = "https://protected-escarpment-77600.herokuapp.com"
  private url:string = "http://localhost:80"
  private headers = new HttpHeaders().set('Content-Type', 'application/json')


  private token : string;

// LOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGIN logon

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if(!this.token){
        this.token = localStorage.getItem('usertoken')
    }
    return this.token;
  }

  public login(user: TokenPayload): Observable<any>{

      const base =  this.http.post<any>(
        this.url + "/user/login",
        user,
        { headers: this.headers }
      )

    const request = base.pipe(
      map((data: TokenResponse)=>{
        if(data.token){
          this.saveToken(data.token)
        }
        return data
      })

    )
    return request

    //return base;

  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }

  public profile(): Observable<any>{
    return this.http.get<any>(
      this.url + `/user/profile`,{
        headers: {authorization: `${this.getToken()}`}
    })
  }

  public getUserDetails(): UserDetails{

    const token = this.getToken()
    let payload

    if(token){
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    }
    else{
      return null;
    }

  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()

    if(user){
      return user.exp > Date.now()/1000;
    }
    else{
      return false;
    }
  }

  // LOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGINLOGIN

	// Get All Users
	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.url + "/user");
	}

  getArcUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "/user/arc");
  }

	// Get User by ID
	getUser(id): Observable<any> {
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
		const base = this.http.post<any>(
			this.url + "/user",
			user,
			{ headers: this.headers }
		)

    const request = base.pipe(
      map((data: TokenResponse)=>{
         if (data.token){
          this.saveToken(data.token)
         }
         return data
      })
    )
    return request
	}

  archiveUser(user): Observable<any> {
    return this.http.post<any>(
      this.url + "/user/archive",
      user,
      { headers: this.headers }
    )
  }

  unarchiveUser(user): Observable<any> {
    return this.http.post<any>(
      this.url + "/user/unarchive",
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
	addPZWPoints(userId,pzwpoints): Observable<any> {
		return this.http.put<any>(
			this.url + '/user/' + userId + '/pzwpoints',
			pzwpoints,
			{ headers: this.headers }
		)
	}
  

  deductPZWPoints(userId,pzwpoints): Observable<any> {
    return this.http.put<any>(
      this.url + '/user/' + userId + '/pzwpoints_deduct',
      pzwpoints,
      { headers: this.headers }
    )
  }


  forgotPassword(data): Observable<any> {
    return this.http.post<any>(
      this.url + "/user/recover",
      data,
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

  updateUserInfo(user): Observable<any> {
    return this.http.put<any>(
      this.url + "/user/" + user._id+'/info',
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
