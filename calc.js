let a = 0,
    b = 0,
    operator = "",
    flagResDisp = true, //This is to refresh the result display for the second number
    flagFirstRun = true, //Checks if it's the first calculation
    allowEqual = true;

const calculatorDisp = document.querySelector(".calculatorDisp");
const resultDisp = document.querySelector(".resultDisp");


const clearAll = document.querySelector(".clearAll");
clearAll.addEventListener('click', resetAll());

function resetAll() {
    a = 0;
    b = 0;
    resultDisp.textContent = "";
    calculatorDisp.textContent = "";
    operator = "";
    flagResDisp = true;
    flagFirstRun = true;
    allowEqual = true;
}


const numbersPressed = document.querySelectorAll(".number");
numbersPressed.forEach(numberPressed => {
    numberPressed.addEventListener('click', () => {
        getValueNumber(numberPressed.textContent)
    });
});

function getValueNumber() { //This prints the number on result display
    if (flagResDisp == false) {
        resultDisp.textContent = "";
        allowEqual = true;
        flagResDisp = true;
        noRepeatEqual();
    }
    resultDisp.textContent += String(arguments[0]);
}


const operatorsPressed = document.querySelectorAll(".operator");
operatorsPressed.forEach(operatorPressed => {
    operatorPressed.addEventListener('click', () => {
        getValueOperator(operatorPressed.textContent);
    })
});

function getValueOperator() { //Gets the operator value and gets the second value
    operator = String(arguments[0]);
    b = Number(resultDisp.textContent);
    calculatorDisp.textContent += resultDisp.textContent + " " + operator + " ";
    if (!flagFirstRun) {
        a = operate(operator, a, b);
        resultDisp.textContent = a;
    } else {
        a = b;
    }
    flagResDisp = false;
    flagFirstRun = false;
}


const equalPressed = document.querySelector(".calculate");

function noRepeatEqual() { //This function makes sure that the equal symbol can't be pressed more than once
    if (allowEqual) {
        equalPressed.addEventListener('click', callingEqual);
    } else {
        equalPressed.removeEventListener('click', callingEqual);
    }
}

function callingEqual() {
    b = Number(resultDisp.textContent);
    calculatorDisp.textContent += resultDisp.textContent + " ";
    resultDisp.textContent = operate(operator, a, b);
    a = Number(resultDisp.textContent);
    allowEqual = false;
    noRepeatEqual();
}


function operate(operator, number1, number2) { //Performs basic mathmematic operations two given values
    let result = 0;
    switch (operator) {
        case '+':
            result = number1 + number2;
            break;

        case '-':
            result = number1 - number2;
            break;

        case '*':
            result = number1 * number2;
            break;

        case '/':
            result = number1 / number2;
            break;
    }
    return result;
}