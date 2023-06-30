let firstNumber = 0
let secondNumber = 0
let operator = ''


const screenLast = document.getElementById("screen--last")
const screenCurrent = document.getElementById("screen--current")

const buttons = document.querySelectorAll(".btn")

screenCurrent.innerText = firstNumber
screenLast.innerText = "Let's do some Maths"



/* EVENTS */

buttons.forEach( btn => {
	btn.addEventListener("click", () => {
		const btnText = btn.innerText;
		
		if (btn.classList.contains('delete')) {
			deleteLast();
			updateScreen(firstNumber, screenCurrent);
		}

		if (btn.classList.contains('all-clear')) {
			clearAll();
		}

		// Check if the button clicked is a number
		if (!isNaN(btnText) || btnText === '.') {
			// Check if the operator has been selected
			if (operator === '') {
			  // Add the clicked button text to the first number
			  firstNumber = updatedNum(btnText, firstNumber);
			  updateScreen(firstNumber, screenCurrent);
			} else {
			  // Add the clicked button text to the second number
			  secondNumber = updatedNum(btnText, secondNumber);
			  updateScreen(firstNumber, screenLast);
			  updateScreen(secondNumber, screenCurrent);
			}
			}
		  // Check if the button clicked is an operator
			else if (btn.classList.contains('operator')) {
			if (secondNumber) {
				console.log("IM herreeeeee!!!")
				operate(firstNumber, secondNumber, operator);
				secondNumber = 0;
			}
			operator = btnText;
			/* screenCurrent.innerText = operator; */
		  }
	  
		  console.log('First Number:', firstNumber);
		  console.log('Operator:', operator);
		  console.log('Second Number:', secondNumber);
		});
})

function updatedNum(btnText, num) {
	// Add the clicked button text to the first number
	if (btnText === '.' && !num.includes('.')) {
		// Add decimal point only if it hasn't been added before
		num += btnText;
	  } else if (btnText !== '.') {
		// Append the clicked number to the first number
			if (num === 0) {
				num = btnText;
			} else {
				num += btnText;
			}
		}
	return num
}

function updateScreen(btnText,screen) {
	screen.innerText = btnText;
}

function updateLastScreen(firstNum, secondNum, operator, screen) {
	let result = String(firstNum).concat(" ", operator, " ", String(secondNum));
	screen.innerText = result;
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

function operate(first, second, operator) {
	/* takes an operator and 2 numbers and then calls one of the above functions on the numbers */
	total = 0;
	firstNum = parseFloat(first);
	secondNum = parseFloat(second);
	switch(operator) {
		case 'x':
			total = multiply(firstNum, secondNum);
			break;
		case '/':
			total = divide(firstNum, secondNum);
			break;
		case '-':
			total = subtract(firstNum, secondNum);
			break;
		case '+':
			total = sum(firstNum, secondNum);
			break;
		case '%':
			total = modulus(firstNum, secondNum);
			break;
		default:
			console.log('Invalid operator');
	}
	updateLastScreen(firstNum, secondNum, operator, screenLast); 
	firstNumber = total;
	updateScreen(firstNumber,screenCurrent);
}

function clearAll() {
	firstNumber = 0;
	secondNumber = 0;
	operator = '';
	updateScreen(firstNumber,screenCurrent);
	updateScreen(firstNumber,screenLast);
}

function deleteLast() {
	firstNumber = screenCurrent.innerText.slice(0, -1);

	if (firstNumber === '') {
		firstNumber = 0;
	}
}




