const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const lowerInput = document.getElementById("lower");
const upperInput = document.getElementById("upper");
const digitsInput = document.getElementById("digits");
const symbolsInput = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const passwordEl = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function choice(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function shuffle(str) {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

function selectedSets() {
  const sets = [];
  if (lowerInput.checked) sets.push(SETS.lower);
  if (upperInput.checked) sets.push(SETS.upper);
  if (digitsInput.checked) sets.push(SETS.digits);
  if (symbolsInput.checked) sets.push(SETS.symbols);
  return sets;
}

function generatePassword() {
  const length = Number(lengthInput.value);
  const sets = selectedSets();

  if (sets.length === 0) {
    passwordEl.textContent = "Select at least one set";
    updateStrength(0, 0);
    return;
  }

  const chars = sets.join("");
  let pwd = "";

  // Ensure at least one from each selected set
  sets.forEach((set) => {
    pwd += choice(set);
  });

  while (pwd.length < length) {
    pwd += choice(chars);
  }

  pwd = shuffle(pwd).slice(0, length);
  passwordEl.textContent = pwd;
  updateStrength(length, sets.length);
}

function updateStrength(length, variety) {
  const score = Math.min(100, length * 4 + variety * 15);
  strengthFill.style.width = `${score}%`;

  let label = "Weak";
  if (score >= 70) label = "Strong";
  else if (score >= 45) label = "Good";
  else if (score >= 25) label = "Fair";

  strengthText.textContent = `Strength: ${label}`;
}

function copyPassword() {
  const value = passwordEl.textContent;
  if (!value || value === "Tap Generate" || value === "Select at least one set") {
    return;
  }
  navigator.clipboard.writeText(value).then(() => {
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 900);
  });
}

function shufflePassword() {
  const value = passwordEl.textContent;
  if (!value || value === "Tap Generate" || value === "Select at least one set") {
    generatePassword();
    return;
  }
  passwordEl.textContent = shuffle(value);
}

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

[lowerInput, upperInput, digitsInput, symbolsInput].forEach((el) => {
  el.addEventListener("change", generatePassword);
});

generateBtn.addEventListener("click", generatePassword);
shuffleBtn.addEventListener("click", shufflePassword);
copyBtn.addEventListener("click", copyPassword);

lengthValue.textContent = lengthInput.value;
updateStrength(0, 0);
