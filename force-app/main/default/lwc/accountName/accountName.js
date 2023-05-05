import { LightningElement,wire } from 'lwc';
import AccountNames from '@salesforce/apex/getAccountName.getName';
import ContactDetail from '@salesforce/apex/ContactController.getContact';
import ModelComponent from 'c/modelComponent';

const columns = [
  { label: 'Id', fieldName: 'Id' },
  { label: 'Name', fieldName: 'Name' },
  { label: 'Email', fieldName: 'Email' },
  { label: 'Account Id', fieldName: 'AccountId' }
 
];

export default class AccountName extends LightningElement {

    names=[];
    value;
    columns=columns;
    accRecords=[];
    accData;
    flag=false;

    @wire(AccountNames)
    accountData({error,data})
    {
     if (data) {
          console.log('data-->',JSON.stringify(data));

        //  this.accData=data;
          for(let i=0; i<data.length; i++) {
             console.log('id= ABC' + data[i].Id);
             this.names = [...this.names ,{value: data[i].Id , label: data[i].Name}];                                   
         }
 
                 console.log(this.names);
      } 
     else if (error) {
         this.error = error;
        // this.record = undefined;
     }
   }
   
   @wire(ContactDetail)
   getContact({error,data}){
     
   
     if(data){
       console.log('ContactDetail-->',JSON.stringify(data));
         this.accData = data;
     }
   }


   handleChange(event)
  {
    this.value=event.detail.value;
    console.log('value-->',this.value);
  }

  handleRelatedContact()
  {
    console.log('ABC',this.value)
    ModelComponent.open({ accId: this.value })
  }

  handleDisplay(){
    this.flag=true;
  }
}