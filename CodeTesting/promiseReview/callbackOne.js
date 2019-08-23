// watchTutorialCallback accepts 2 callbacks
//      one for success (callback)
//      one for failure (errorCallback)
// checks 2 variables to see if they're true
//      userLeft && userWatchingCatMeme
// if either one is true, an error callback will execute
// if neither one is true, the success callback will execute

const userLeft = false;
const userWatchingCatMeme = false;

function watchTutorialCallback(callback, errorCallback) {
    if(userLeft) {
        errorCallback({
            name: 'User Left',
            message: ':('
        })
    } else if(userWatchingCatMeme) {
        errorCallback({
            name: 'User Watching Cat Meme',
            message: "WebDevSimplified < Cat"
        })
    } else {
        callback('Thumbs up and Subscribe')
    }
}

watchTutorialCallback((message) => {
    console.log('Success: ' + message)
}, (error) => {
    console.log(error.name + ' ' + error.message)
})