import {LightningElement, api, wire} from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

export default class Record extends LightningElement {
    @api
    recordId

    @wire(getRecord, {recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD]})
    wiredRecord;
}