const events = require('events');
eventEmitter = new events.EventEmitter();

// Standard Function called greet
function Greet() {
    console.log("Hello");

}

// Add a listener that will be triggered with "greet" and call Greet()
eventEmitter.on("greet", Greet);

// Trigger the event
eventEmitter.emit('greet');

// Remove the event emitter by using the same arguments from turning it on
eventEmitter.removeListener('greet', Greet);