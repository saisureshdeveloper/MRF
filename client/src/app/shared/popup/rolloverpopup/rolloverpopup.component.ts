import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RecoService } from 'src/app/services/reco.service';
// import { DialogData } from 'src/app/reco/dashboard/dashboard.component';

@Component({
  selector: 'app-rolloverpopup',
  templateUrl: './rolloverpopup.component.html',
  styleUrls: ['./rolloverpopup.component.css']
})
export class RolloverpopupComponent implements OnInit {

  constructor(
    public recoservice:RecoService,
    public dialogRef: MatDialogRef<RolloverpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
    }
    public Targetcontractnumber:any="";
    model: any = {};
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log("data",this.data)
  }
  public flag:boolean=false;
  message:any="";
  save(val)
  {
    this.recoservice.RollOverRecord(this.data.intRecordsId,val).subscribe(res=>{
      console.log("red",res)
      let obj:any=res;
     
      this.flag=!obj.flag;
      if( !this.flag)
      {
        this.dialogRef.close();
        
      }
      this.message=obj.message;
    })
  }

}
