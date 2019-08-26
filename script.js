let add = (a,b) => (a + b);

let substract = (a, b) => (a - b); 

let multiply = (a, b) => (a * b);

let divide = (a,b) => {
  if (b == 0) return "Can't divide by zero"
  return a / b; 
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
  showValues('reset');
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

function showValues(ping = '') {
  console.table([['firstNumber',firstNumber],['secondNumber', secondNumber] , ['clearField', clearField],['loopThis', loopThis] ,['secondNumberForLoop', secondNumberForLoop], ['accumulator', accumulator],['operator',operator], ['x', ping]])
}

numberButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (isDididedByZero() || isTooBig()) reset();
    showValues('n1');
    if (clearField == 1 || loopThis == 1) {
      if (display.textContent != '0.') resetDisplay ();
      clearField = 0;
      loopThis = 0; 
      if (secondNumberForLoop != null && firstNumber != null) {
        secondNumberForLoop = null;
        firstNumber = null;
      }
      showValues('n2');
    }
    if (parseFloat(display.textContent) != '0' || display.textContent.search(/\./g) != -1) {
      display.textContent += btn.textContent;
      controlDisplaySize();
      showValues('n3');
      if (display.textContent.length > 18) controlDisplaySize();
    } else if (parseFloat(display.textContent) == '0' && display.textContent.search(/\./g) == -1) {
      display.textContent = btn.textContent;
      showValues('n4');
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
    showValues('o1');
    if (firstNumber == null && secondNumber == null){
        firstNumber = parseFloat(display.textContent); 
        log.textContent += firstNumber + this.textContent;
        clearField = 1;
        showValues('o2');
    } else if (firstNumber != null && secondNumber == null) {
      showValues('o3');
        if (accumulator != null) {
          firstNumber = accumulator;
          accumulator = null ;
        }
        showValues('o4');
        if ((clearField == 1 || loopThis == 1) && log.textContent != '') {
            log.textContent = log.textContent.slice(0, -3) + this.textContent;  
            showValues('o5');           
        } else if (clearField == 1 && log.textContent == '') {             
            log.textContent += firstNumber + this.textContent;
            secondNumberForLoop = null;            
            showValues('o6');        
        } else if (clearField != 1) {            
            secondNumber = parseFloat(display.textContent); 
            showValues('o7'); 
            display.textContent = operate(firstNumber, secondNumber, log.textContent.slice(-3));            
            if (isDididedByZero()) return;
            log.textContent +=  secondNumber + this.textContent; 
            clearField = 1;
            firstNumber = parseFloat(display.textContent); 
            secondNumber = null;
            showValues('o8');   
            
      }
    }
    controlLogSize();
    
    controlDisplaySize();
};


let equalFunc = () => {
  if (isDididedByZero() || isTooBig()) reset();
  showValues('e1');   
  if (firstNumber != null && secondNumber == null && secondNumberForLoop == null ) {
      if (clearField == 0 && loopThis != 1 ) {
        showValues('e2');  
        secondNumber = parseFloat(display.textContent); 
        secondNumberForLoop = parseFloat(display.textContent);
        operator = log.textContent.slice(-3);
        showValues('e3');  
        display.textContent = operate(firstNumber, secondNumber, operator );
        if (isDididedByZero() || isTooBig()) return;
        clearField = 1;
        firstNumber = parseFloat(display.textContent);
        showValues('e4');   
        resetLog ();
        secondNumber = null;
        showValues('e5');  
      } else if (clearField == 1 || loopThis == 1) {
        showValues('e6');  
        if (accumulator != null) {
          display.textContent = operate(accumulator, firstNumber, log.textContent.slice(-3));
          log.textContent +=  firstNumber + log.textContent.slice(-3);
          showValues('e7');  
        } else {
          if (display.textContent.slice(0,1) == '-') {
            display.textContent = operate(firstNumber, -firstNumber,log.textContent.slice(-3));
            firstNumber = -firstNumber;
            log.textContent +=  firstNumber + log.textContent.slice(-3)
            showValues('e8');  
          } else {
            display.textContent = operate(firstNumber, firstNumber,log.textContent.slice(-3));
            log.textContent +=  firstNumber + log.textContent.slice(-3)
            showValues('e9'); 
          }
        }
        if (isDididedByZero() || isTooBig()) return;
        clearField = 0;
        loopThis = 1; 
        accumulator = parseFloat(display.textContent); 
        showValues('e10');  
        }
  }  else if (display.textContent != null && firstNumber != null && secondNumber == null && secondNumberForLoop != null){
        display.textContent = operate(firstNumber, secondNumberForLoop, operator);
        if (isDididedByZero() || isTooBig()) return;
        firstNumber = parseFloat(display.textContent); 
        showValues('e11');  
    }
    controlLogSize();
    
    controlDisplaySize();
};

let operations = {plus, minus, division, multiplication};
for (operator in operations) {
  operations[operator].addEventListener('click', addOperation);
};

equal.addEventListener('click', equalFunc);

const CE = document.getElementById('CE');
const C = document.getElementById('C');
const backspace = document.getElementById('backspace');
const plusMinus = document.getElementById('plusMinus');
const dot = document.getElementById('dot');
//const percent = document.getElementById('percent');
//const sqrt = document.getElementById('sqrt');
//const sqr = document.getElementById('sqr');
//const fraction = document.getElementById('fraction');

C.addEventListener('click', reset);
CE.addEventListener('click', resetDisplay);
backspace.addEventListener('click', () => {
  if (display.textContent.length == 1) {
    display.textContent = 0;
  } else {
  display.textContent = display.textContent.slice(0, -1)
  }
});

plusMinus.addEventListener('click', () => {
  if (display.textContent == 0) {
      return;
  } else if (display.textContent != 0 && display.textContent.slice(0,1) == '-') {
      display.textContent = display.textContent.slice(1);   
  } else {
      display.textContent = '-' + display.textContent;    
  }
  if (secondNumberForLoop != null || accumulator != null) {
      secondNumberForLoop = secondNumberForLoop - (2 * secondNumberForLoop);
      accumulator = accumulator - (2 * accumulator);
  }
});

dot.addEventListener('click', () => {
  if (display.textContent.search(/\./g) == -1 && clearField == 0) {
      display.textContent += '.';   
  } else if (clearField == 1 && log.textContent != '' || clearField == 1 && secondNumberForLoop != null || clearField == 1 && accumulator != null)  {
      display.textContent = '0.';    
      clearField = 0;
  }
});