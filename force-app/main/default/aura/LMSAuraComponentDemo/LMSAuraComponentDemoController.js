({
    handleMessage: function (component, event) {
        if (event) {
            component.set('v.incomingMessage', JSON.stringify(event));
        }
    },

    publishToMessageChannel: function (component) {
        component.find('myMessageChannel')
            .publish({
                messageToSend: component.get('v.message'),
                sourceSystem: 'From Aura'
            });
    }
});