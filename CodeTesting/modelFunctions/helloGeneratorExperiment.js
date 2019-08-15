// This file was written to try and explain what sayHelloGenerator does

// Step 1: Declaration of the SHG
function sayHelloGenerator() {
    
    // Step 2: instantiates a variable "prefix" for the first part of the string
    const prefix = "Hello ";

    // Step 3: Declaration of function "hey" that takes "name" as a parameter
    function hey(name) {

        // Step 4: Function "hey" returns the string "prefix" (declared in Step 2) + name parameter
        return prefix + name;
    }

    // Step 5: Function SHG returns the function hey (not its output)
    return hey;
}

// Step 6: Declares a variable "sayHey" and sets it equal to the output of the function SHG
    // Currently, the output of the SHG function is the "hey" function
    // Currently, the "hey" 
        // 1) takes "name" as a parameter
        // 2) returns prefix + name
    // Therefore, calling "sayHey" and giving it a parameter will return 
        // 1) the prefix
        // 2) the parameter
const sayHey = sayHelloGenerator();

// Declares a variable msg and sets its value equal to the output of sayHey
const msg = sayHey("Bart");

// Reports the value of msg
console.log(msg);