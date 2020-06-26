import {LightningElement, track} from 'lwc';

export default class EventSimple extends LightningElement {
    @track
    page = 1;

    previousHandler() {
        if(this.page > 1) {
            this.page = this.page - 1;
        }
    }

    nextHandler() {
        if(this.page < 10) {
            this.page = this.page + 1;
        }
    }
}