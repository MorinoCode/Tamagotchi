
// Variables for the dog's stats
let dogHealth = 100;
const dogHealthMinimum = 0;
const dogHealthMax = 100;

let dogTiredness = 0;
const dogTirednessMax = 100;
const dogTirednessMinimum = 0;

let dogHungry = 0;
const dogHungryMax = 100;
const dogHungryMinimum = 0;

let dogEntertainment = 100;
const dogEntertainmentMax = 100;
const dogEntertainmentMinimum = 0;

let money = 0;

let atPark = false;

let dogName = '';
const nameInput = document.querySelector('#nameInput');

// StartPage and gamePage
let startPage = document.querySelector('.startPage');
let gamePage = document.querySelector('.container');
let gameOverPage = document.querySelector('.gameOverPage');
let gameOverPageMessage = document.querySelector('#gameOverPage__message');

// Dog elements
let dog = document.querySelector("#dog");
let dogThoughts = document.querySelector('#dogThoughts');
let dogMessage = document.querySelector('#dogMessage');

// Status elements
let healthStatus = document.querySelector("#health");
let tirednessStatus = document.querySelector("#tiredness");
let hungryStatus = document.querySelector("#hungry");
let entertainmentStatus = document.querySelector("#entertainment");
let moneyStatus = document.querySelector('#money');

// Buttons
let submitName = document.querySelector('#submitBtn');
let startGameBtn = document.querySelector('#startGameBtn');
let gameOverBtn = document.querySelector('#gameOverPage__btn');
let sleepBtn = document.querySelector("#sleepBtn");
let workBtn = document.querySelector("#workBtn");
let foodBtn = document.querySelector("#foodBtn");
let parkBtn = document.querySelector("#parkBtn");

let healthBuy = document.querySelector('#healthPlus');
let hungryBuy = document.querySelector('#hungry-10');
let entertainmentBuy = document.querySelector('#entertainmentPlus');

// Display dog status
function updateStatus() {
  healthStatus.innerText = `Health : ${dogHealth}`;
  tirednessStatus.innerText = `Tiredness : ${dogTiredness}`;
  hungryStatus.innerText = `Hunger : ${dogHungry}`;
  entertainmentStatus.innerText = `Entertainment : ${dogEntertainment}`;
  moneyStatus.innerText = `Money : ${money} kr`;
}

// Manage health
function healthManage() {
  if (dogHealth > dogHealthMinimum) {
    dogHealth--;  
    updateStatus();  
  } else {
    gameOver();
  }
}


// Manage tiredness
function tirednessManage() {
  if (dogTiredness < dogTirednessMax) {
    dogTiredness++;  
    updateStatus();  
  } else {
    gameOver();
  }
}


/// Manage hunger
function hungryManage() {
  if (dogHungry < dogHungryMax) {
    dogHungry++;  
    updateStatus();  
  } else {
    gameOver();
  }
}


// Manage entertainment
function entertainmentManage() {
  if (dogEntertainment > dogEntertainmentMinimum) {
    dogEntertainment--;  
    updateStatus();  
  } else {
    gameOver();
  }
}



// Manage thoughts (ensure only one interval is running)
function thoughtsManage() {
  if (!atPark) {
  
      if (dogHealth < 50) {
        dogThoughts.src = './images/sad.png'; 
        dog.src = './images/sick.jpg';
        dogMessage.innerText = `So, tired , Need some Rest!`;
      } else if (dogHungry > 50) {
        dogThoughts.src = './images/hungry.svg'; 
        dog.src = './images/hungry.jpg';
        dogMessage.innerText = `I'm hungry Give me some Food`;
      } else if (dogTiredness > 50) {
        dogThoughts.src = './images/tired.webp'; 
        dog.src = './images/tired.jpg';
        dogMessage.innerText = 'So tired! Need some rest.';
      } else if (dogEntertainment < 50) {
        dogThoughts.src = './images/boring.svg'; 
        dogMessage.innerText = 'So boring! Need entertainment';
      } else {
        dogThoughts.src = './images/happy.svg';
        dogMessage.innerText = `I'm Happy!`;
        dog.src = './images/default.jpg';
      }
    
  }
}




// Handle the game over logic
function gameOver() {
  gameOverPage.style.display = 'flex';
  gameOverPageMessage.innerText = ` You killed me!`;
  gamePage.style.display = 'none';
}

// Reset game logic
function resetGame() {
  localStorage.clear();
  dogHealth = 100;
  dogTiredness = 0;
  dogHungry = 0;
  dogEntertainment = 100;
  money = 0;
  atPark = false;
  dogName = '';
  nameInput.value = ' ';
  updateStatus();
  

  gameOverPage.style.display = 'none';
  startPage.style.display = 'block';
  gamePage.style.display = 'none';
}

// Start game
function startGame() {
 setInterval(()=>{
  healthManage();
  tirednessManage();
  hungryManage();
  entertainmentManage();
  thoughtsManage();
  updateStatus();
  saveGame();
 },4000)
}


