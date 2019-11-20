import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  flag:boolean=false;
  submenu:boolean=true;
  public listModules:any=[]
  public menuList:any;
  public headerName:string;
  constructor(private _service:UserService,private _router:Router) { }
  navitemsParent=[];
  navitemschildren=[];
  sample=true;
  CurrentURL=window.location.href;
  CurrentURLArr=this.CurrentURL.split('/');
  CHECKPAGE=this.CurrentURLArr[this.CurrentURLArr.length-1];
  titleName:string;
 ngOnChange()
 {
  this.CurrentURL=window.location.href;
  this.CurrentURLArr=this.CurrentURL.split('/');
  this.CHECKPAGE=this.CurrentURLArr[this.CurrentURLArr.length-1];
 }
  ngOnInit() {
    this.CurrentURL=window.location.href;
    this.CurrentURLArr=this.CurrentURL.split('/');
    this.CHECKPAGE=this.CurrentURLArr[this.CurrentURLArr.length-1];
      let obj:any=JSON.parse(localStorage.getItem('currentUser'));
      this.listModules=obj.data.Roles.Modules;
      for (let index = 0; index <   this.listModules.Features.length; index++) {
       
        if( !this.listModules.Features[index].parentFeatureID)
        {
          this.navitemsParent.push( this.listModules.Features[index])
        }
        else{
          this.navitemschildren.push( this.listModules.Features[index])
        }
      }
     if(localStorage.getItem('DEFAULT_MODULE'))
     {
       if(localStorage.getItem('DEFAULT_PAGE'))
       {
        this._router.navigateByUrl( '/main/'+localStorage.getItem('DEFAULT_MODULE')+'/'+localStorage.getItem('DEFAULT_PAGE')).then(nav => {
          console.log(nav); 

              for (var i=0; i < this.listModules.Features.length; i++) {
                if (this.listModules.Features[i].featureCode === this.CHECKPAGE) {
                  this.titleName=this.listModules.Features[i].featureName;
                }
            }
        }, err => {
          console.log(err) 
        });
       }
       else{
        this._router.navigateByUrl( '/main/'+localStorage.getItem('DEFAULT_MODULE')+'/HOME').then(nav => {
          console.log(nav); 
              for (var i=0; i < this.listModules.Features.length; i++) {
                if (this.listModules.Features[i].featureCode === this.CHECKPAGE) {
                  this.titleName=this.listModules.Features[i].featureName;
                }
            }
        }, err => {
          console.log(err) 
        });
       }
     }
     else{
      this._router.navigateByUrl( '/main').then(nav => {
        console.log(nav); 
      }, err => {
        console.log(err) 
      });
     }
      // this._router.navigateByUrl( '/master/reco_mod').then(nav => {
      //   console.log(nav); // true if navigation is successful
      // }, err => {
      //   console.log(err) // when there's an error
      // });

  }
  listmenu(id)
  {
    this._service.loadmenuitems(id)
    .subscribe(res=>{
      return res;
    })

  }
  toggle()
  {
      this.flag=!this.flag;
  }
  hidesubmenu()
  {
    this.submenu=!this.submenu;
  }
  navflag:boolean=false;
  hideme : any= {};
  listClick(e,item)
  {
    // this.navflag=!this.navflag
    Object.keys(this.hideme).forEach(h => {
      this.hideme[h] = false;
    });
    this.hideme[item.orgFeatureId] = true;
    console.log(e)
  }
  
  fetchURL(pid,url,menu)
  {
    console.log(this.CHECKPAGE);
    console.log("poid",pid,url,menu.featureCode);
    if(url)
    {
      // this.CHECKPAGE=code;
      this.titleName=menu.featureName;
      this.CHECKPAGE=menu.featureCode;
      this._router.navigateByUrl(url);
      let URLArr=url.split('/');
    
      
    }
    else{
      // this.sample=!this.sample;
      this.navflag=!this.navflag
    }
   
  }
  menuName(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].featureCode === nameKey) {
            this.headerName=myArray[i].featureName;
        }
    }
}

}
