import {LightningElement, wire} from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';

export default class WireCpr extends LightningElement {
    @wire(CurrentPageReference)
    pageRef;
    get currentPageRef() {
        return this.pageRef
            ? JSON.stringify(this.pageRef, null, 2)
            : '';
    }
}