let numerator = 0;
let denominator = 0;
let fractions = [];
let randomNum = '';

// Function to generate a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createFractionElement(fraction, index) {
      const fractionElement = document.createElement('div');
      fractionElement.className = 'fraction';
      console.log(index);
      // Create the fraction display with separate divs for numerator and denominator
      fractionElement.innerHTML = `
      <div class="options">
          <label>
              <input type="checkbox" id="fraction${index}" onclick="checkAnswer(${index})">
          </label>
          <div>
              <div class="numerator">${fraction.numerator}</div>
              <div class="denominator">${fraction.denominator}</div>
          </div>
      </div>
      `;

      return fractionElement;
}

function checkAnswer(index){
  let answer = document.querySelector('p');
  if (index == randomNum){
    answer.innerHTML = `<p>Correct!</p>`;
  } else answer.innerHTML = `<p>Try again!</p>`;
}

// Function to create and display random proper fractions
function displayRandomFractions() {
    // Generate 4 random proper fractions
    for (let i = 0; i < 4; i++) {
        denominator = getRandomInt(2, 10);  // Denominator between 2 and 10
        numerator = getRandomInt(1, denominator - 1);  // Numerator must be less than the denominator
        fractions.push({ numerator, denominator });
    }

    const container = document.getElementById('fractions-container');
    container.innerHTML = '';  // Clear previous content

    // Display each fraction
    fractions.forEach((item, index) => {
      let fractionElement = document.createElement('div');
      fractionElement.className = 'fraction';

      const numerator = document.createElement('div');
      numerator.className = 'numerator';
      numerator.textContent = item.numerator;

      const denominator = document.createElement('div');
      denominator.className = 'denominator';
      denominator.textContent = item.denominator;

      fractionElement.appendChild(numerator);
      fractionElement.appendChild(denominator);
      fractionElement = createFractionElement(item, index);

      container.appendChild(fractionElement);
    });
    createDivParts();
}

// Function to check if number is a perfect square
function isSquareNumber(num) {
    const sqrt = Math.sqrt(num);
    return sqrt === Math.floor(sqrt);
}

function createDivParts() {
    const container = document.getElementById('container');
    container.innerHTML = ''; // Clear existing content
    randomNum = getRandomInt(0, 3);

    numerator = fractions[randomNum].numerator;
    denominator = fractions[randomNum].denominator;

    // Check if it's a square number
    if (isSquareNumber(denominator)) {
              // Remove flex class if it exists
              container.className = 'container';
              
              // Calculate grid dimensions
              const gridSize = Math.sqrt(denominator);
              container.style.display = 'grid';
              container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
              container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
          } else {
              // Use flex layout
              container.className = 'container flex-container';
              container.style.display = 'flex';
              container.style.gridTemplateColumns = ''; // Clear grid styles
              container.style.gridTemplateRows = '';
          }

      // Create parts
      for (let i = 1; i <= denominator; i++) {
          const part = document.createElement('div');
          part.className = 'part';
          part.textContent = `Part ${i}`;

          // Apply colors: parts 1-3 blue, part 4 gray
          if (i <= numerator) {
              part.classList.add('colored-part');
          }else {
              part.classList.add('default-part');
          }

          container.appendChild(part);
      }

}

// Call the function to display random proper fractions
displayRandomFractions();