// Game Over Button listener to reset the game
gameOverBtn.addEventListener('click', () => {
  resetGame();
  startPage.style.display = 'block';
  gamePage.style.display = 'none';
});

// Check if the game has been played before
window.addEventListener('load', () => {
  const hasPlayedBefore = localStorage.getItem('hasPlayedBefore');

  if (hasPlayedBefore) {
    startPage.style.display = 'none';
    gamePage.style.display = 'grid';
    loadGame();
  } else {
    startPage.style.display = 'block';
    gamePage.style.display = 'none';
  }
});

// Submit Name Button
submitName.addEventListener('click', () => {
  
  dogName = nameInput.value.trim(); // Get the value and remove extra spaces
  nameInput.value = 'Name Saved!!'; // Clear the input field
});

// Start Game Button
startGameBtn.addEventListener('click', () => {
  localStorage.setItem('hasPlayedBefore', true);
  startPage.style.display = 'none';
  gamePage.style.display = 'grid';
  startGame();
});

// Sleep button
sleepBtn.addEventListener("click", () => {
  if (dogTiredness == dogTirednessMinimum) {
    tirednessStatus.innerText = `Tiredness : ${dogTiredness}`;
  } else if (dogTiredness < dogTirednessMax) {
    dogTiredness--;  // Decrease tiredness
    updateStatus();  // Update the status display
  } 
});


// Work button
workBtn.addEventListener("click", () => {
  if (dogTiredness <= dogTirednessMax) {
    tirednessStatus.innerText = `Tiredness : ${dogTiredness++}`;
    moneyStatus.innerText = `Money : ${money += 5}`;
    updateStatus()
  } 
});

// Feed button
foodBtn.addEventListener("click", () => {
  if (dogHungry == dogHungryMinimum) {
    hungryStatus.innerText = `Hunger : ${dogHungry}`;
  } else if (dogHungry < dogHungryMax) {
    dogHungry--; // Decrease hunger
    updateStatus()
  } 
});

// Park button
parkBtn.addEventListener("click", () => {
  if (dogHungry < 51 && dogHealth > 51 && dogTiredness < 51) {
    atPark = !atPark; 

    if (atPark) { 
      dog.src = './images/park.jpg';
      dogThoughts.src = './images/amusement-park.svg';
      dogMessage.innerText = `I'm Happy!`;
      parkBtn.disabled = true; 

      if (dogEntertainment < 95) {
        dogEntertainment += 15; 
      } else {
        dogEntertainment = 100;
      }

      setTimeout(() => {
        parkBtn.disabled = false;
        dog.src = './images/default.jpg'; 
        thoughtsManage(); 
      }, 10000); 
    } else { 
      dog.src = './images/default.jpg'; 
      thoughtsManage(); 
    }
  } else {
    parkBtn.innerText = 'Not now!!';
    setTimeout(() => {
      parkBtn.innerText = 'Go to Park(increases Entertainment)';
    }, 2000);
  }
});

// Health +10 button
healthBuy.addEventListener('click', () => {
  if (money >= 20) {
    dogHealth += 10;
    money -= 20;
    updateStatus()
    
  } else {
    healthBuy.innerText = 'Not enough Money';
    setTimeout(() => {
      healthBuy.innerText = 'Health +10 (20kr)';
    }, 3000);
  }
});

// Hunger -10 button
hungryBuy.addEventListener('click', () => {
  if (money >= 10) {
    dogHungry -= 10;
    money -= 10;
    updateStatus()
  } else {
    hungryBuy.innerText = 'Not enough Money';
    setTimeout(() => {
      hungryBuy.innerText = 'Hunger +10 (10kr)';
    }, 3000);
  }
});

// Entertainment +10 button
entertainmentBuy.addEventListener('click', () => {
  if (money >= 10) {
    dogEntertainment += 10;
    money -= 10;
    updateStatus()
  } else {
    entertainmentBuy.innerText = 'Not enough Money';
    setTimeout(() => {
      entertainmentBuy.innerText = 'Entertainment +10 (10kr)';
    }, 3000);
  }
});

// Save game to localStorage
function saveGame() {
  const gameState = {
    dogHealth,
    dogTiredness,
    dogHungry,
    dogEntertainment,
    money,
    atPark
  };
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Load game from localStorage
function loadGame() {
  const savedState = JSON.parse(localStorage.getItem('gameState'));

  if (savedState) {
    // Restore saved stats
    dogHealth = savedState.dogHealth;
    dogTiredness = savedState.dogTiredness;
    dogHungry = savedState.dogHungry;
    dogEntertainment = savedState.dogEntertainment;
    money = savedState.money;
    atPark = savedState.atPark;

    // Update the display
    updateStatus()

    dog.src = atPark ? './images/park.jpg' : './images/default.jpg';
    startGame()
    thoughtsManage(); 
  }
}


