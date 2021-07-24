let a = 0,
    b = 0,
    operator = "",
    prevOperator = "",
    flagResDisp = true, //This is to refresh the result display for the second number
    flagFirstRun = true, //Checks if it's the first calculation
    multipleDots = false,
    allowEqual = true;

const calculatorDisp = document.querySelector(".calculatorDisp");
const resultDisp = document.querySelector(".resultDisp");


const clearAll = document.querySelector(".clearAll");
clearAll.addEventListener('click', resetAll);

function resetAll() { //Resets all variables and displays
    a = 0;
    b = 0;
    resultDisp.textContent = "";
    calculatorDisp.textContent = "";
    operator = "";
    flagResDisp = true;
    flagFirstRun = true;
    allowEqual = true;
    multipleDots = false;
}

const clearOne = document.querySelector(".clearOne");
clearOne.addEventListener('click', () => { //Clears one element at hte end of the result display
    let arr = resultDisp.textContent.split("");
    arr.pop();
    resultDisp.textContent = arr.join("");
});

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
    } else if (allowEqual == false) {
        resetAll();
    } else if (multipleDots && arguments[0] == '.') {
        return;
    }

    if (arguments[0] == '.') {
        multipleDots = true;
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

    if (prevOperator == "/" && b === 0) {
        alert("You can't divide by 0!");
        resetAll();
        return;
    }

    calculatorDisp.textContent += resultDisp.textContent + " " + operator + " ";
    if (!flagFirstRun) {
        a = operate(prevOperator, a, b);
        if (multipleDots) {
            resultDisp.textContent = a.toFixed(2);
        } else {
            resultDisp.textContent = a;
        }
    } else {
        a = b;
    }
    prevOperator = operator;
    flagResDisp = false;
    flagFirstRun = false;
    multipleDots = false;
}


const equalPressed = document.querySelector(".calculate");

function noRepeatEqual() { //This function makes sure that the equal symbol can't be pressed more than once
    if (allowEqual) {
        equalPressed.addEventListener('click', callingEqual);
    } else {
        equalPressed.removeEventListener('click', callingEqual);
    }
}

function callingEqual() { //Calculates when equal is pressed
    b = Number(resultDisp.textContent);
    if (operator == "/" && b === 0) {
        alert("You can't divide by 0!");
        resetAll();
        return;
    }
    calculatorDisp.textContent += resultDisp.textContent + " " + "=";
    if (multipleDots) {
        resultDisp.textContent = operate(operator, a, b).toFixed(2);
    } else {
        resultDisp.textContent = operate(operator, a, b);
    }
    a = Number(resultDisp.textContent);
    allowEqual = false;
    flagFirstRun = true;
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

        case '^':
            result = Math.pow(number1,number2);
    }
    return result;
}