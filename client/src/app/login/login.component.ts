import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 public username:any="";
  password:any="";
  model: any = {};

  public listsiteDetails=[];
  constructor(
    private _service:UserService,
    private route: ActivatedRoute,
    private router: Router,
    ) { 
      
    }
  onSubmit(k) {
    // this.model.siteId=this.listsiteDetails[0].siteId;
   console.log("data",this.model)
      this._service.login(this.model)
      .pipe(first())
            .subscribe(
                data => {
                  console.log("data",data)
                const helper = new JwtHelperService();

                const decodedToken = helper.decodeToken(data.token);
                const expirationDate = helper.getTokenExpirationDate(data.token);
                const isExpired = helper.isTokenExpired(data.token);
                // localStorage.setItem('site', this.listsiteDetails[0])
                console.log(`decodedToken`,decodedToken);
                  this.router.navigate(['/', 'main']).then(nav => {
                    console.log(nav); // true if navigation is successful
                  }, err => {
                    console.log(err) // when there's an error
                  });
                    
                  //  alert('SUCCESS!! :-)\n\n' + JSON.stringify(data))
                },
                error => {
                    // this.alertService.error(error);
                    // this.loading = false;
                });
      
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }
  ngOnInit() {
    this._service.logout();
    this._service.listsite()
    .subscribe(res=>{
      this.listsiteDetails=res;

    })
  }
  

}
