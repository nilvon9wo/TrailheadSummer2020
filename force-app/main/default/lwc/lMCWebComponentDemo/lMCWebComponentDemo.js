import {LightningElement, track, wire} from 'lwc';
import {subscribe, unsubscribe, publish, APPLICATION_SCOPE, MessageContext} from 'lightning/messageService';
import SAMPLE_MESSAGE_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';

export default class LMcWebComponentDemo extends LightningElement {
    @track
    receivedMessage = '';

    @track
    myMessage = '';

    subscription = null;

    @wire(MessageContext)
    messageContext;

    handleChange(event) {
        this.myMessage = event.target.value;
    }

    publishToMessageChannel() {
        publish(this.messageContext, SAMPLE_MESSAGE_CHANNEL, {
            messageToSend: this.myMessage,
            sourceSystem: 'From LWC'
        });
    }

    displayMessage(message) {
        console.log('####### displayMessage message', message);
        this.receivedMessage = message
            ? JSON.stringify(message, null, '\t')
            : 'no message payload';
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                SAMPLE_MESSAGE_CHANNEL,
                (message) => this.displayMessage(message),
                {scope: APPLICATION_SCOPE}
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}