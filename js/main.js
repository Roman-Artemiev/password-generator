const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

lengthMinus.onclick = function () {
    lengthEl.value--;
    lengthCounter.innerHTML = lengthEl.value;
}

lengthPlus.onclick = function () {
    lengthEl.value++;
    lengthCounter.innerHTML = lengthEl.value;
}

lengthEl.oninput = function () {
    lengthCounter.innerHTML = lengthEl.value;
};

function password() {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked ;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
};

generateEl.onclick = () => {
    password();
};

password();

copy.onclick = () => {
    navigator.clipboard.writeText(resultEl.value);
};

tippy('#copy', {
    content: 'Copied',
    trigger: 'click',
  });

change.onclick = () => {
    password();
    change.style.transform += 'rotate(360deg)';
};

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    // Doesn't have a selected type
    if (typesCount === 0) {
        return '';
    }

    // create a loop
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
	
    const finalPassword = generatedPassword.slice(0, length);
    resultEl.value = finalPassword;
    // password();
    return finalPassword;
};

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}