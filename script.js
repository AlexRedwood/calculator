let add = (a,b) => (a + b);

let substract = (a, b) => (a - b); 

let multiply = (a, b) => (a * b);

let divide = (a,b) => {
  if (b == 0) return "Can't divide by zero"
  return a / b; 
}

let power = (a , b) => (a**b);

function factorial(a) {
	if (a == 0 || a == 1) {
		return 1;
	} else {
		return a * factorial(a - 1);
	}
}

function operate (a, b, operator) {
  if (operator == ' + ') {
    return add(a,b);
  } else if (operator == ' − ') {
    return substract(a,b);
  } else if (operator == ' × ') {
    return multiply(a,b); 
  } else if (operator == ' ÷ ') {
    return divide(a,b); 
  }
}

const display = document.getElementById('display');
display.textContent = 0;
const log = document.getElementById('log');
log.textContent = null;
const numberButtons = Array.from(document.getElementsByClassName('number'));
let clearField = 0;
let loopThis = 0;

function displayProperties(fontSize = '45px', paddingTop = '5px', textAlign = 'right') {
  display.style.fontSize = fontSize;
  display.style.paddingTop = paddingTop;
  display.style.textAlign = textAlign;
}

function reset() {
  resetDisplay ();
  resetLog ();
  firstNumber = null;
  secondNumber = null;
  accumulator = null;
  clearField = 0;
  loopThis = 0;
  secondNumberForLoop= null;
  operator = null;
}

function resetDisplay () {
  display.textContent = 0;
  displayProperties();
}

function resetLog () {
  log.textContent = '';
}

function controlDisplaySize() {
    if (display.textContent.length > 14 && display.textContent.length <= 18){
      displayProperties('35px', '10px');
    } else if (display.textContent.length > 18 && display.textContent.length <= 25){
      displayProperties('28px', '15px');
    } else if (display.textContent.length > 25){
      display.textContent = null;
      displayProperties('25px', '10px', 'center');
      display.textContent = 'The number is too big';
      clearField = 1;
    }
}
// Every thousand have a , 
function controlThousands() {
  display.textContent = parseFloat(display.textContent.replace(/[^0-9-.]/g, '')).toLocaleString();
}

function controlLogSize() {
  while (log.textContent.length > 40) {
    log.textContent = log.textContent.slice(1);
  }
}

function isDididedByZero() {
  if (display.textContent == "Can't divide by zero") {
    displayProperties('25px', '10px', 'center');
    clearField = 1;
    return true;
  }
  return false;
}

function isTooBig() {
  if (display.textContent == "The number is too big" || display.textContent == "Infinity" || display.textContent == "-Infinity") {
    displayProperties('25px', '10px', 'center');
    clearField = 1;
    return true;
  }
  return false;
}


numberButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (isDididedByZero() || isTooBig()) reset();
    if (clearField == 1 || loopThis == 1) {
      resetDisplay ();
      clearField = 0;
      loopThis = 0; 
    }
    
    if (parseFloat(display.textContent.replace(/[^0-9-.]/g, '')) != '0') {
      display.textContent += btn.textContent;
      controlThousands();
      controlDisplaySize();
      if (display.textContent.length > 18) controlDisplaySize();
    } else if (display.textContent == '0') {
      display.textContent = btn.textContent;
    }	
  });	
});
  
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const division = document.getElementById('division');
const multiplication = document.getElementById('multiplication');
const equal = document.getElementById('equal');

let firstNumber = null;
let secondNumber = null;
let operator = null;
let secondNumberForLoop = null;
let accumulator = null;

function addOperation() {
    if (isDididedByZero() || isTooBig()) reset();
    if (firstNumber == null && secondNumber == null){
        firstNumber = parseFloat(display.textContent.replace(/[^0-9-.]/g, '')); 
        log.textContent += firstNumber + this.textContent;
        clearField = 1;
    } else if (firstNumber != null && secondNumber == null) {
        if (accumulator != null) {
          firstNumber = accumulator;
          accumulator = null ;
        }
        if ((clearField == 1 || loopThis == 1) && log.textContent != '') {
            log.textContent = log.textContent.slice(0, -3) + this.textContent;
        } else if (clearField == 1 && log.textContent == '') {
            log.textContent += firstNumber + this.textContent;
            secondNumberForLoop = null;
        } else if (clearField != 1) {
            secondNumber = parseFloat(display.textContent.replace(/[^0-9-.]/g, '')); 
            display.textContent = operate(firstNumber, secondNumber, log.textContent.slice(-3));
            if (isDididedByZero()) return;
            log.textContent +=  secondNumber + this.textContent;
            clearField = 1;
            firstNumber = parseFloat(display.textContent.replace(/[^0-9-.]/g, '')); 
            secondNumber = null;
      }
    }
    controlLogSize();
    controlThousands();
    controlDisplaySize();
};


let equalFunc = () => {
  if (isDididedByZero() || isTooBig()) reset();
  if (firstNumber != null && secondNumber == null && secondNumberForLoop == null ) {
      if (clearField == 0 && loopThis != 1 ) {
        secondNumber = parseFloat(display.textContent.replace(/[^0-9-.]/g, '')); 
        secondNumberForLoop = parseFloat(display.textContent.replace(/[^0-9-.]/g, ''));
        operator = log.textContent.slice(-3);
        display.textContent = operate(firstNumber, secondNumber, operator );
        if (isDididedByZero() || isTooBig()) return;
        controlThousands();
        controlDisplaySize();
        clearField = 1;
        firstNumber = parseFloat(display.textContent.replace(/[^0-9-.]/g, '')); 
        resetLog ();
        secondNumber = null;
      } else if (clearField == 1 || loopThis == 1) {
        if (accumulator != null) {
          display.textContent = operate(accumulator, firstNumber, log.textContent.slice(-3));
          log.textContent +=  firstNumber + log.textContent.slice(-3);
          controlLogSize();
        } else {4
          display.textContent = operate(firstNumber, firstNumber,log.textContent.slice(-3));
          log.textContent +=  firstNumber + log.textContent.slice(-3);
          controlLogSize();
        }
        if (isDididedByZero() || isTooBig()) return;
        controlDisplaySize();
        controlThousands();
        clearField = 0;
        loopThis = 1; 
        accumulator = parseFloat(display.textContent.replace(/[^0-9-.]/g, '')); 
        }
  } else if (display.textContent != null && firstNumber != null && secondNumber == null && secondNumberForLoop != null){
        display.textContent = operate(firstNumber, secondNumberForLoop, operator);
        if (isDididedByZero() || isTooBig()) return;
        controlDisplaySize();
        controlThousands();
        firstNumber = parseFloat(display.textContent.replace(/[^0-9-.]/g, '')); 
    }
};

let operations = {plus, minus, division, multiplication};
for (operator in operations) {
  operations[operator].addEventListener('click', addOperation);
};

equal.addEventListener('click', equalFunc);

const CE = document.getElementById('CE');
const C = document.getElementById('C');
const backspace = document.getElementById('backspace');

C.addEventListener('click', reset);
CE.addEventListener('click', resetDisplay);
backspace.addEventListener('click', () => {
  if (display.textContent.length == 1) {
    display.textContent = 0;
  } else {
  display.textContent = display.textContent.slice(0, -1)
  }
});