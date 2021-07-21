let a = 0,
    b = 0,
    operator = "",
    flagResDisp =  true;

const calculatorDisp = document.querySelector(".calculatorDisp");
const resultDisp = document.querySelector(".resultDisp");


const clearAll = document.querySelector(".clearAll");
clearAll.addEventListener('click', () => {
    resultDisp.textContent = "";
})

const numbersPressed = document.querySelectorAll(".number");
numbersPressed.forEach(numberPressed => {
    numberPressed.addEventListener('click', () => {
        if(flagResDisp == false) {
            resultDisp.textContent = "";
        }
        flagResDisp = true;
        resultDisp.textContent += String(numberPressed.textContent);
    })
});

const operatorsPressed = document.querySelectorAll(".operator");
operatorsPressed.forEach(operatorPressed => {
    operatorPressed.addEventListener('click', () => {
        operator = String(operatorPressed.textContent);

        b = Number(resultDisp.textContent);
        calculatorDisp.textContent += resultDisp.textContent+" "+operator+" ";
        a = operate(operator, a, b);
        resultDisp.textContent = a;
        flagResDisp = false;
    })
});


const equalPressed = document.querySelector(".calculate");
equalPressed.addEventListener('click', () => {
    b = Number(resultDisp.textContent);
    calculatorDisp.textContent += resultDisp.textContent+" ";
    resultDisp.textContent = operate(operator, a, b);
    a = Number(resultDisp.textContent);
})


function add() {
    return arguments[0] + arguments[1];
}

function diff() {
    return arguments[0] - arguments[1];
}

function mul() {
    return arguments[0] * arguments[1];
}

function div() {
    return arguments[0] / arguments[1];
}

function operate(operator, number1, number2) {
    let result = 0;
    switch (operator) {
        case '+':
            result = add(number1, number2);
            break;

        case '-':
            result = diff(number1, number2);
            break;

        case '*':
            result = mul(number1, number2);
            break;

        case '/':
            result = div(number1, number2);
            break;
    }
    return result;
}