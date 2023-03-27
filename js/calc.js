const screen = document.getElementById('calc-screen')
const buttons = [...document.getElementsByClassName('calc-button')];
let current = document.getElementById('current');
let old = document.getElementById('old');
let operators = ['+', '-', '×', '÷'];
buttons.forEach(element => {
    element.addEventListener('click', buttonLogic);
});
let operator = null;
// The calculator behaves differently after its first calculation has finished (i.e. now if "+" is input, it adds the next number entered after another operation is input (such as "=" or "-"))
let initialized = false;
// This stores an operator for the process explained in the last comment
let oldOperator = null;
// Checks if the last thing input was a number. Prevents erroneous behavior with entering one operator after another, etc.
let numInput = false;
// Changes number input behavior: allows addition of digits to the "current" string after initialization
let firstInitDigit = false;

// Event handlers
function buttonLogic() {
    if (Number(this.innerHTML) / 0 == 'Infinity' || this.innerHTML == '0') {
        numHandler(Number(this.innerHTML));
    }
    if (operators.includes(this.innerHTML)) {
        compute(this.innerHTML);
    }
    switch (this.innerHTML) {
        case 'C':
            current.innerHTML = 0;
            operator = null;
            numInput = false;
            break;
        case 'AC':
            current.innerHTML = 0;
            old.innerHTML = 0;
            operator = null;
            oldOperator = null;
            numInput = false;
            initialized = false;
            firstInitDigit = false;
            break;
        case '=':
            if (initialized && firstInitDigit) {
                switch (oldOperator) {
                    case '+':
                        add();
                        firstInitDigit = false;
                        return;
                    case '-':
                        subtract();
                        firstInitDigit = false;
                        return;
                    case '×':
                        multiply();
                        firstInitDigit = false;
                        return;
                    case '÷':
                        divide();
                        firstInitDigit = false;
                        return;
                }
            }
            if (operator && numInput) {
                switch (operator) {
                    case '+':
                        add();
                        initialized = true;
                        return;
                    case '-':
                        subtract();
                        initialized = true;
                        return;
                    case '×':
                        multiply();
                        initialized = true;
                        return;
                    case '÷':
                        divide();
                        initialized = true;
                        return; 
                }
            }
        case '.':
            if (current.innerHTML.includes('.')) {
                return;
            } else {
                current.innerHTML += '.';
                return;
            }
        case '+/-':
            if (current.innerHTML === '0') {
                return;
            }
            if (current.innerHTML[0] === '-') {
                current.innerHTML = current.innerHTML.slice(1);
                return;
            } else {
                current.innerHTML = '-' + current.innerHTML;
                return;
            }
    }
}

function numHandler(n) {
    numInput = true;
    // Allows chaining of digits in the current segment after a calculation
    if (firstInitDigit) {
        if (current.innerHTML === '0') {
            current.innerHTML = n;
            return;
        } else {
            current.innerHTML += n;
            return;
        }
    }
    // Get new digits in the current segment after a calculation
    if (initialized && this.innerHTML !== '0') {
        old.innerHTML = current.innerHTML;
        current.innerHTML = n;
        firstInitDigit = true;
        return;
    }
    if (current.innerHTML === '0') {
        current.innerHTML = n;
    } else {
        current.innerHTML += n;
    }
}

function compute(o) {
    // Handle the switching of operators post-initialization
    if (numInput === false && initialized) {
        oldOperator = o;
        return;
    }
    // Handle the switching of operators pre-initialization
    if (numInput === false) {
        operator = o;
        return;
    }
    // Handles the first input
    if (operator === null) {
        operator = o;
        old.innerHTML = current.innerHTML;
        current.innerHTML = 0;
        // Changes the state to follow that the last thing input was not a number
        numInput = false;
        return;
    } else if (initialized === false && operator !== null) {
        // Handles the second operator input/prepares the calculator to behave differently
        oldOperator = o;
        switch (operator) {
            case '+':
                add();
                initialized = true;
                return;
            case '-':
                subtract();
                initialized = true;
                return;
            case '×':
                multiply();
                initialized = true;
                return;
            case '÷':
                divide();
                initialized = true;
                return;
        }
    }
    // Initialized: computation now begins after the input of another string of digits and the next operator input
    if (initialized && firstInitDigit) {
        switch (oldOperator) {
            case '+':
                add();
                firstInitDigit = false;
                oldOperator = o;
                return;
            case '-':
                subtract();
                firstInitDigit = false;
                oldOperator = o;
                return;
            case '×':
                multiply();
                firstInitDigit = false;
                oldOperator = o;
                return;
            case '÷':
                divide();
                firstInitDigit = false;
                oldOperator = o;
                return;
        }
    }
}

function add() {
    current.innerHTML = Number(old.innerHTML) + Number(current.innerHTML);
    old.innerHTML = 0;
    numInput = false;
}

function subtract() {
    current.innerHTML = Number(old.innerHTML) - Number(current.innerHTML);
    old.innerHTML = 0;
    numInput = false;
}

function multiply() {
    current.innerHTML = Number(old.innerHTML) * Number(current.innerHTML);
    old.innerHTML = 0;
    numInput = false;
}

function divide() {
    current.innerHTML = Number(old.innerHTML) / Number(current.innerHTML);
    old.innerHTML = 0;
    numInput = false;
}