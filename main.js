const display1E1 = document.querySelector(".display-1");
const display2E1 = document.querySelector(".display-2");
const tempResultE1 = document.querySelector(".temp-result");
const numbersE1 = document.querySelectorAll(".number");
const operationE1 = document.querySelectorAll(".operation");
const clearAllE1 = document.querySelector(".all-clear");
const equalE1 = document.querySelector(".equal");
const clearLastE1 = document.querySelector(".last-entity-clear");
//create a data bucket we would store the first and second dispaly numbers, and then create a data bucket for the output or result and one more for the dot button
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;
//now its time to create an event listener for each number, operation, e.
numbersE1.forEach((number) => {
    number.addEventListener("click", (e) => {
    // because we can add multiple dots and we only want to be able to add one dot which would represent a decimal point,we would write the program as; 
    // when we click on the dot button, haveDots will be true i.e we would be viable to click on the dots as many times as possible whether or not we had a dot previously
   //and if we have any type of dot from previous,then haveDot should be returned because we don't want another dot.
        if(e.target.innerText === "." && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            return;
        }
       // for whenever i type a number, it should appear in displayTwo area
        dis2Num += e.target.innerText;
      //show the number on the screen for whenever i click on a number
        display2E1.innerText = dis2Num;
        //console.log ();
    });
});

//add a click event listener to operations button 
operationE1.forEach((operation)=> {
   operation.addEventListener("click",(e)=>{
       //make sure if there's no kind of number, then return
        if (!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        //check to see if  display one , to and last operation is present,  create a math operation
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation ();
        } else{
        //use parsefloat to make a string to a number
            result = parseFloat(dis2Num);
        }
        //call another funtion to pass operationName
        clearVar(operationName);
        lastOperation = operationName;
        console.log (result);
    });
});
//call another funtion to pass operationName, use empty quotes for default
function clearVar(name ='') {
    dis1Num += dis2Num + " " + name + " ";
    //also update the screen by displaying display1E1
    display1E1.innerText = dis1Num;
    //clear display 2 for when i click a number and operation
    display2E1.innerText = '';
    dis2Num = '';
    tempResultE1.innerText = result;
}

//if last operation is equal to an operation, result is equal parsefloat(parsefloat represents a number instead of a string) and the operation. 
//do this for all operations- plus, modulus, divide, multiply
function mathOperation() {
    if(lastOperation === "*"){
        result = parseFloat(result) * parseFloat(dis2Num);
    }else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num);
    }else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2Num);
    }else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

//return if there's no displaay2Num nd dis1Num
equalE1.addEventListener("click", () => {
    if (!dis2Num || !dis1Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2E1.innerText = result;
    tempResultE1.innerText = "";
    dis2Num = result;
    dis1Num = "";

});

//call clearll variable to clear numbers for when you want to clear numbers
clearAllE1.addEventListener("click", () => {
    dis1Num = "";
    dis2Num ="";
    display1E1.innerText = "0";
    display2E1.innerText = "0";
    result = "";
    tempResultE1.innerText = "";
});

//call function for clear last element for wenever we make a mistake and want to clear the last element in dis2Num 
clearLastE1.addEventListener("click", () =>{
    display2E1.innerText = "";
    dis2Num = "";
});

//For esier accessibilty while using the calculator, we can use our keyboards. whatever i press any kind of number on my keyboard, 
//it automatically reflects on the calculator.
window.addEventListener("keydown",(e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "." 
    ) {
        clickButtonE1(e.key);
        //console.log(e.key)
    }else if(e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*" || e.key === "%"){
        clickOperation(e.key)
        //console.log(e.key)

    }else if (e.key == "Enter" || e.key === "="){
        clickEqual();
    }
    //console.log(e.key)
});
// loop through each of these numbers and opeartions on the keyboard to make sure it reflects on the keys on the calculator by calling a function

function clickButtonE1(key) {
    numbersE1.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    });
}
function clickOperation(key) {
    operationE1.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click();
        }
    });
}
function clickEqual() {
    equalE1.click();
}