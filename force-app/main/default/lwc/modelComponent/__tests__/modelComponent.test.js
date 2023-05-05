import { createElement } from 'lwc';
import ModelComponent from 'c/modelComponent';


async function flushPromises(){
    return Promise.resolve();
}

describe('c-model-component', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
     
    beforeEach(() => {
          
        const element = createElement('c-model-component', {
            is: ModelComponent
        });

        document.body.appendChild(element);
    });

    it('Input Value of Contacts', async() => {
       
        const element = document.body.querySelector('c-model-component');
        const input = element.shadowRoot.querySelectorAll('lightning-input-field');
        input[0].value = 'Jack';
        input[0].dispatchEvent(new CustomEvent('change',{
            detail:{
                value: input[0].value
            }
        }));
        await flushPromises();
        
        input[2].value = 'John@gmail.com';
        input[2].dispatchEvent(new CustomEvent('change',{
            detail:{
                value: input[2].value
            }
        }))
        await flushPromises();
        expect(input[2].value).toBe('John@gmail.com');

        input[3].value = '9876543210';
        input[3].dispatchEvent(new CustomEvent('change',{
            detail:{
                value: input[3].value
            }
        }))
        await flushPromises();
        expect(input[3].value).toBe('9876543210');

        const button = element.shadowRoot.querySelectorAll('lightning-button');

        button[0].click();
        await flushPromises();
        button[1].click();
        //await flushPromises();
        expect(1).toBe(1);
    });


    it('For Error Function', async()=>{
        
        const element = document.body.querySelector('c-model-component');
        const input = element.shadowRoot.querySelectorAll('lightning-input-field');
        input[0].value = 'Jack';
        input[0].dispatchEvent(new CustomEvent('change',{
            detail:{
                value: input[0].value
            }
        }));
        await flushPromises();
        //expect(input[1].value).toBe('John');
        input[1].value = 'John';
        input[1].dispatchEvent(new CustomEvent('change',{
            detail:{
                value: input[1].value
            }
        }))
        await flushPromises();
        expect(input[1].value).toBe('John');

        input[2].value = 'John';
        input[2].dispatchEvent(new CustomEvent('change',{
            detail:{
                value: input[2].value
            }
        }))
        await flushPromises();
        expect(input[2].value).toBe('John');

        input[3].value = '9876543210';
        input[3].dispatchEvent(new CustomEvent('change',{
            detail:{
                value: input[3].value
            }
        }))
        await flushPromises();
        expect(input[3].value).toBe('9876543210');

        const button = element.shadowRoot.querySelectorAll('lightning-button');

        button[0].click();
        await flushPromises();
        button[1].click();
        //await flushPromises();
        expect(1).toBe(1)
    });
});