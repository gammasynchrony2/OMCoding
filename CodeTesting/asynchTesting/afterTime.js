let logCall = function() {
    console.log('logCall was called');
};

setTimeout(logCall, 3000);

// Function will not execute until something else happens
// In this case, it will execute after 3 seconds has passed