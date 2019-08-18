let btn = document.querySelector("#item1");

btn.addEventListener("click", function(e) {
    console.log("The button was clicked.");
});

// addEventListener would execute the callback function if and when a button was clicked
// Won't work in Node; Written for browser.