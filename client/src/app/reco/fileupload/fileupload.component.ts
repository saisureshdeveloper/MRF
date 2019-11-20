import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
//import the file uploader plugin
// import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { RecoService } from 'src/app/services/reco.service';
const URL = 'http://localhost:6001/api/web/upload';
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
BankName;
cattype;
@ViewChild('excel')
myInputVariable: ElementRef;
  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
    //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
    public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'excel'});
    //This is the default title property created by the angular cli. Its responsible for the app works 
    title = 'app works!';
    public listbank;
    public listOrders;
//declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
constructor(private http: HttpClient, private el: ElementRef,private service:RecoService) {

}
    ngOnInit() {
      this.service.ListBankName()
      .subscribe(res => {
        this.listbank=res;
        
        
      })
      this.service.ListTypesofOrder()
      .subscribe(res => {
        console.log("listOrders",res)
        this.listOrders=res;
        
        
      })

      this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
        form.append('bankid', this.BankName); //note comma separating key and value
        form.append('CatgeroyType', this.cattype);
       };
      
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; 
        file.formData={
             bankid:this.BankName,
        CatgeroyType:this.cattype
        }
      };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            this.reload();
        };
    }
    
    //the function which handles the file upload without using a plugin.
    upload() {
    //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#excel');
    //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
        let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
                formData.append('excel', inputEl.files.item(0));
            //call the angular http method
             this.service.upload(formData,this.BankName,this.cattype)
              .subscribe(
                //map the success function and alert the response
                 (success) => {
                         alert(success);
                },
                (error) => alert(error))
          }
       }
       reload()
       {  
        this.myInputVariable.nativeElement.value = "";
        this.BankName="";
        this.cattype="";
       }
}
