const gameContainer = document.getElementById("game");
let noClick = false;
let cardA = null;
let cardB = null;
let flippedCards = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  if(noClick) return;
  if(event.target.classList.contains("flipped"))return;

  let chosenCard = event.target;
  chosenCard.style.backgroundColor = chosenCard.classList[0];
  if(!cardA || !cardB) {
    chosenCard.classList.add("flipped");
    cardA = cardA || chosenCard;
    cardB = chosenCard === cardA ? null : chosenCard;
  }

  if(cardA && cardB){
    noClick = true;
    // Debug
    let cardColorA = cardA.className;
    let cardColorB = cardB.className;
    
    console.log("colorA", cardColorA)
    console.log("colorB", cardColorB)

    if(cardColorA === cardColorB){
      
      flippedCards += 2;
      cardA.removeEventListener("click", handleCardClick);
      cardB.removeEventListener("click", handleCardClick);
      //?
      
      cardA = null;
      cardB = null;
      noClick = false;
      // alert("It's a Match!! :)")
    }

    
    else {
      
      setTimeout(function(){
        cardA.style.backgroundColor = "";
        cardB.style.backgroundColor = "";
        cardA.classList.remove("flipped");
        cardB.classList.remove("flipped");
        //?
        // alert("Not a Match! Try again")
        cardA = null;
        cardB = null;
        noClick = false;
      }, 1000);
    }

  }
  if(flippedCards === COLORS.length) alert("Game Over!");
}

// when the DOM loads
createDivsForColors(shuffledColors);
