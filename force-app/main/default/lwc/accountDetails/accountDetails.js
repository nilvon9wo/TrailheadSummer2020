import {LightningElement, api, wire} from 'lwc';
import queryRelatedContacts from '@salesforce/apex/AccountListControllerLwc.queryRelatedContacts';

export default class AccountInfo extends LightningElement {
    @api recordId;

    @wire(queryRelatedContacts, {accountId: '$recordId'})
    contacts;
}