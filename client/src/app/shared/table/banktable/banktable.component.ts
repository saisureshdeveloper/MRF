import { Component, OnInit, Input, Output,EventEmitter, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { RecoService } from 'src/app/services/reco.service';
import { AgGridAngular } from 'ag-grid-angular';
import { BankService } from './bank.service';

@Component({
  selector: 'app-banktable',
  templateUrl: './banktable.component.html',
  styleUrls: ['./banktable.component.css']
})
export class BanktableComponent implements OnInit {
  @Input() public relationshipID: number;
  @Input() public query:any;
  @Input() public rowData:any;
  @Input() public deselectAllrowData:any;
  @Input() public selectedBankrow:any;


  @Output() selectedRows= new EventEmitter<string>();
  @ViewChild('bankagGrid') bankagGrid: AgGridAngular;
  public gridApi;
  public gridColumnApi;
  
  public columnDefs;
  public autoGroupColumnDef;
  public defaultColDef;
  public rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;
  // public isEditable:boo
  // public rowData:any= [];
  constructor(public http: HttpClient,public reco:RecoService,public bankservice:BankService) { 
    
    this.columnDefs =  [
      {headerName: 'Bank Date',sort: true, field: 'referenceDateTime_1',
      cellRenderer: (data) => {
        return moment(data.value).format('DD/MM/YYYY')
    },
       filter: "agDateColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true ,
      pinned: 'left',
      
      checkboxSelection: function(params) {
        const displayedColumns = params.columnApi.getAllDisplayedColumns();
        return displayedColumns[0] === params.column;
    }, 
    },

      {headerName: 'Bank Description', field: 'referenceText_1',  filter: "agTextColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Debit', field: 'debitAmount',  filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: 'Bank Credit', field: 'creditAmount', filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Branch Code', field: 'referenceText_3',  filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Value Date	', field: 'referenceDateTime_2', 
      cellRenderer: (data) => {
        return moment(data.value).format('DD/MM/YYYY')
    },
       filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Balance', field: 'amount_1',  filter: true ,suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: 'Bank Bank Stmt ID', field: 'referenceText_4', filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Tag', field: 'referenceText_5',  filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank Doc #', field: 'referenceText_6',  filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank FC	', field: 'amount_2',  filter: true ,suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: 'Bank FC amount', field: 'referenceText_8', filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Bank NR Payee', field: 'referenceText_9', filter: true ,suppressSizeToFit: true,suppressAutoSize: true  }
    ];
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

  ngOnInit() {
    this.bankservice.change.subscribe(obj => {
       //console.log("selectedobj",obj)
      this.gridApi.forEachNode(function(node) {
        //  //console.log("check",node.data.extRecordsId , obj.data.extRecordsId,node.data.extRecordsId === obj.data.extRecordsId)
    
          if (node.data.extRecordsId === obj.data.extRecordsId) {
             //console.log("  node.setSelected(true);")
            node.setSelected(true);
          }
        })
    });

    this.bankservice.remove.subscribe(res=>{
      this.gridApi.forEachNode(function(node) {
       
             //console.log("  node.setSelected(false);")
            node.setSelected(false);
          
        })
    })
    var params = { force: this.isForceRefreshSelected() }
      this.gridApi.refreshCells(params)
  }

  ngOnChanges()
{
   //console.log("sample",this.columnDefs)
   //console.log(this.query)
  // this.gridApi.setRowData(this.rowData);
 
  if(this.query)
      {
        if(!this.relationshipID)
        {
          this.reco.getBankTableValueByQuery(this.query)
          .subscribe(res=>{
            this.rowData=res;
            this.gridApi.setRowData(res);
  
          
          })
        }
        else{
         
            let text=this.query+" and jobId="+this.relationshipID;
            this.reco.getBankTableValueByQuery(text)
            .subscribe(res=>{
              this.rowData=res;
              this.gridApi.setRowData(res);
    
            
            })
          
         
        
        }
        if(this.deselectAllrowData)
  {
    this.bankagGrid.api.deselectAll();
  }
  if(true)
  {
    // this.selectrow,true,true
    // this.bankagGrid.api.deselectAll();
    this.gridApi.forEachNode(function(node) {
     //console.log("node.data.extRecordsId === this.selectedBankrow.extRecordsId",node.data.extRecordsId === this.selectedBankrow.extRecordsId)

      if (node.data.extRecordsId === this.selectedBankrow.extRecordsId) {
        node.setSelected(true);
      }
    })
  //  this.gridApi.forEachNode(node =>
  //     {
  //       if(node.data.extRecordsId === this.selectedBankrow.extRecordsId )
  //       {
  //        //console.log("node",node,this.selectedBankrow.extRecordsId)
  //         // this.bankagGrid.api.selec
  //         // this.bankagGrid.api.selectNode(node,true,true)
  //         node.setSelected(true)
  //         // node.setSelected(node.data.selected)
  //         // node.setSelected(true);
  //       }
  //     }
  //     ); 
      // this.gridApi.refreshRows()
      var params = { force: this.isForceRefreshSelected() }
      this.gridApi.refreshCells(params)
    // this.bankagGrid.api.selectNode()
  } 
      }
}
isForceRefreshSelected() {
  return document.querySelector("#bankagGrid");
}
getNotification(evt) {
  // Do something with the notification (evt) sent by the child!
  this.gridApi.forEachNode(function(node) {
     //console.log("node.data.extRecordsId === this.selectedBankrow.extRecordsId",node.data.extRecordsId === this.selectedBankrow.extRecordsId)

      if (node.data.extRecordsId === evt.extRecordsId) {
        node.setSelected(true);
      }
    })
}
bankremoveSelectedRec()
{
  this.gridApi.forEachNode(function(node) {
   
 //console.log("deselect record")
   
        node.setSelected(false);
      
    })
}

onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;

  
}
onRowClicked(event: any) { 
   //console.log('row', event);

  // this.passvaly();
}
rowSelected(e:any)
{
   //console.log('row', e);
  this.selectedRows.emit(e);

}
}
