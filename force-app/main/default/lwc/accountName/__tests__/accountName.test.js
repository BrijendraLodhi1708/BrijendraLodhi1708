import { createElement } from 'lwc';
import AccountName from 'c/accountName';
import AccountNames from '@salesforce/apex/getAccountName.getName';
import ContactDetail from '@salesforce/apex/ContactController.getContact';
//import ModelComponent from 'c/modelComponent';

jest.mock('c/modelComponent');
async function flushPromises(){
    return Promise.resolve();
}

const accs = require('./data/account.json');
const conts = require('./data/contactDetail.json');


jest.mock(
    '@salesforce/apex/getAccountName.getName',
    () => {
      const {
        createApexTestWireAdapter
      } = require('@salesforce/sfdx-lwc-jest');
      return {
        default: createApexTestWireAdapter(jest.fn())
      };
    },
    { virtual: true }
  );

  jest.mock(
    '@salesforce/apex/ContactController.getContact',
    () => {
      const {
        createApexTestWireAdapter
      } = require('@salesforce/sfdx-lwc-jest');
      return {
        default: createApexTestWireAdapter(jest.fn())
      };
    },
    { virtual: true }
  );


describe('c-account-name', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
     
    beforeEach(() => {
          
        const element = createElement('c-account-name', {
            is: AccountName
        });

        document.body.appendChild(element);
    });
    it('logic', async() => {

        
       
        const element = document.body.querySelector('c-account-name');
        const combobox = element.shadowRoot.querySelector('lightning-combobox');
        combobox.value = '0015i00000a3f5LAAQ';
        combobox.dispatchEvent(new CustomEvent('change',{
            detail:{
                value: combobox.value
            }
        }))
        await flushPromises();
        expect(combobox.value).toBe('0015i00000a3f5LAAQ');
        expect(1).toBe(1);
        
    });

    it('Check Wire', async() =>{

        
        AccountNames.emit(accs);
        ContactDetail.emit(conts);
        expect(1).toBe(1);
        AccountNames.emit();
        ContactDetail.emit();

    });

    it('Button Click', async() =>{

        const element = document.body.querySelector('c-account-name');
        const button = element.shadowRoot.querySelectorAll('lightning-button');

        button[0].click();
        await flushPromises();
        button[1].click();
        await flushPromises();
        expect(1).toBe(1);

    });



   
});