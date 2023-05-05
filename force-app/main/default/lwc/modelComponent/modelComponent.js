import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';
import Phone from '@salesforce/schema/Contact.Phone';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import AccountId from '@salesforce/schema/Contact.AccountId';
export default class ModelComponent extends LightningModal {

@api accId = this.accId;

FirstName;
LastName;
Phone;
Email;
record;
    
    handleFirstName(event) {
        this.FirstName = event.detail.value;
    }

handleLastName(event) {
 this.LastName = event.detail.value;
 }

handleEmail(event) {
    this.Email = event.detail.value;
}

handlePhone(event) {
    this.Phone = event.detail.value;
}
    handleCreateContact1() {
        const fields = {};
        fields[FirstName.fieldApiName] = this.FirstName;
        fields[LastName.fieldApiName] = this.LastName;
        fields[Email.fieldApiName] = this.Email;
        fields[Phone.fieldApiName]=this.Phone;
        fields[AccountId.fieldApiName]= this.accId;

        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(contactobj=> {
                this.contactId = contactobj.id;
                console.log('ABC!');
                const event = new ShowToastEvent({
                    title: 'Success!',
                    message: 'Related Record is Created!',
                    variant: 'Success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(event);
                this.close();
            })
            .catch(error => {
                const evt = new ShowToastEvent({
                    title: 'Toast Error',
                    message: 'Related Record is not Created',
                    variant: 'error',
                    mode: 'dismissable'
                });
                console.log(error);
                this.dispatchEvent(evt);
                this.close();
            });
            
            this.close();
            
    }
    // handleCreateContact(){
    //     console.log('before Create Account')
       
       
    //    createCon({ FName :this.FirstName,
    //         LName :this.LastName,
    //         email :this.Email,
    //         phone :this.Phone,
    //         accountId :this.accId})
    //     .then(result => {
    //       this.record = result;
         
    //           console.log('Contact Id ====>',result)

    //           this.myList = this.record;
    //           this.error = undefined;
             
          
    //     })
    //     .catch(error => {
    //       this.error = error;
    //       this.record = undefined;
    //       console.log('error1')
  
    // });
    
     
    // const event = new ShowToastEvent({
    //     title: 'Related Contact is created!!!',
    //     message:'',
    //     variant:'Success'
    // });
    // this.dispatchEvent(event);
    // this.close();
   
    //     console.log('after Create Account')
    //    // this.close();
    // }
   
    handleClose(){
        console.log('cancel called')
     this.close();
     }

     
}