let firstNumber = '0';
let secondNumber = '0';
let currentOperation = null;
let shouldResetScreen = false;

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const dotBtn = document.querySelector(".btn.dot");
const clearBtn = document.querySelector(".btn.all-clear");
const deleteBtn = document.querySelector(".btn.delete");
const equalsBtn = document.getElementById('equalsBtn');
const screenLast = document.getElementById("screen--last");
const screenCurrent = document.getElementById("screen--current");


/* EVENTS */

window.addEventListener('keydown', handleKeyboardInput);
equalsBtn.addEventListener('click', evaluate);
deleteBtn.addEventListener('click', deleteNumber);
dotBtn.addEventListener('click', appendPoint);
clearBtn.addEventListener('click', clearAll);

numberBtns.forEach( btn => {
	btn.addEventListener("click", () => appendNumber(btn.textContent));
});

operatorBtns.forEach( btn =>
	btn.addEventListener('click', () =>
		setOperation(btn.value))
)


/* FUNCTIONS FOR EVENTS */

function handleKeyboardInput(e) {
	let key = e.key;
	if (key >= 0 && key <= 9) appendNumber(key);
	if (key === '.') appendPoint();
	if (key ==='=' || key === 'Enter') evaluate();
	if (key === 'Backspace') deleteNumber();
	if (key === 'Escape') clearAll();
	if (key === '+' || key === '-' || key === '*' || key === '/' || key === "%") {
		setOperation(convertOperator(key));
	};
}

function convertOperator(keyboardOperator) {
	if (keyboardOperator === '*') return 'x';
	return keyboardOperator;
}

function appendNumber(num) {
	if (screenCurrent.textContent === '0' || shouldResetScreen) {
		resetScreen();
	};
	screenCurrent.textContent += num;
}

function appendPoint() {
	if (shouldResetScreen) resetScreen();
	if (screenCurrent === '') {
		screenCurrent = '0'};
	if (screenCurrent.textContent.includes('.')) return;
	screenCurrent.textContent += '.';
}

function clearAll() {
	screenCurrent.textContent = '0';
	screenLast.textContent= '';
	firstNumber = '';
	secondNumber = '';
	currentOperation = null;
}

function deleteNumber() {
	console.log("IM HERE DELETE")
	screenCurrent.textContent = screenCurrent.textContent.toString().slice(0, -1);
}

function resetScreen() {
	screenCurrent.textContent = '';
	shouldResetScreen = false;
}


/* MAIN FUNCTIONS */

/* Sets [New Operator] and [First Number]. Calculates if Operator existed */
function setOperation(operator) {
	console.log(`BEFORE SetOperation FT. Fnum: ${firstNumber} currentOP: ${currentOperation} secondNum: ${secondNumber}`)
	if (currentOperation !== null) evaluate();
	firstNumber = screenCurrent.textContent;
	currentOperation = operator;
	screenLast.textContent = `${firstNumber} ${operator}`;
	shouldResetScreen = true;
	console.log(`AFTER SetOperation FT. Fnum: ${firstNumber} currentOP: ${currentOperation} secondNum: ${secondNumber}`)
}

/* Sets [Second Number] and Calculates */
function evaluate() {
	console.log(`BEFORE Evaluate FT. Fnum: ${firstNumber} currentOP: ${currentOperation} secondNum: ${secondNumber}`)
	if (currentOperation === null || shouldResetScreen) return;
	if (currentOperation === '/' && screenCurrent.textContent === '0') {
		alert('Can\´t divide by zero!')
		return;
	}
	secondNumber = screenCurrent.textContent;
	console.log(roundResult(operate(currentOperation, firstNumber, secondNumber)));
	screenCurrent.textContent = roundResult(operate(currentOperation, firstNumber, secondNumber));
	screenLast.textContent = `${firstNumber} ${currentOperation} ${secondNumber}=`
	currentOperation = null;
	console.log(`AFTER Evaluate FT. Fnum: ${firstNumber} currentOP: ${currentOperation} secondNum: ${secondNumber}`)
}




/* CALCULATOR OPERATIONS */

function multiply(first, second) {
	return first * second;
}

function divide(first, second) {
	return first / second;
}

function sum(first, second) {
	return first + second;
}

function subtract(first, second) {
	return first - second;
}

function modulus(first, second) {
	return first % second;
}

function roundResult(num) {
	console.log(`AFTER OPERATE FT. Fnum: ${firstNumber} currentOP: ${currentOperation} secondNum: ${secondNumber}`)
	console.log(`Number received: ${num}`)
	return Math.round(num * 1000) / 1000;
}


/* Calculates */
function operate(operator, first, second ) {
	console.log(`BEFORE OPERATE FT. Fnum: ${firstNumber} currentOP: ${currentOperation} secondNum: ${secondNumber}`)
	firstNum = Number(first);
	secondNum = Number(second);
	switch(operator) {
		case 'x':
			return multiply(firstNum, secondNum);
		case '/':
			if (secondNum === 0) return null
			else return divide(firstNum, secondNum);
		case '-':
			return subtract(firstNum, secondNum);
		case '+':
			return sum(firstNum, secondNum);
		case '%':
			return modulus(firstNum, secondNum);
		default:
			return null;
	}
}



