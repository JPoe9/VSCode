async function getRandomJoke() {
  let jokeResponse, jokeContent; 
  try { 
    jokeResponse = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode&lang=en');
    jokeContent = await jokeResponse.json();
  }
  catch(error) { console.log(error); }

  return jokeContent;
}

getRandomJoke();

async function getRandomExcuse(){
  let  excuseResponse,excuseJson;
  try{
    excuseResponse = await fetch("https://excuser-three.vercel.app/v1/excuse");
    excuseJson = await excuseResponse.json();
  }catch(error){console.log(error); 
                return "My alarm did not go off in time to come up with an excuse!";}

  return excuseJson[0].excuse;
}

async function getRandomTrivia() {
  let trivia;
  try {
    const triviaResponse = await fetch("https://opentdb.com/api.php?amount=1");
    trivia = await triviaResponse.json();
  } catch(error) { console.error(error) };

  return trivia;
}

function formatJoke(jokeContent) {
  const randomJokeCard = document.getElementById("joke-card");
  const randomJokePt1 = document.querySelector("#random-joke");
  
  if(jokeContent.type === "single") {
    randomJokePt1.innerText = jokeContent.joke;
  } else {
    const randomJokePt2 = document.createElement("p");
    const showDeliveryBtn = document.createElement("input");
    randomJokePt1.innerText = jokeContent.setup;
    randomJokePt2.classList.add("card-text", "hidden");
    randomJokePt2.innerText = jokeContent.delivery;
    showDeliveryBtn.id = "show-delivery";
    showDeliveryBtn.type = "button";
    showDeliveryBtn.value = "Show Punchline";
    showDeliveryBtn.classList.add("btn", "btn-primary");
    showDeliveryBtn.addEventListener("click", () => {
      randomJokePt2.classList.remove("hidden");
      showDeliveryBtn.remove();
    })

    randomJokeCard.append(randomJokePt2, showDeliveryBtn);
  }
}

function displayDailyRandoms(){
  const randomExcuseObj = document.querySelector("#random-excuse");
  const randomTriviaObj = document.getElementById("random-trivia");

  Promise.all([getRandomJoke(),getRandomExcuse(),getRandomTrivia()])
  .then((results)=>{
    formatJoke(results[0]);
    randomExcuseObj.innerText =  results[1];
    randomTriviaObj.innerText = results[2];
  })
}

displayDailyRandoms();

let submit_button = document.getElementById("submitbutton");
submit_button.addEventListener('click', function(event){
const newPTag = document.createElement('p');
newPTag.innerText = "Thank you for the suggestion";
newPTag.classList.add("tracker");
document.body.append(newPTag);
})
