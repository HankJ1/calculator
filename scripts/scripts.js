const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const inputButton = document.querySelector('#input');
const clearButton = document.querySelector('#clear');
const backSpaceButton = document.querySelector('#backspace')

let inputNum1;
let inputNum2;
console.log(inputNum1);
let array1 = [];
let array2 = [];
let arrayInput = [];

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if (e.srcElement.classList[1] == "dec" && array1.some(element => element == ".") == true) {
            console.log("bollocks");
            return "bollocks";
        }
        if (storedOperator1 == "equals") {
            //array1 = [];
            storedOperator1 = undefined;
            inputNum1 = undefined;
            inputNum2 = undefined;
            inputButton.textContent = "";
        }
        //console.log(number.textContent);
        array1.push(number.textContent);
        inputButton.textContent = array1.join("");
        //console.log(inputButton.textContent);
        
    })
})

backSpaceButton.addEventListener('click', () => {
    if (array1.length > 0) {
        array1.pop();
        inputButton.textContent = array1.join("");
    }
})

clearButton.addEventListener('click', () => {
    array1 = [];
    inputNum1 = undefined;
    storedOperator1 = undefined;
    inputButton.textContent = "";
})

let errorTest;
let storedOperator1;
let storedOperator2;
operators.forEach(operator => {
    operator.addEventListener('click', function(e)  {
        let inputString = array1.join("");
        if (e.srcElement.classList[1] == "negative") {
            if(array1[0] == "-") {
                array1.shift();
                inputButton.textContent = array1.join("");
            } else if (array1.length == 0) {
                array1[0] = "-";
                inputButton.textContent = array1.join("");
            }
            else {
            //console.log("watch me watch me")
            array1.unshift("-");
            inputButton.textContent = `-${inputButton.textContent}`;
            }
        

        } else if (storedOperator1 == "equals") {
            storedOperator1 = e.srcElement.classList[1];
        } else if (errorTest == "error") {
            storedOperator1 = e.srcElement.classList[1];
            errorTest = "";

        } else if (inputNum1 !== undefined) {
            //console.log('undefined branch');
            inputNum2 = parseFloat(inputString)
            array1 = [];
            //console.log(`stored operator 1: ${storedOperator1}`);
            let computed = (compute(storedOperator1, inputNum1, inputNum2));
                if (computed == "error") {
                    inputNum2 = undefined;
                    storedOperator1 = undefined;
                    errorTest = "error";
                    return "divide by 0 error"
                }
            //console.log(`inputNum1 is equal to ${computed}`);
            storedOperator1 = e.srcElement.classList[1];
            inputNum1 = computed;
            console.log(typeof(inputNum1));
            if ((computed < 0.001 && computed > 0) || (computed < -.0000000000000000000001 && computed > -0.001 )) {
                inputButton.textContent = computed.toExponential(2);
            } else {
                inputButton.textContent = +parseFloat(computed.toFixed(2));
            }
            //console.log(`input button text content = ${inputButton.textContent}`);

        } else {
        inputNum1 = parseFloat(inputString);
        //console.log("else branch");
        array1 = [];
        storedOperator1 = e.srcElement.classList[1];
        //console.log(`stored operator 1: ${storedOperator1}`);
        }
        
        //console.log(inputNums);

    })
})

function compute(opType, num1, num2) {
    if (opType == "divide" && num2 == 0) {
        alert("dividing by zero not allowed in these parts");
        inputButton.textContent = num1;
        return "error"
    }
    switch (opType) {
        case "plus":
            return num1 + num2;
            break;
        case "minus":
            return num1 - num2;
            break;
        case "multiply":
            return num1 * num2;
            break;
        case "divide":
            return num1 / num2;
            break;
        default: 
            return num2;
            break;
    }
}

console.log(array1);