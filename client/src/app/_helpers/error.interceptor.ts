import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AlertComponent } from '../shared/popup/alert/alert.component';
import { MatDialog } from '@angular/material';

// import { AuthenticationService } from '@/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: UserService, public dialog: MatDialog) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            if (err.status === 406) {
                // auto logout if 401 response returned from api
console.log(err)
                const dialogRef = this.dialog.open(AlertComponent, {
                    width: 'auto',
                    data: {
                      title: "Error - 406 ",
                      description:"Unknow User"
                    }
                  });
              
                  dialogRef.afterClosed().subscribe(result => {
                    console.log('The dialog was closed');
                    // this.animal = result;
                  });
                // alert("Error - 406 , unknow User")
                // this.authenticationService.logout();
                // location.reload(true);
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}