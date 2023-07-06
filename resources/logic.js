let firstNumber = '0';
let secondNumber = '0';
let currentOperation = null;
let shouldResetScreen = false;
let activeButtonPressed = null;

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
	activeButtonPressed = document.querySelector(`.btn[value="${key}"]`);
	if (activeButtonPressed) {
		activeButtonPressed.classList.add('active');
		setTimeout(() => {
			activeButtonPressed.classList.remove('active');
		}, 100);
	}

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
	if (screenCurrent.textContent.length <= 10) screenCurrent.textContent += num;
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
	screenCurrent.textContent = screenCurrent.textContent.toString().slice(0, -1);
}

function resetScreen() {
	screenCurrent.textContent = '';
	shouldResetScreen = false;
}


/* MAIN FUNCTIONS */

/* Sets [New Operator] and [First Number]. Calculates if Operator existed */
function setOperation(operator) {
	if (currentOperation !== null ) evaluate();
	if (operator === '=') {
		currentOperation = null;
		return;
	};
	firstNumber = screenCurrent.textContent;
	currentOperation = operator;
	screenLast.textContent = `${firstNumber} ${operator}`;
	if (currentOperation !== '=')shouldResetScreen = true;
}

/* Sets [Second Number] and Calculates */
function evaluate() {
	if (currentOperation === null || shouldResetScreen) return;
	if (currentOperation === '/' && screenCurrent.textContent === '0') {
		alert('Can\´t divide by zero!')
		return;
	}
	secondNumber = screenCurrent.textContent;
	screenCurrent.textContent = roundResult(operate(currentOperation, firstNumber, secondNumber));
	screenLast.textContent = `${firstNumber} ${currentOperation} ${secondNumber}=`
	currentOperation = null;
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
	return Math.round(num * 1000) / 1000;
}


/* Calculates */
function operate(operator, first, second ) {
	firstNum = Number(first);
	secondNum = Number(second);
	switch(operator) {
		case 'x':
			return multiply(firstNum, secondNum);
		case '*':
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



