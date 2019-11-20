import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { map } from 'rxjs/operators';
// import { HttpHeaders } from '@angular/common/http';

import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserService {

   public httpOptions : any;

  constructor(private _http : HttpClient) {
    //Http Headers Options
    this.httpOptions = {
      headers: new HttpHeaders (
        { 'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'my-auth-token'})
    }
  }

//   getAll() {
//       return this.http.get<User[]>(`${config.apiUrl}/users`);
//   }

//   getById(id: number) {
//       return this.http.get(`${config.apiUrl}/users/` + id);
//   }

//   register(user: User) {
//       return this.http.post(`${config.apiUrl}/users/register`, user);
//   }

//   update(user: User) {
//       return this.http.put(`${config.apiUrl}/users/` + user.id, user);
//   }

//   delete(id: number) {
//       return this.http.delete(`${config.apiUrl}/users/` + id);
//   }
listsite()
{
 
  return this._http.get<any>('http://localhost:3000/api/web/listsite') 

}
loadModules()
{
 
  let currentUser:any = JSON.parse(localStorage.getItem('currentUser'));
  
  let obj ={
    orgId:currentUser.data.organizationId,
    siteId:currentUser.data.siteId
  }

  return this._http.put<any>('http://localhost:3000/api/web/listmodule', obj) 

}
loadmenuitems(id)
{
  
  let currentUser:any = JSON.parse(localStorage.getItem('currentUser'));
  
  let obj ={
   moduleId:id
  }

  return this._http.put<any>('http://localhost:3000/api/web/listmenuDetails', obj) 


}
login(data)
{
  let obj={};
  // return this._http.put('http://localhost:3000/api/web/signin',data)

  return this._http.put<any>('http://localhost:3000/api/web/signin', { username: data.username, password: data.password,siteId:data.siteId })
  .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('TOKEN', user.token);
          localStorage.setItem('WIDGETS', JSON.stringify(user.data.Roles.Modules.widgets));
          localStorage.setItem('UserName', JSON.stringify(user.data.userName));
          localStorage.setItem('Id', JSON.stringify(user.data.userId));



          for(let list of user.data.UserPerferance) {
            localStorage.setItem(list.userPreferenceKey, list.userPreferenceValue);
          }
      }

      return user;
  }));
}
loadwigets()
{   
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    userId:currentUser.userId,
    moduleId:currentUser.moduleId
  }

  return this._http.put<any>('http://localhost:3000/api/web/listwidgets', obj) 
}

logout() {
  // remove user from local storage to log user out
  localStorage.clear();
}

getTokenExpirationDate(token: string): Date {
  const decoded = jwt_decode(token);

  if (decoded.exp === undefined) return null;

  const date = new Date(0); 
  date.setUTCSeconds(decoded.exp);
  return date;
}

// isTokenExpired(token?: string): boolean {
//   if(!token) token = this.getToken();
//   if(!token) return true;

//   const date = this.getTokenExpirationDate(token);
//   if(date === undefined) return false;
//   return !(date.valueOf() > new Date().valueOf());
// }
public isAuthenticated(): boolean {
  const token = localStorage.getItem('TOKEN');
  // Check whether the token is expired and return
  // true or false 
  return token?true:false;
}

 }
