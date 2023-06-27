let first_num = 0
let second_num = 0
let operator = ''


const screenLast = document.getElementById("screen--last")
const screenCurrent = document.getElementById("screen--current")

const buttons = document.querySelectorAll(".btn")

screenCurrent.innerText = first_num
screenLast.innerText = "Let's do some Maths"



/* EVENTS */

buttons.forEach( btn => {
	btn.addEventListener("click", () => {
		const btnText = btn.innerText;
		if (second_num == 0 && operator == '') {
			first_num = first_num * 10 + btnText
		}
		console.log(btnText);
	})
})


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
}

function clearAll() {}

function display() {

}

/* LOGIC FOR NUMBERS

On click: 
	Register the number added;
	Reject any operator besides "-"

		if there was a number before, then append;
			If operator, then append;
				if another operator, replace operation;
				if 



*/



