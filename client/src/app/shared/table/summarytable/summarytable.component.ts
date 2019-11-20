import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { RecoService } from 'src/app/services/reco.service';
@Component({
  selector: 'app-summarytable',
  templateUrl: './summarytable.component.html',
  styleUrls: ['./summarytable.component.css']
})
export class SummarytableComponent implements OnInit {

  @Input() public relationId: number;
  @Input() public rowData:any;
  @Output() selectedRows= new EventEmitter<string>();
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
  constructor(public http: HttpClient,public service:RecoService) { 
    this.rowSelection = "multiple";
    this.columnDefs =  [
      {headerName: 'ID', field: 'importId',  filter: "agTextColumnFilter" , width: 90,
      minWidth: 60,
      maxWidth: 100 },
       {headerName: 'File Name', field: 'fileName',  filter: "agTextColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Relationship Name', field: 'relationshipName',  filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: 'Bank Name', field: 'bankName', filter: "agNumberColumnFilter" ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'File Type', field: 'fileType',  filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Upload Date', field: 'lastUpdatedDt', sort: true,
      cellRenderer: (data) => {
        return moment(data.value).format('DD/MM/YYYY')
    },
       filter: true ,suppressSizeToFit: true,suppressAutoSize: true  },
      {headerName: 'Size (Bytes)', field: 'fileSizeBytes',  filter: true ,suppressSizeToFit: true,suppressAutoSize: true },
      {headerName: 'Status', field: 'status',  filter: true ,suppressSizeToFit: true,suppressAutoSize: true },

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
    this.reload();
  }

  reload()
  {
    this.service.listsummary()
    .subscribe(res=>{
      this.rowData=res;
    })
  }

onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  // var allColumnIds = [];
  // this.gridColumnApi.getAllColumns().forEach(function(column) {
  //   allColumnIds.push(column.colId);
  // });
  // this.gridColumnApi.autoSizeColumns(allColumnIds);
  this.gridApi.sizeColumnsToFit();

  
}
onRowClicked(event: any) { 
  console.log('row', event);

  // this.passvaly();
}
rowSelected(e:any)
{
  console.log('row', e);
  this.selectedRows.emit(e);

}

}
