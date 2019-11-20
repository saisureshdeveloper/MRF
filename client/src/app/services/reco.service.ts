import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RecoService {

 
  public httpOptions : any;
  
  baseUrl = environment.baseUrl;

  constructor(private _http : HttpClient) {
    //Http Headers Options
  
    this.httpOptions = {
      headers: new HttpHeaders (
        { 'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'bareer '+localStorage.getItem('TOKEN'),
          'id': localStorage.getItem('Id'),
          'username': localStorage.getItem('UserName'),
      })
    }
  }

  gettingERP(data)
  {
    let obj={
      relationshipId:data
    };
    // return this._http.put('http://localhost:3000/api/web/signin',data)
  
    return this._http.put<any>(this.baseUrl+'getWidgetsData', obj,this.httpOptions)
    .pipe(map(res => {
      let  items:any=res;
      let label=[]
      let data=[];
      for (let item of items) {
        // console.log(item); // 9,2,5moment().format("MMM Do YY");
        label.push(moment(item.referenceDateTime_1).format("MMM Do YY"));
        data.push(item.DateCount);
       }
       let obj={
         label:label,
         data:data
       }
        return obj;
    }));
  }

  ERP(obj)
  {
    // let obj={
    //   offset:offset,
    //   limit:limit
    // };
    // return this._http.put('http://localhost:3000/api/web/signin',data)
  
    return this._http.post<any>(this.baseUrl+"ERP", obj,this.httpOptions)
    .pipe(map(res => {
      
        return res;
    }));
  }
  BANK(obj)
  {
    // let obj={
    //   offset:offset,
    //   limit:limit
    // };
    // return this._http.put('http://localhost:3000/api/web/signin',data)
  
    return this._http.post<any>(this.baseUrl+"bank", obj,this.httpOptions)
    .pipe(map(res => {
      
        return res;
    }));
  }
  ERPTotalCount(obj:any)
  {
    // 
    return this._http.post<any>(this.baseUrl+"Erpvolume",obj,this.httpOptions)
    .pipe(map(res => {
      let temp:any=res;
      let pager= Math.round(temp.COUNT/25)
      
        return temp.COUNT;
    }));

  }
  gettingQueryValues(query)
{
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    userId:currentUser.userId,
    moduleId:currentUser.moduleId,
    query:query
  }

  return this._http.put<any>(this.baseUrl+'query', obj,this.httpOptions) 
}
getTableValueByQuery(query)
{
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    userId:currentUser.userId,
    moduleId:currentUser.moduleId,
    query:query
  }

  return this._http.post<any>(this.baseUrl+'getTableValueByQuery', obj,this.httpOptions) 
}
getBankTableValueByQuery(query)
{
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    userId:currentUser.userId,
    moduleId:currentUser.moduleId,
    query:query
  }

  return this._http.post<any>(this.baseUrl+'getBankTableValueByQuery', obj,this.httpOptions) 
}
AddContract(data,form)
{
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    userId:currentUser.userId,
    moduleId:currentUser.moduleId,
    parent:data,
    formData:form

  }

  return this._http.post<any>(this.baseUrl+'AddContract', obj,this.httpOptions) 
}

DeletedContract(parent,data)
{
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    userId:currentUser.userId,
    moduleId:currentUser.moduleId,
    parent:parent,
    contractId:data

  }

  return this._http.post<any>(this.baseUrl+'DeletedContract', obj,this.httpOptions) 
}
AddReferanceNumber(id,data)
{
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    userId:currentUser.userId,
    moduleId:currentUser.moduleId,
    intRecordsId:id,
    text:data

  }

  return this._http.post<any>(this.baseUrl+'AddReferanceNumber', obj,this.httpOptions) 
}
FindRecordByReferance(ref)
{
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    userId:currentUser.userId,
    moduleId:currentUser.moduleId,
    ref:ref
  }

  return this._http.post<any>(this.baseUrl+'FindRecordByReferance', obj,this.httpOptions) 
}
ClosedRecord(ref)
{
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    userId:currentUser.userId,
    moduleId:currentUser.moduleId,
    intRecordId:ref[0].intRecordsId
  }

  return this._http.post<any>(this.baseUrl+'ClosedRecord', obj,this.httpOptions) 
}
CancelRecord(ref)
{
  console.log("CancelRecord",ref[0].intRecordsId)
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    userId:currentUser.userId,
    moduleId:currentUser.moduleId,
    intRecordId:ref[0].intRecordsId
  }

  return this._http.post<any>(this.baseUrl+'CancelRecord', obj,this.httpOptions) 
}
RollOverRecord(id,key)
{ 
let currentUser:any = localStorage.getItem('currentUser');

let obj ={
  userId:currentUser.userId,
  moduleId:currentUser.moduleId,
  intRecordsId:id,
  targetnumber:key
}

return this._http.post<any>(this.baseUrl+'RollOverRecord', obj,this.httpOptions) 

}
FindRecordByGroupId(id)
{ 
let currentUser:any = localStorage.getItem('currentUser');

let obj ={
  userId:currentUser.userId,
  moduleId:currentUser.moduleId,
  groupId:id
}

return this._http.post<any>(this.baseUrl+'FindRecordByGroupId', obj,this.httpOptions) 

}
findingContractValueByderviedCol(intrecid)
{
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    userId:currentUser.userId,
    moduleId:currentUser.moduleId,
    intrecid:intrecid
  }

  return this._http.post<any>(this.baseUrl+'findingContractValueByderviedCol', obj,this.httpOptions) 
}
getRecordByGroupID(ref)
{
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    userId:currentUser.userId,
    moduleId:currentUser.moduleId,
    groupId:ref
  }

  return this._http.post<any>(this.baseUrl+'getRecordByGroupID', obj,this.httpOptions) 
}
MatchingRecord(bank,cont,relationID)
{
  let currentUser:any = localStorage.getItem('currentUser');
  
  let obj ={
    user:currentUser,
    moduleId:currentUser.moduleId,
    bank:bank,
    contract:cont,
    relationID:relationID
  }

  return this._http.post<any>(this.baseUrl+'MatchingRecord', obj,this.httpOptions) 
}
  ListBankName()
  {
    
    return this._http.get<any>(this.baseUrl+'listrelationship',this.httpOptions)
    .pipe(map(res => {
      
        return res;
    }));


  }
  ListTypesofOrder()
  {
    return this._http.get<any>(this.baseUrl+'listtypesofOrder',this.httpOptions)
    .pipe(map(res => {
      
        return res;
    }));

  }

  upload(formData,bank,type)
  {
      // let obj={
      //   bankid:bank,
      //   CatgeroyType:type,
      //   formData:formData
      // }
    return this._http.post<any>(this.baseUrl+'upload',formData,this.httpOptions)
    .pipe(map(res => {
     
        return res;
    }));
    // this.http
    // .post(this.baseUrl, formData)=> res.json()) 
  }
  listsummary()
  {
    return this._http.get<any>(this.baseUrl+'uploadsummary',this.httpOptions)
    .pipe(map(res => {
     
        return res;
    }));
  }

}
