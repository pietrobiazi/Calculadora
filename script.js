const display = document.getElementById('display');
const buttons = document.querySelectorAll('.keys button');

let currentInput = '';

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function appendValue(value) {
  currentInput += value;
  updateDisplay();
}

function clearInput() {
  currentInput = '';
  updateDisplay();
}

function calculate() {
  try {
    // Replace √ with Math.sqrt and ^ with **
    let expression = currentInput
      .replace(/√/g, 'Math.sqrt')
      .replace(/\^/g, '**');
    currentInput = eval(expression).toString();
  } catch (e) {
    currentInput = 'Error';
  }
  updateDisplay();
}

// Mouse clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    if (value) appendValue(value);
    if (button.id === 'equals') calculate();
    if (button.id === 'clear') clearInput();
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  let key = e.key;
  const btn = Array.from(buttons).find(
    b => b.getAttribute('data-value') === key || 
         (key === 'Enter' && b.id === 'equals') || 
         (key === ' ' && b.id === 'clear') ||
         (key === 'r' && b.getAttribute('data-value') === '√') // r for square root
  );

  if (btn) btn.classList.add('active'); // Highlight button

  if (key >= '0' && key <= '9') appendValue(key);
  else if ('+-*/.'.includes(key)) appendValue(key);
  else if (key === '^') appendValue('^');
  else if (key === 'Enter') calculate();
  else if (key === 'Backspace') currentInput = currentInput.slice(0, -1);
  else if (key === ' ' || key.toLowerCase() === 'c') clearInput();
  else if (key.toLowerCase() === 'r') appendValue('√');

  updateDisplay();
});

document.addEventListener('keyup', (e) => {
  const btn = Array.from(buttons).find(
    b => b.getAttribute('data-value') === e.key || 
         (e.key === 'Enter' && b.id === 'equals') || 
         (e.key === ' ' && b.id === 'clear') ||
         (e.key.toLowerCase() === 'r' && b.getAttribute('data-value') === '√')
  );
  if (btn) btn.classList.remove('active'); // Remove highlight
});