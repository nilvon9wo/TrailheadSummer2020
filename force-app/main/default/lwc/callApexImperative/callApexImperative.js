import {LightningElement, api, wire} from 'lwc';
import {reduceErrors} from 'c/ldsUtils';
import getRelatedContacts from '@salesforce/apex/AccountController.getRelatedContacts';

export default class CallApexImperative extends LightningElement {
    @api recordId;
    errors;

    handleButtonClick() {
        getRelatedContacts({accountId: '$recordId'})
            .then(contacts => {

            })
            .catch((error => {
                this.errors = reduceErrors(error);
            }));
    }
}