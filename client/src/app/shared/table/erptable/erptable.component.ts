import { Component, OnInit,OnChanges, Input, Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { RecoService } from 'src/app/services/reco.service';
import { ButtonRendererComponent } from '../../renderer/editbutton.component';
// import { AlertComponent } from '../shared/popup/alert/alert.component';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../popup/alert/alert.component';
import { EditTableComponent } from '../../popup/edit-table/edit-table.component';
import { ERPTabelService } from './erp.service';
// import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-erptable',
  templateUrl: './erptable.component.html',
  styleUrls: ['./erptable.component.css']
})
export class ERPtableComponent implements OnInit {
  @Input() public relationshipID: number;
  @Input() public query:any;
  @Input() public classification1:any;
  @Input() public tablename:any;
  
  @Output() selectedRows= new EventEmitter<string>();
 
public gridApi:any;
public gridColumnApi;

public columnDefs=[];
public autoGroupColumnDef;
public defaultColDef;
public rowSelection;
public rowGroupPanelShow;
public pivotPanelShow;
name;
frameworkComponents:any;
// rowSelection: 'multiple',
// suppressRowClickSelection: true
  public currentUser:any=JSON.parse(localStorage.getItem('currentUser'));
   
public gettingERPColumn=this.currentUser.data.Roles.Modules.ERPTable;
constructor(public http: HttpClient,private reco:RecoService,public dialog: MatDialog,public erptableservice:ERPTabelService) {
  this.frameworkComponents = {
    buttonRenderer: ButtonRendererComponent,
  }
  console.log("tablename",this.tablename)
  console.log("gettingERPColumn",this.gettingERPColumn,this.currentUser.data.Roles)
  // for(let i=0;i<this.gettingERPColumn.length;i++)
  // {
  //   if (this.gettingERPColumn[i].columnActionDetails.type == "text" || this.gettingERPColumn[i].columnActionDetails.type == "number" ) {
  //     if(this.gettingERPColumn[i].columnActionDetails.pinned != "None")
  //     { 
  //       if(this.gettingERPColumn[i].columnActionDetails.pinned == 'left')
  //       {
  //         this.columnDefs.push( 
          
  //           {headerName:this.gettingERPColumn[i].sourceIntColName, field: this.gettingERPColumn[i].targetTableColName, resizable: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true, pinned: 'left',
  //             checkboxSelection: function(params) {
  //               const displayedColumns = params.columnApi.getAllDisplayedColumns();
  //               return displayedColumns[0] === params.column;
  //           }}
  //           )

  //       }
  //       else if(this.gettingERPColumn[i].columnActionDetails.pinned == 'right' )
  //       {
  //         this.columnDefs.push(

  //           {headerName:this.gettingERPColumn[i].sourceIntColName, field: this.gettingERPColumn[i].targetTableColName, width: 90, pinned: 'right',
  //         cellRenderer: 'buttonRenderer',
  //         cellRendererParams: {
  //           onClick: this.ageClicked.bind(this),
  //           label: 'Edit'
  //         }}
  //          )
  //       }

  //     }
  //     else{
  //    this.columnDefs.push( {headerName:this.gettingERPColumn[i].sourceIntColName, field: this.gettingERPColumn[i].targetTableColName, resizable: true, filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true }) 
  //     }
  //   }
  //   else if( this.gettingERPColumn[i].columnActionDetails.type == "date" )
  //   {
  //     this.columnDefs.push( 
  //       {headerName:this.gettingERPColumn[i].sourceIntColName, field: this.gettingERPColumn[i].targetTableColName,  resizable: true, 
  //       cellRenderer: (data) => {
  //         return moment(data.value).format('DD/MM/YYYY')
  //     },
  //     filter: "agDateColumnFilter",suppressSizeToFit: true,suppressAutoSize: true },) 

  //   }
  // }
  this.rowSelection = "single";
 
  this.autoGroupColumnDef = {
    headerName: "Group",
    width: 100,
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
  this.rowSelection = "single";
  this.rowGroupPanelShow = "always";
  this.pivotPanelShow = "always";
}

onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  this.gridApi.setRowData(this.rowData);


  
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
public rowData;
ngOnInit() {
  // this.search()
  console.log("on load",this.query)
  this.erptableservice.change.subscribe(obj => {
    console.log("selectedobj",obj)
    this.gridApi.forEachNode(function(node) {
      console.log("check",node.data.extRecordsId , obj.data.extRecordsId,node.data.extRecordsId === obj.data.extRecordsId)
  
        if (node.data.extRecordsId === obj.data.extRecordsId) {
          console.log("  node.setSelected(true);")
          node.setSelected(true);
        }
      })
  });

  this.erptableservice.remove.subscribe(res=>{
    this.gridApi.forEachNode(function(node) {
     
          console.log("  node.setSelected(false);")
          node.setSelected(false);
        
      })
  })
  var params = { force: this.isForceRefreshSelected() }
    this.gridApi.refreshCells(params)
}
isForceRefreshSelected() {
  return document.querySelector("#bankagGrid");
}
@Input() public deselectAllrowData:any;

ngOnChanges()
{
  console.log("tablename",this.tablename)

  for(let i=0;i<this.gettingERPColumn.length;i++)
  {
    if (this.gettingERPColumn[i].columnActionDetails.type == "text" || this.gettingERPColumn[i].columnActionDetails.type == "number" ) {
      if(this.gettingERPColumn[i].columnActionDetails.pinned != "None")
      { 
        if(this.gettingERPColumn[i].columnActionDetails.pinned == 'left')
        {
          this.columnDefs.push( 
          
            {headerName:this.gettingERPColumn[i].sourceIntColName, field: this.gettingERPColumn[i].targetTableColName, resizable: true, filter: true ,suppressSizeToFit: true,suppressAutoSize: true, pinned: 'left',
              checkboxSelection: function(params) {
                const displayedColumns = params.columnApi.getAllDisplayedColumns();
                return displayedColumns[0] === params.column;
            }}
            )

        }
        else if(this.gettingERPColumn[i].columnActionDetails.pinned == 'right' && this.tablename == "FC" )
        {
          this.columnDefs.push(

            {headerName:this.gettingERPColumn[i].sourceIntColName, field: this.gettingERPColumn[i].targetTableColName, width: 90, pinned: 'right',
          cellRenderer: 'buttonRenderer',
          cellRendererParams: {
            onClick: this.ageClicked.bind(this),
            label: 'Edit'
          }}
           )
        }

      }
      else{
     this.columnDefs.push( {headerName:this.gettingERPColumn[i].sourceIntColName, field: this.gettingERPColumn[i].targetTableColName, resizable: true, filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true }) 
      }
    }
    else if( this.gettingERPColumn[i].columnActionDetails.type == "date" )
    {
      this.columnDefs.push( 
        {headerName:this.gettingERPColumn[i].sourceIntColName, field: this.gettingERPColumn[i].targetTableColName,  resizable: true, 
        cellRenderer: (data) => {
          return moment(data.value).format('DD/MM/YYYY')
      },
      filter: "agDateColumnFilter",suppressSizeToFit: true,suppressAutoSize: true },) 

    }
  }
  console.log("sample",this.columnDefs)
  console.log(this.query)
  // this.gridApi.setRowData(this.rowData);
  if(this.query)
      {
        if(!this.relationshipID)
        {
          this.reco.getTableValueByQuery(this.query.Table_query)
          .subscribe(res=>{
            this.rowData=res;
            // this.gridApi.setRowData(res);
  
          
          })
        }
        else{
          if(!this.classification1)
          {
            let text=this.query.Table_query+" and jobId="+this.relationshipID;
            this.reco.getTableValueByQuery(text)
            .subscribe(res=>{
              this.rowData=res;
              this.gridApi.setRowData(res);
    
            
            })
          }
          else{
            let text=this.query.Table_query+' and jobId='+this.relationshipID+' and classification_1='+ '"'+this.classification1+'"';
            this.reco.getTableValueByQuery(text)
            .subscribe(res=>{
              this.rowData=res;
              this.gridApi.setRowData(res);
    
            
            })
          }
        
        }
        
      }
      this.refresh();
}
refresh()
{
  console.log("ERP Refresh is working")
  this.findtext="";
  this.columnname="";
  var params = { force: this.isForceRefreshSelected() }
  this.gridApi.refreshCells(params)
  // this.search();
}
pagechange(e)
{
  console.log("page change ",e)
  let obj={
    offset:e.pageIndex,
    limit:e.pageSize
  }
  this.reco.ERP(obj)
  .subscribe(data => {
    // this.rowData = data;
    // this.rowData=data;
  });
}
onRowClicked(event: any) { 
  console.log('row', event);

  // this.passvaly();
}
ageCellRendererFunc(params) {
  // this.gridApi.ageClicked = this.ageClicked;
  //return '<button ng-click="ageClicked(data.age)" ng-bind="data.age"></button>';
  return '<button type="button" (click)="ageClicked()" class="btn btn-info">Edit</button>';
}
ageClicked(e) {
  console.log("working",e)  ;
  const dialogRef = this.dialog.open(EditTableComponent, {
    width: 'auto',
    data: {
    rowdata:e.rowData,
    columnDefs:this.columnDefs
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
  });
}

rowSelected(e:any)
{
  console.log('row', e);
  this.selectedRows.emit(e);

}
}
