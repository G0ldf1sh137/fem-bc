let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) { 
  
  if (isNaN(value)) {
    // Button pressed is not a number
    handleSymbol(value);
  } else {
    // button pressed is a number
    handleNumber(value);
  }
  // Update screen
  screen.innerText = buffer;
}

function handleSymbol(symbol) { 
  switch (symbol) {
    case 'C':
      // clear buffer and runningTotal
      buffer = "0";
      runningTotal = 0;
      break;
    case '=':
      if (previousOperator === null) {
        // you need 2 numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case '+':
    case '−':
    case '×':
    case '÷':
      handleMath(symbol);
      break;
    case '←':
      if (buffer.length === 1) {
        // 1 digit in buffer resets buffer to 0
        buffer = "0";
      } else {
        // otherwise remove last digit from buffer
        buffer = buffer.slice(0,buffer.length-1);
      }
      break;
    default:
      break;
  }
}

function handleMath(symbol){
  // do nothing if buffer is empty
  if (buffer === '0')
    return;

  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    // if no running total, write current intBuffer
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  // store operation and clear buffer
  previousOperator = symbol;
  buffer = '0';
}

function handleNumber(numberString) { 
  if (buffer === "0") {
    // if 0 overwrite
    buffer = numberString;
  } else {
    // else append latest button pressed
    buffer += numberString;
  }
}

function flushOperation(intBuffer) {
  console.log('flushOperation', previousOperator);
  if (previousOperator === '+') {
    runningTotal += intBuffer;
  } else if (previousOperator === '−') {
    runningTotal -= intBuffer;
  } else if (previousOperator === '×') {
    runningTotal *= intBuffer;
  } else if (previousOperator === '÷') {
    runningTotal /= intBuffer;
  }
  buffer = '0';
  console.log('Running total: ' + runningTotal);
}

function init() {
  // Add an event listener to .calc-buttons
  // pass along text of button pressed to the event handler
  document.querySelector('.calc-buttons')
    .addEventListener(
      'click',
      event => buttonClick(event.target.innerText)
    );
}

init();