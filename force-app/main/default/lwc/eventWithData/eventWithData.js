import {LightningElement, track, wire} from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class EventWithData extends LightningElement {
    @track
    selectedContact;

    @wire(getContacts)
    contacts;

    get listIsNotEmpty() {
        return this.contacts
            && Array.isArray(this.contacts.data)
            && this.contacts.data.length > 0;
    }

    contactSelected(event) {
        const contactId = event.detail;
        this.selectedContact = this.contacts.data.find(contact => contact.Id === contactId);
    }
}