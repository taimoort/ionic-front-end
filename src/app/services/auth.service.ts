import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {Storage} from "@ionic/storage";
import { EnvService } from './env.service';
import { User } from '../models/user';
import { UserData } from '../models/UserData';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;
  constructor(
    private http: HttpClient,
    //private storage: NativeStorage,
    private storage: Storage,
    private env: EnvService
  ) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'          
    })
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  // Create a new item
  createItem(item) {
    return this.http
      .post<UserData>(this.env.API_URL +'addProduct', JSON.stringify(item), this.httpOptions)
      .pipe(
        tap(userdata => {
          return userdata;
        })
        
      )
  }

  // Get single student data by ID
  getItem(id) {
    return this.http
      .get<UserData>(this.env.API_URL + 'getItem/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
 
  // Get students data
  getList(): Observable<UserData> {
    return this.http
      .get<UserData>(this.env.API_URL)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
 
  // Update item by id
  updateItem(id, item) {
    return this.http
      .put<UserData>(this.env.API_URL + 'updateproduct/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
 
  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<UserData>(this.env.API_URL+ 'deleteproduct/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  login(email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/login',
      {email: email, password: password}
    ).pipe(
      tap(token => {
        //this.storage.setItem('token', token)
        this.storage.set('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }
  register(fName: String, lName: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {fName: fName, lName: lName, email: email, password: password}
    )
  }
  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }
  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }

  userdata() {
    
    //const params = new HttpParams()
  //.set("UserID", UserID.toString());
    return this.http.get<UserData>(this.env.API_URL + 'getproducts', )
    .pipe(
      tap(userdata => {
        return userdata;
      })
    )
  }

  getToken() {
    return this.storage.get('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }
}
