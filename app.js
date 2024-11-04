// Variabler till hundens
let dogHealth = 100;
let dogHealthMinimum = 0;
let dogHealthMax = 100;

let dogTiredness = 0;
let dogTirednessMax = 100;
let dogTirednessMinimum = 0;

let dogHungry = 0;
let dogHungryMax = 100;
let dogHungryMinimum = 0;

// Varibaler till html element

//Status
let healthStatus = document.querySelector("#health");
let tirednessStatus = document.querySelector("#tiredness");
let hungryStatus = document.querySelector("#hungry");

//hunden
let dog = document.querySelector("#dog");

//knappar
let sleepBtn = document.querySelector("#sleepBtn");
let workBtn = document.querySelector("#workBtn");
let foodBtn = document.querySelector("#foodBtn");

//Datum
let date = new Date();
console.log(date);

//visa hundens status
healthStatus.innerText = `Hälsa : ${dogHealth}`;
tirednessStatus.innerText = `Trötthet : ${dogTiredness}`;
hungryStatus.innerText = `Hungrighet : ${dogHungry}`;

//hantera hälsa
function healthManage() {
  const intervalId = setInterval(() => {
    if (dogHealth > dogHealthMinimum) {
      healthStatus.innerText = `Hälsa : ${dogHealth--}`;
    } else {
      console.log("hunden dog");
      clearInterval(intervalId); // Stops the interval when dogTiredness reaches the max
    }
  }, 2000);
}

healthManage();

//hantera trötthet
function tirednessManage() {
  const intervalId = setInterval(() => {
    if (dogTiredness < dogTirednessMax) {
      tirednessStatus.innerText = `Trötthet : ${dogTiredness++}`;
    } else {
      console.log("hunden dog");
      clearInterval(intervalId);
    }
  }, 2000);
}

tirednessManage();

//hantera hungrighet
function hungryManage() {
  const intervalId = setInterval(() => {
    if (dogHungry < dogHungryMax) {
      hungryStatus.innerText = `Hungrighet : ${dogHungry++}`;
    } else {
      console.log("hunden dog");
      clearInterval(intervalId); // Stops the interval when dogTiredness reaches the max
    }
  }, 2000);
}

hungryManage();

//sovBtn
sleepBtn.addEventListener("click", () => {
  if (dogHealth < dogHealthMax) {
    healthStatus.innerText = `Hälsa : ${dogHealth++}`;
  } else if (dogHealth == dogHealthMax) {
    healthStatus.innerText = `Hälsa : ${dogHealth}`;
  } else {
    healthStatus.innerText = `Hälsa : Hunden dog.`;
  }
});

//jobbBtn
workBtn.addEventListener("click", () => {
  if (dogTiredness == dogTirednessMinimum) {
    tirednessStatus.innerText = `Trötthet : ${dogTiredness}`;
  } else if (dogTiredness < dogTirednessMax) {
    tirednessStatus.innerText = `Trötthet : ${dogTiredness--}`;
  } else {
    tirednessStatus.innerText = `Trötthet : Hunden dog.`;
  }
});

//mataBtn
foodBtn.addEventListener("click", () => {
  if (dogHungry == dogHungryMinimum) {
    hungryStatus.innerText = `Hungrighet : ${dogHungry}`;
  } else if (dogHungry < dogHungryMax) {
    hungryStatus.innerText = `Hungrighet : ${dogHungry--}`;
  } else {
    hungryStatus.innerText = `Hungrighet : Hunden dog.`;
  }
});
