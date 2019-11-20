import { Component, OnInit, EventEmitter,ViewChild, Output } from '@angular/core';
import { RecoService } from 'src/app/services/reco.service';
import { MatDialog } from '@angular/material';
import { AlertComponent } from 'src/app/shared/popup/alert/alert.component';
import { OwlCarousel } from 'ngx-owl-carousel';
import { UserService } from 'src/app/services/user.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as moment from 'moment';
import { GridOptionsWrapper, GridOptions, Grid } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { Alert } from 'selenium-webdriver';
import { BankService } from 'src/app/shared/table/banktable/bank.service';
import { ERPTabelService } from 'src/app/shared/table/erptable/erp.service';
import { RolloverpopupComponent } from 'src/app/shared/popup/rolloverpopup/rolloverpopup.component';
import { ConfirmationpopupComponent } from 'src/app/shared/popup/confirmationpopup/confirmationpopup.component';
// AgGridAngular
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('owlElement') owlElement: OwlCarousel
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Output() RemoveSelectedRecord: EventEmitter<any> = new EventEmitter();

  next()
  {
    this.owlElement.next([200])
  }
  previous()
  {
    this.owlElement.previous([200])
  }
//   public gridApi;
// public gridColumnApi;
public isEditable:boolean=false;

public OrdercolumnDefs;
public BankcolumnDefs;
public autoGroupColumnDef;
public defaultColDef;
public rowSelection;
public rowGroupPanelShow;
public pivotPanelShow;
  public SelectedOrderData=[];
  public SelectedBankData=[];

  public widgets2:ChartOptions={
                 responsive:true,                     
    title:{
      // responsive: false,
      display:true,
      text:'Invoices Due (2019) By Value',
      fontSize:18
      },
      legend:{
      display:true,
      position:'right',
      labels:{
        fontColor:'#000'
      }
      
      
    }
    }
  public flag;
  public gettingdata: any;
  public loadwigetsdata:any
  public listOfGridValue=[];
  public title: string = "Alert";
  public description: string = "This operation is unpredicatable";
  public options={
    legend: {
        display: true,
        position: 'right',
        labels: {
            fontColor: '#333'
        }
    }
  }

  mySlideOptions = {
    items: 1,
    dots: false,
    nav: true,

    navigation: true,
    // navigationText: ["<img src='myprevimage.png'>","<img src='mynextimage.png'>"]
    navigationText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],


  };
  myCarouselOptions = {
    items: 1,
    dots: false,
    nav: true
  };
  private OrdergridApi;
  private OrdergridColumnApi;
  private gridApi;
  private gridColumnApi;

  constructor(private recoservice: RecoService,
    private userservice: UserService,
    public dialog: MatDialog,
    private http: HttpClient,
    public bankservice:BankService,
    public erptableservice:ERPTabelService
  ) {
    this.OrdercolumnDefs =  [
      {headerName: "Entity", field: "classification_1", resizable: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true, pinned: 'left',
      },
      {headerName: "OrderType", field: "classification_2", resizable: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true},
      {headerName: "OrderNumber", field: "referenceText_1", resizable: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: "Party", field: "referenceText_2", resizable: true, filter: "agTextColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
      
  
      {headerName: 'Booking Date', field: 'referenceDateTime_1',  resizable: true, 
      cellRenderer: (data) => {
        return moment(data.value).format('DD/MM/YYYY')
    },
    filter: "agDateColumnFilter",suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: "Currency", field: "referenceText_5",  resizable: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: "DueDate", field: "referenceDateTime_2", resizable: true, filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: "OrderValue", field: "amount_1", resizable: true, filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: "TotalContractValue", field: "amount_2", resizable: true, filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
  
       {headerName: "AllocatedAmount", field: "amount_3", resizable: true, filter: "agNumberColumnFilter", suppressSizeToFit: true,},
       {headerName: "ForwardRate", field: "amount_4", resizable: true, filter: "agNumberColumnFilter", suppressSizeToFit: true,},
      {headerName: "SpotRate", field: "amount_5", resizable: true, filter: "agNumberColumnFilter", suppressSizeToFit: true, },
       {headerName: "ForwardContractNumbers", field: "referenceText_3", resizable: true, filter: "agNumberColumnFilter", suppressSizeToFit: true, },
       {headerName: "BankReferenceNumbers", field: "referenceText_4", resizable: true, filter: "agNumberColumnFilter", suppressSizeToFit: true, },
       {headerName: "LastUpdated", field: "lastUpdatedDt", resizable: true, filter: "agDateColumnFilter", },
       {headerName: "LastPayDate", field: "referenceDateTime_3", resizable: true, filter: "agDateColumnFilter", },
      
     
    
  
    ];

    // this.OrdercolumnDefs =  [
    //   {headerName: 'Supplier Name', field: 'referenceText_2',resizable: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true, pinned: 'left',
    //   },
    //   {headerName: 'Bank', field: 'referenceText_3',resizable: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true},
    //   {headerName: 'SO/PO No', field: 'referenceText_4',resizable: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true },
    //   {headerName: 'Forward Contract No', field: 'referenceText_11',resizable: true, filter: "agTextColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
      
  
    //   {headerName: 'Booking Date', field: 'referenceDateTime_2', resizable: true, 
    //   cellRenderer: (data) => {
    //     return moment(data.value).format('DD/MM/YYYY')
    // },
    // filter: "agDateColumnFilter",suppressSizeToFit: true,suppressAutoSize: true },
    //   {headerName: 'Booking Date', field: 'referenceText_5', resizable: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true },
    //   {headerName: 'FC amount', field: 'amount_2',resizable: true, filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
    //   {headerName: 'Utilisation', field: 'amount_3',resizable: true, filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
    //   {headerName: 'Cl. Balance', field: 'amount_4',resizable: true, filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
  
  
    //   {headerName: 'Maturity Date', field: 'referenceDateTime_1', resizable: true, 
    //   cellRenderer: (data) => {
    //     return moment(data.value).format('DD/MM/YYYY')
    // },
    // filter: "agDateColumnFilter",suppressSizeToFit: true,suppressAutoSize: true },
    // {headerName: 'Fwd Rate', field: 'amount_5',resizable: true, filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
    // {headerName: 'Spot Rate', field: 'amount_6',resizable: true, filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
  
  
    // ];
    this.BankcolumnDefs =  [
      {headerName: 'Bank Date', field: 'referenceDateTime_1',
      cellRenderer: (data) => {
        return moment(data.value).format('DD/MM/YYYY')
    },
      filter: "agDateColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Description', field: 'referenceText_1', filter: "agTextColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Debit', field: 'debitAmount', filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: 'Bank Credit', field: 'creditAmount',sort: true, filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Branch Code', field: 'referenceText_3', filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Value Date	', field: 'referenceDateTime_2', 
      cellRenderer: (data) => {
        return moment(data.value).format('DD/MM/YYYY')
    },
      filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Balance', field: 'amount_1', filter: true ,suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: 'Bank Bank Stmt ID', field: 'referenceText_4',sort: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Tag', field: 'referenceText_5', filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Doc #', field: 'referenceText_6', filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank FC	', field: 'amount_2', filter: true ,suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: 'Bank FC amount', field: 'referenceText_8',sort: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank NR Payee', field: 'referenceText_9',sort: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true  }
    ];

    this.rowSelection = "multiple";
 
  this.autoGroupColumnDef = {
    headerName: "Group",
    width: 200,
    field: "athlete",
    valueGetter: function(params) {
      if (params.node.group) {
        return params.node.key;
      } else {
        return params.data[params.colDef.field];
      }
    },
    headerCheckboxSelection: true,
    cellRenderer: "agGroupCellRenderer",
    cellRendererParams: { checkbox: true }
  };
  this.defaultColDef = {
    editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true
  };
  this.rowSelection = "multiple";
  this.rowGroupPanelShow = "always";
  this.pivotPanelShow = "always";
  }
  // public columnDefs:any;
public listbank:any;
public getTotalAmountOfBank:number=0;
public getTotalAmount:number=0;
bankDeSelectAll:boolean=false;
erpDeselectAll:boolean=false;
selectedBankrow=false;
  ngOnInit() {
    this.flag = false;
    this.isEditable=false;
    this.loadwidgets(0);
    // this.search();
    this.erpDeselectAll=false;
    this.erptableservice.RemoveSeletedElement();
    this.bankservice.RemoveSeletedElement();

    this.SelectedOrderData=[];
    this.SelectedBankData=[];
   
  }
  onGridReadyOrder(params) {
    this.OrdergridApi = params.api;
    this.OrdergridColumnApi = params.columnApi;
    this.OrdergridApi.updateRowData(this.SelectedOrderData);
    this.OrdergridApi.setRowData(this.SelectedOrderData);
    this.OrdergridApi.refreshCells(params);
  
  
    
  }
  onGridReadyBank(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.refreshCells(params);
    this.gridApi.updateRowData(this.SelectedBankData);
    // this.gridOptions = <GridOptions>
    // this.gridApi.setRowData(this.rowData);
  
  
    
  }

 gettotal()
 {this.getTotalAmount=0;
  // this.OrdergridApi.getr
  this.OrdergridApi.forEachNode(node =>{
    // rowData.push(node.data)
    console.log("gertting total",node)
    this.getTotalAmount=this.getTotalAmount + parseFloat(node.data.amount_1)
  } );
  // return rowData;
  //  if(this.SelectedOrderData.length === 0)
  //  {
  //   this.getTotalAmount=0;
  //   // this.isEditable=false;

  //  }
  // for (let index = 0; index < this.SelectedOrderData.length; index++) {
  //   console.log("cjeck",this.SelectedOrderData.length)
  
  //   this.getTotalAmount= this.getTotalAmount+ parseFloat(this.SelectedOrderData[index].amount_1)
  // }
  return  this.getTotalAmount;
 }
  ngOnChanges()
{
  // this.rowData=this.SelectedOrderData;
  // for (let index = 0; index < this.SelectedOrderData.length; index++) {
        
  //   this.getTotalAmount= this.getTotalAmount+ this.SelectedOrderData[index].amount_1
  // }
}
public listOrders;
  loadwidgets(val)
  {
    this.listOfGridValue=[];
    
      this.loadwigetsdata= JSON.parse(localStorage.getItem('WIDGETS'));
      console.log('this.loadwigetsdata',this.loadwigetsdata,val)
      // for (let i = 0; i < this.loadwigetsdata.length; i++) {
        
      //   this.gettingGridValue(val);
      // }

     
    this.recoservice.ListBankName()
    .subscribe(res => {
      this.listbank=res;
      
      
    })
    this.recoservice.ListTypesofOrder()
    .subscribe(res => {
      console.log("listOrders",res)
      this.listOrders=res;
      
      
    })


  }


  carouselOptions = {
    margin: 25,
    dots: false,
    nav: true,
    navigation: true,
    navigationText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 2,
        nav: true,
        loop: false
      },
      1500: {
        items: 2,
        nav: true,
        loop: false
      }
    }
  }
  showtable() {
    this.flag = true;
  }
  hidetable() {
    this.flag = false;
  }
/* Start -Fetching data for gird to display */
  gettingGridValue(val)
  {
    this.recoservice.gettingERP(val)
      .subscribe(res => {
        this.listOfGridValue.push(res);
      })
  }
/* End -Fetching data for gird to display */

  /*Start - filter options onChange*/
  onChange(e)
  {
    while( this.SelectedOrderData.length > 0) {
      this.SelectedOrderData.pop();
  }
  while( this.SelectedBankData.length > 0) {
    this.SelectedBankData.pop();
}
    // this.isEditable=false;
    console.log("event trigger",e);
    // this.hidetable() 
    // this.loadwidgets(e)
    this.search();
  }
  /*End - filter options onChange*/


/* Alert popup*/
  openDialog(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: 'auto',
      data: {
        title: this.title,
        description: this.description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  // array of all items to be paged
 private allItems: any[];
 Arr = Array; //Array type captured in a variable
  num:number = 20;
 public totalpage;

 // pager object
 pager: any = {};

 // paged items
 pagedItems: any[];
public findtext:string;
public columnname:string;
public offsets=0;
public limit=25;
public relationId: number;
public OrderrowData;
public BankrowData;
public BankName;
public TypeOforder;
  search()
{
  console.log("findtext",this.findtext,this.listbank)
  let obj={
    offset:false,
    limit:false,
    findtext:this.findtext?this.findtext:false,
    columnname:this.columnname?this.columnname:false,
    relationId:this.BankName?this.BankName:false,
    classification_1:this.TypeOforder?this.TypeOforder:false
  }
this.recoservice.ERPTotalCount(obj).subscribe(res=>{this.totalpage=res;console.log("totalpage",this.totalpage)})
this.recoservice.ERP(obj)
.subscribe(data => {
  // this.rowData = data;
  this.OrderrowData=data;
});
this.recoservice.BANK(obj)
    .subscribe(data => {
      // this.rowData = data;
      this.BankrowData=data;
    });
}
public listtable;
isCancel:boolean;
isClosed:boolean;
isMatch:boolean;
isRollover:boolean;
isUnMatch:boolean;
selectedWidgets(item)
{
 this.isEditable=false;
 this.SelectedOrderData=[];
 this.SelectedBankData=[];
 this.listtable=item.widgetActionDetails.Table;
 this.isCancel=item.widgetActionDetails.isCancel;
 this.isClosed=item.widgetActionDetails.isClosed;
 this.isMatch=item.widgetActionDetails.isMatch;
 this.isRollover=item.widgetActionDetails.isRollover;
 this.isUnMatch=item.widgetActionDetails.isUnMatch;
 
  console.log("items",item);
  console.log("listtable",this.listtable)
}
reset()
{
  // this.ngOnInit();
  location.reload();
  // this.isEditable=false;
  // var params = { force: true };
  //   this.gridApi.refreshCells(params);
  //   this.OrdergridApi.refreshCells(params);
}

match(bank,cont,rel)
{
  this.recoservice.MatchingRecord(bank,cont,rel)
  .subscribe(value=>{

    console.log("res",value)
      alert("Matched successFully");
      this.isEditable=false;
      this.ngOnInit()
    
  })
  // const dialogRef1 = this.dialog.open(AlertComponent, {
  //   width: 'auto',
  //   data: {
  //     title: "Alert",
  //     description:"Data Submitted Successfully"
  //   }
  // });

  // dialogRef1.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  // this.reset();
  //   // this.animal = result;
  // }); 
}
CancelRecord()
{
  const dialogRef = this.dialog.open(ConfirmationpopupComponent, {
    width: 'auto',
    data: {
      title: "Confiramtion ",
      description:"Are you sure want to Cancel record?"
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    // this.animal = result;
    if(result)
    {
      this.recoservice.CancelRecord(this.SelectedOrderData)
      .subscribe(res=>{
        // alert("Record is Cancelled ")
        // this.reset();
        this.ngOnInit();
      })
    }
  });
 
}
CloseRecord()
{
  const dialogRef = this.dialog.open(ConfirmationpopupComponent, {
    width: 'auto',
    data: {
      title: "Confiramtion ",
      description:"Are you sure want to Closed record?"
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    // this.animal = result;
    if(result)
    {
      this.recoservice.ClosedRecord(this.SelectedOrderData)
      .subscribe(res=>{
        // alert("Record is Cancelled ")
        // this.reset();
        this.ngOnInit();
      })
    }
  });
 
}
rollover() {
  console.log("rollover popup working",this.SelectedOrderData)  ;
  const dialogRef = this.dialog.open(RolloverpopupComponent, {
    width: 'auto',
    data: {
      intRecordsId:this.SelectedOrderData[0].intRecordsId
    // rowdata:e.rowData,
    // columnDefs:this.columnDefs
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.ngOnInit();
    // this.animal = result;
  });
}
Ordergettingrows(e, tablename) {
  this.isEditable = true;
  console.log("SelectedOrderData", e.data)
  while( this.SelectedOrderData.length > 0) {
    this.SelectedOrderData.pop();
}
  if (tablename === "FC" || tablename === "ForwardContract") {
    if (e.node.selected == true) {
      // this.SelectedOrderData=[];
     
    // this.SelectedOrderData.push(e.data)
    if(e.data.processingStatus == "Matched")
    {
      this.FetchByRule('#EM1',e)

    }
    else{
     this.FetchByRule('#ER1',e)

    }
    // this.gettotal()
      
    } else {
      
      this.getTotalAmountOfBank=0;
      this.bankservice.RemoveSeletedElement();
    //   while( this.SelectedOrderData.length > 0) {
    //     this.SelectedOrderData.pop();
    // }
    this.SelectedBankData=[];
    // this.getTotalAmountOfBank=0;
      // //this.gettotal();
      let res = this.OrdergridApi.updateRowData({
        remove: [e.data]
      });
      
      
      this.printResult(res);
    }
    console.log("cjeck",this.SelectedOrderData)
   
    // this.getTotalAmount=0;

  
  } else if (tablename === "BANK") {
    if (e.node.selected == true) {
      this.SelectedBankData.push(e.data)
      let res = this.gridApi.updateRowData({
        add: [e.data]
      });
      this.printResult(res);
    } else {
      let res = this.gridApi.updateRowData({
        remove: [e.data]
      });
      this.printResult(res);
    }
    console.log("Bcjeck",this.SelectedOrderData)
    // this.getTotalAmountban0;

  
 
  }
 

// let res=this.gridApi.updateRowData({ add: [this.SelectedOrderData] })
// this.printResult(res);
// this.SelectedOrderData=this.SelectedOrderData;
// this.rowData=this.SelectedOrderData;
//this.gettotal();
// this.gridApi.setRowData(this.SelectedOrderData);

}
Bankgettingrows(e)
{
this.isEditable=true;
let checkingFlag=false;
console.log("SelectedBankData",e.node.selected)
//checking

if(e.node.selected == true)
{
  this.SelectedBankData.push(e.data)
    let obj={
      node:{
        selected:true
      },data:e.data
    }
    this.bankservice.AddasSelectedElement(obj);
    let res=this.gridApi.updateRowData({ add: [e.data] });
    this.printResult(res);
  

}
else{
  let res=this.gridApi.updateRowData({ remove: [e.data] });
  for( var i = 0; i <=  this.SelectedBankData.length; i++){ 
    if (  this.SelectedBankData[i].extRecordsId === e.data.extRecordsId) {
      this.SelectedBankData.splice(i, 1); 
    }
 }
  this.printResult(res);
}
this.getTotalAmountOfBank=0;
for (let index = 0; index < this.SelectedBankData.length; index++) {
  console.log("Bcjeck",this.SelectedBankData.length)

  this.getTotalAmountOfBank= this.getTotalAmountOfBank+ parseFloat(this.SelectedBankData[index].amount_1)
}


// let res=this.gridApi.updateRowData({ add: [this.SelectedOrderData] })
// this.printResult(res);
// this.SelectedOrderData=this.SelectedOrderData;
// this.rowData=this.SelectedOrderData;
// this.gridApi.setRowData(this.SelectedOrderData);

}
printResult(res) {
console.log("---------------------------------------");
if (res.add) {
  res.add.forEach(function(rowNode) {
    console.log("Added Row Node", rowNode);
    // this.getTotalAmount= this.getTotalAmount+ rowNode.data.amount_1
  });
}
if (res.remove) {
  res.remove.forEach(function(rowNode) {
    console.log("Removed Row Node", rowNode);
  });
}
if (res.update) {
  res.update.forEach(function(rowNode) {
    console.log("Updated Row Node", rowNode);
  });
}

}

/*Rule to Select record in chlid Grid*/
ERPVAlue=0;
FetchByRule(value,e)
{
  switch (value) {
    case '#EM1':
        // this.SelectedOrderData.push(e.data)

    
       // this.agGrid.api.selectAll(); 

       this.recoservice.FindRecordByGroupId(e.data.groupId).subscribe(value => {
         console.log("derviedcol_2 data", value)
         let obj: any = value;
         let bankData:any = obj.Bank;
         let ERPData:any = obj.ERP;

         this.bankDeSelectAll=true;
         this.ERPVAlue=0
         // this.SelectedBankData=[];

        // this.gettotal()
        // this.SelectedBankData = arr;
        
          for(let k=0;k<ERPData.length;k++){
            let obj={
              node:{
                selected:true
              },data:ERPData[k]
            }
            // this.selectedBankrow=arr[k];
            this.ERPVAlue=ERPData[k].amount_1;

            this.erptableservice.AddasSelectedElement(obj);
            // this.notifyParent.emit(obj);
            // this.Bankgettingrows(obj)
            let res1 = this.OrdergridApi.updateRowData({
              add: [e.data]
            });
            this.printResult(res1);
          }
        
       
         for(let k=0;k<bankData.length;k++){
           let obj={
             node:{
               selected:true
             },data:bankData[k]
           }
           // this.selectedBankrow=arr[k];
           this.bankservice.AddasSelectedElement(obj);
           // this.notifyParent.emit(obj);
          //  this.Bankgettingrows(obj)
         }
        
       })
         
       this.getTotalAmount=0;
      for (let index = 0; index < this.SelectedOrderData.length; index++) {
        console.log("Bcjeck",this.SelectedOrderData.length)
      
        this.getTotalAmount= this.getTotalAmount+ parseFloat(this.SelectedOrderData[index].amount_1)
      }
      break;
      case '#ER1':
        this.SelectedOrderData.push(e.data)
        this.ERPVAlue=e.data.amount_1;

        // this.gettotal()

    
       // this.agGrid.api.selectAll(); 

       this.recoservice.FindRecordByReferance(e.data.derivedCol_2).subscribe(value => {
         console.log("derviedcol_2 data", value)
         let arr: any = [];
         arr = value;
         this.bankDeSelectAll=true;
         // this.SelectedBankData=[];

         // this.SelectedBankData = arr;
         for(let k=0;k<arr.length;k++){
           let obj={
             node:{
               selected:true
             },data:arr[k]
           }
           // this.selectedBankrow=arr[k];
           this.bankservice.AddasSelectedElement(obj);
           // this.notifyParent.emit(obj);
          //  this.Bankgettingrows(obj)
         }
        
       })
         
       let res = this.OrdergridApi.updateRowData({
         add: [e.data]
       });
       this.printResult(res);
       this.getTotalAmount=0;
       for (let index = 0; index < this.SelectedOrderData.length; index++) {
         console.log("Bcjeck",this.SelectedOrderData.length)
       
         this.getTotalAmount= this.getTotalAmount+ parseFloat(this.SelectedOrderData[index].amount_1)
       }
        break;
        
        case 'BM1':
          this.recoservice.FindRecordByGroupId(e.data.groupId).subscribe(value => {
            console.log("derviedcol_2 data", value)
            let obj: any = value;
            let bankData:any = obj.Bank;
            let ERPData:any = obj.ERP;
   
            this.bankDeSelectAll=true;
            this.ERPVAlue=0
            this.SelectedBankData=[];
            this,this.SelectedOrderData=[];
           // this.gettotal()
           // this.SelectedBankData = arr;
           
             for(let k=0;k<ERPData.length;k++){
               let obj={
                 node:{
                   selected:true
                 },data:ERPData[k]
               }
               // this.selectedBankrow=arr[k];
               this.ERPVAlue=ERPData[k].amount_1;
   
               this.erptableservice.AddasSelectedElement(obj);
               // this.notifyParent.emit(obj);
               // this.Bankgettingrows(obj)
               let res1 = this.OrdergridApi.updateRowData({
                 add: [e.data]
               });
               this.printResult(res1);
             }
           
          
            for(let k=0;k<bankData.length;k++){
              let obj={
                node:{
                  selected:true
                },data:bankData[k]
              }
              // this.selectedBankrow=arr[k];
              this.bankservice.AddasSelectedElement(obj);
              // this.notifyParent.emit(obj);
             //  this.Bankgettingrows(obj)
            }
           
          })
            
          this.getTotalAmount=0;
          break;
         
  
    default:
      break;
  }
}
}
