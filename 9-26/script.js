function sayHello() {
    console.log("Hello");
    return undefined;
}

let renamedSayHello = sayHello;
renamedSayHello();

function callRepeatedTooManyTimes() {
    console.log("You called the function too many times");
}

let repeatedCount = 0;
function repeat(fn, count, error_fn) {
    for (let i = 0; i < count; i++) {
        if (repeatedCount >= 8) {
            error_fn();
            return;
        }
        fn();
        repeatedCount++;
    }
}

repeat(renamedSayHello, 10, callRepeatedTooManyTimes);
