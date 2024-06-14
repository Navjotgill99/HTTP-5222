//blocking code example using setTimeout
console.log("Start");

// setTimeout with a delay of 2000 milliseconds
setTimeout(timeout, 2000);

function timeout(){
    console.log("Inside setTimeout");
}

console.log("End");

/* 
Explanation:
Even though setTimeout is set to 2000 milliseconds, "End" will be printed immediately 
after "Start" without waiting for setTimeout to finish. 
This is because setTimeout is non-blocking, allowing the code to continue executing 
while waiting for the delay to finish.
*/
