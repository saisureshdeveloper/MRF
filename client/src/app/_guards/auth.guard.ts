import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import * as jwt_decode from 'jwt-decode';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private user:UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const expectedRole = route.data.expectedRole;
        let token:any=localStorage.getItem('TOKEN');

        const decoded = jwt_decode(token);

            if (decoded.exp === undefined) return null;

            const date = new Date(0); 
            date.setUTCSeconds(decoded.exp);
            console.log("expppp",date)
//   return date;
//   if(date === undefined) return false;
//   return !(date.valueOf() > new Date().valueOf());
        
        let tokenPayload:any =JSON.parse( localStorage.getItem('currentUser'));
        if ((date !== undefined) && (token) &&(this.user.isAuthenticated) ){
            
            // console.log("tokenPayload.data.Role.roleCode",tokenPayload,tokenPayload.data.Roles.roleCode,expectedRole)
        if((date.valueOf() > new Date().valueOf())&&(tokenPayload.data.Roles.roleCode == expectedRole)) {
            // logged in so return true
            return true;
        }
        else{
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}