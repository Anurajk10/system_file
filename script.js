const display = document.getElementById('result');

function appendToDisplay(value) {
    display.value += value;
}

function clearScreen() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        const result = evaluateExpression(display.value);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateScientific(operation) {
    const currentValue = display.value;
    try {
        let result;
        const evaluatedValue = evaluateExpression(currentValue);

        switch (operation) {
            case 'sqrt':
                result = Math.sqrt(evaluatedValue);
                break;
            case 'pow':
                appendToDisplay('**');
                return;
            case 'sin':
                result = Math.sin(evaluatedValue);
                break;
            case 'cos':
                result = Math.cos(evaluatedValue);
                break;
            case 'tan':
                result = Math.tan(evaluatedValue);
                break;
            case 'log':
                result = Math.log10(evaluatedValue);
                break;
            case 'ln':
                result = Math.log(evaluatedValue);
                break;
            default:
                return;
        }
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function evaluateExpression(expression) {
    // Performance Optimization: Replaced 'new Function()' with a custom parser.
    // This avoids the overhead of runtime compilation for every evaluation.
    // This is a simple implementation of the Shunting-yard algorithm.
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '**': 3
    };

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function isOperator(op) {
        return op in precedence;
    }

    function applyOp(operators, values) {
        const op = operators.pop();
        const b = values.pop();
        const a = values.pop();
        switch (op) {
            case '+':
                return values.push(a + b);
            case '-':
                return values.push(a - b);
            case '*':
                return values.push(a * b);
            case '/':
                if (b === 0) throw new Error("Division by zero");
                return values.push(a / b);
            case '**':
                return values.push(Math.pow(a, b));
        }
    }

    expression = expression.replace(/Math.PI/g, Math.PI.toString());

    const values = [];
    const ops = [];
    // Adjusted regex to capture negative numbers at the start of an expression or after an operator.
    const tokens = expression.match(/(-?\d+\.?\d*|\+|\-|\*|\/|\*\*|\(|\))/g);

    if (!tokens) {
        throw new Error('Invalid expression');
    }

    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i].trim();
        let prevToken = i > 0 ? tokens[i-1].trim() : null;

        // Logic to handle unary minus.
        if (token === '-' && (prevToken === null || isOperator(prevToken) || prevToken === '(')) {
            // It's a unary minus, combine it with the next number.
            if(i + 1 < tokens.length && isNumeric(tokens[i+1])) {
                values.push(parseFloat(token + tokens[i+1]));
                i++; // Skip the next token since we've consumed it.
            } else {
                throw new Error("Invalid expression: unary minus not followed by a number.");
            }
        } else if (isNumeric(token)) {
            values.push(parseFloat(token));
        } else if (token === '(') {
            ops.push(token);
        } else if (token === ')') {
            while (ops.length > 0 && ops[ops.length - 1] !== '(') {
                applyOp(ops, values);
            }
            if (ops.length === 0) throw new Error("Mismatched parentheses");
            ops.pop(); // Pop '('.
        } else if (isOperator(token)) {
            while (ops.length > 0 && precedence[ops[ops.length - 1]] >= precedence[token]) {
                applyOp(ops, values);
            }
            ops.push(token);
        }
    }

    while (ops.length) {
        applyOp(ops, values);
    }

    if(values.length > 1 || ops.length > 0) {
        throw new Error("Invalid expression");
    }

    return values[0];
}
