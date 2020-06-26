import {LightningElement, api} from 'lwc';

export default class ContactListItem extends LightningElement {
    @api
    contact;

    selectHandler(event) {
        event.preventDefault();
        const selectedEvent = new CustomEvent('select', {detail: this.contact.Id});
        this.dispatchEvent(selectedEvent);
    }
}