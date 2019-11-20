import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import { AlertComponent } from '../alert/alert.component';
import { RecoService } from 'src/app/services/reco.service';
import { ButtonRendererComponent } from '../../renderer/editbutton.component';
@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  columnDefs=[];
  rowData:any=[]
  public currentUser:any=JSON.parse(localStorage.getItem('currentUser'));

  public gettingERPColumn=this.currentUser.data.Roles.Modules.ERPTable;
  public Allocatedamount:any="";
  public AllocatedDate:any="";
  public InvoiceNumber:any="";
  public ReferanceNumber:any="";
  public ExchangeRate:any="";
  public refNo:any="";
  password:any="";
  model: any = {};
  refmodel: any = {};

  allocated_amount:any;

  public ContractColumn=[
    {
      headerName:"Allocatedamount", field: "amount_3", sort: true,resizable: true, 
      editable: true,
    
      filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
      {
        headerName:"Allocated Date", field: "allocatedDate", sort: true,resizable: true, 
        editable: true,
      
        filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
        {
          headerName:"Invoice Number", field: "referenceText_3", sort: true,resizable: true, 
          editable: true,
        
          filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
          {
            headerName:"Referance Number", field: "referenceText_4", sort: true,resizable: true, 
            editable: true,
          
            filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
            {
              headerName:"Exchange Rate", field: "amount_4", sort: true,resizable: true, 
              editable: true,
            
              filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
              {headerName:"", field: "contractId", width: 90, pinned: 'right',
              cellRenderer: 'buttonRenderer',
              cellRendererParams: {
                onClick: this.DeleteRecord.bind(this),
                label: 'Delete'
              }}
      
  ]
  ContractrowData:any=[];
  frameworkComponents:any;
  constructor(
    public recoservice:RecoService,
    public dialogRef: MatDialogRef<EditTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) {
      this.frameworkComponents = {
        buttonRenderer: ButtonRendererComponent,
      }
      dialogRef.disableClose = true;
      for(let i=0;i<this.gettingERPColumn.length;i++)
      {
        if (this.gettingERPColumn[i].columnActionDetails.type == "text" || this.gettingERPColumn[i].columnActionDetails.type == "number" ) {
         
          if( this.gettingERPColumn[i].sourceIntColName == "AllocatedAmount" || this.gettingERPColumn[i].sourceIntColName == "BankReferenceNumbers" || this.gettingERPColumn[i].sourceIntColName == "ForwardRate")
          {
            this.columnDefs.push(
              {
                headerName:this.gettingERPColumn[i].sourceIntColName, field: this.gettingERPColumn[i].targetTableColName, sort: true,resizable: true, 
                editable: true,
              
                filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true }) 
          }
          else{
            this.columnDefs.push(
              {
                headerName:this.gettingERPColumn[i].sourceIntColName, field: this.gettingERPColumn[i].targetTableColName, sort: true,resizable: true, 
               
              
                filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true }) 
          }
         
          
        }
        else if( this.gettingERPColumn[i].columnActionDetails.type == "date" )
        {
          this.columnDefs.push( 
            {headerName:this.gettingERPColumn[i].sourceIntColName, field: this.gettingERPColumn[i].targetTableColName,  sort: true,resizable: true, 
            cellRenderer: (data) => {
              return moment(data.value).format('DD/MM/YYYY')
          },
          filter: "agDateColumnFilter",suppressSizeToFit: true,suppressAutoSize: true },) 
    
        }
      }
      let youData = [];
      youData.push(this.data.rowdata);
      this.rowData=youData;
      console.log("this.rowData",this.rowData)
      this.listtable();
    
    }
    
    listtable()
    {  this.recoservice.findingContractValueByderviedCol(this.rowData[0].intRecordsId).subscribe(res=>{
      this.ContractrowData=res;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // this.columnDefs=this.data.columnDefs;

    
    
    // this.rowData.push(this.data.rowdata);

  }
  submit()
  {
  
    const dialogRef1 = this.dialog.open(AlertComponent, {
      width: 'auto',
      data: {
        title: "Alert",
        description:"Data Submitted Successfully"
      }
    });

    dialogRef1.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogRef.close();
      // this.animal = result;
    }); 
  }
  ngOnChanges()
  {
   
   
  }
  DeleteRecord(e){
    console.log("deleting record",e.rowData.contractId)
    this.recoservice.DeletedContract(this.rowData[0],e.rowData.contractId)
    .subscribe(res=>{
      console.log("res",res);
      this.listtable();
    })
  }
  public gridApi;
  public gridColumnApi;
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
   
}
addref()
{
  console.log("thsi,red",this.refmodel)
  if(this.ContractrowData.length>0)
  {
    const dialogRef2 = this.dialog.open(AlertComponent, {
      width: 'auto',
      data: {
        title: "Alert",
        description:"Already having Allocation"
      }
    });

    dialogRef2.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.dialogRef.close();
      // this.animal = result;
    }); 
    return  false;
  }
  else{
    this.recoservice.AddReferanceNumber(this.rowData[0].intRecordsId,this.refmodel.refNo)
    .subscribe(res=>{
      console.log("response",res);
      this.listtable();
      
    const dialogRef3 = this.dialog.open(AlertComponent, {
      width: 'auto',
      data: {
        title: "Alert",
        description:"Data Saved Successfully"
      }
    });

    dialogRef3.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogRef.close();
      // this.animal = result;
    }); 
    })
  }
  
 
}
Cancel()
{
  this.dialogRef.close();

}
addRecord()
{
  console.log("model",this.model)
  
  this.recoservice.AddContract(this.rowData[0],this.model)
  .subscribe(res=>{
    console.log("response",res);
    this.listtable();

  })


// this.ContractrowData=[this.model]
}
}
