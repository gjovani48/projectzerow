import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private url = this.httpconfig.getURL()
  // private headers = this.httpconfig.getHeaders()

  private url:string = "http://localhost:80"
  private headers = new HttpHeaders().set('Content-Type', 'application/json')

  private token : string;

  constructor(private http: HttpClient,private router: Router) { }

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
      return user.exp > Date.now()/100
    }
    else{
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any>{

      const base = this.http.post('/user/register/', user)

      const request = base.pipe(
        map((data: TokenResponse)=>{
          if(data.token){
            this.saveToken(data.token)
          }
          return data
        })

      )

      return request

  }


  public login(user: TokenPayload): Observable<any>{
    const base = this.http.post(
      this.url + ":80/user/login/" + user,
      {headers:this.headers}
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

  }


  // addCategory(category): Observable<any> {
	// 	return this.http.post<any>(
	// 		this.url + "/category",
	// 		category,
	// 		{ headers: this.headers }
	// 	)
	// }


  public profile(): Observable<any>{
    return this.http.get('/user/profile',{
      headers:{Authorization: `${this.getToken()}`}
    })
  }


  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }

}
