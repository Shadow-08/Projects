let total=0, buffer="0", prevOperator;

const screen = document.querySelector('.screen');

function buttonClick(val) {
    if(isNaN(val))
        handleSymbol(val);
    else
        handleNumber(val);
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'C':
            buffer = '0';
            total = 0;
            break;
        
        case '=':
            if(prevOperator === null)
                return;

            flushOperation(parseInt(buffer));
            prevOperator = null;
            buffer = total;
            total = 0;
            break;
        
        case '←':
            if(buffer.length === 1)
                buffer = '0';
            else
                buffer = buffer.substring(0, buffer.length-1);
            break;

        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if(buffer === '0')
        return;

    const intBuffer = parseInt(buffer);

    if(total === 0)
        total = intBuffer;
    else
        flushOperation(intBuffer);

    prevOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if(prevOperator === '+')
        total += intBuffer;
    else if(prevOperator === '−')
        total -= intBuffer;
    else if(prevOperator === '×')
        total *= intBuffer;
    else if(prevOperator === '÷')
        total /= intBuffer;
}

function handleNumber(string) {
    if(buffer === '0')
        buffer = string;
    else
        buffer += string;
}

function init() {
    document.querySelector('.buttons').addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    });
}

init();
