const args= process.argv;
const operation = args[2];
const num1 = Number(args[3]);
const num2 = Number(args[4]);

let result;

if (operation==="add"){
    result=num1+num2;
}
else if (operation==="sub"){
    result=num1-num2;
}
else if (operation==="multi"){
    result=num1*num2;
}
else if (operation==="div"){
    if (num2 === 0) {
        console.log("Cannot divide by zero");
        process.exit();
    }
    result=num1/num2;
}
else{
    console.log("invalid operation")
    process.exit();
}
console.log("result:",result);