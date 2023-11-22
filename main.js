async function getRandomJoke() {
  let jokeResponse, jokeContent; 
  try { 
    jokeResponse = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode&lang=en');
    jokeContent = await jokeResponse.json();
  }
  catch(error) { console.log(error); }

  return jokeContent;
}

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

function decode(encoded) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = encoded;
  return textArea.value;
}

function formatJoke(jokeContent) {
  const randomJokeCard = document.getElementById("joke-card");
  const randomJokePt1 = document.querySelector("#random-joke");
  console.log(jokeContent);
  if(jokeContent.type === "single") {
    randomJokePt1.innerText = jokeContent.joke;
  } else if(jokeContent.type === "twopart") {
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

function formatTrivia(triviaContent){
  const randomTriviaObj = document.getElementById("random-trivia");
  const randomTriviaCard = document.getElementById("trivia-card")
  randomTriviaObj.innerText = decode(triviaContent.results[0].question);
  let answerArray = [];
  if(triviaContent.results[0].type == "boolean"){
    const answerOption1 = document.createElement("input");
    const answerOption2 = document.createElement("input");
    const trueLabel = document.createElement("label");
    const falseLabel = document.createElement("label");
    trueLabel.innerText = "True";
    answerOption1.type = "radio";
    answerOption1.name = "answerOption";
    answerOption1.value = "True";
    falseLabel.innerText = "False"; 
    answerOption2.type = "radio";
    answerOption2.name = "answerOption";
    answerOption2.value = "False";
    trueLabel.prepend(answerOption1);
    falseLabel.prepend(answerOption2);
    randomTriviaCard.append(trueLabel,falseLabel);
  }else{
    for(let option of triviaContent.results[0].incorrect_answers){
      answerArray.push(option);
    }
    answerArray.push(triviaContent.results[0].correct_answer);
    while(answerArray.length){
      let answerOption = document.createElement("input");
      let answerLabel = document.createElement("label");
      answerOption.type = "radio";
      answerOption.name = "answerOption";
      let randomElementIndex = Math.floor(Math.random() * answerArray.length);
      answerOption.value = answerArray[randomElementIndex];
      answerLabel.innerText = decode(answerArray[randomElementIndex]);
      answerLabel.prepend(answerOption);
      answerArray.splice(randomElementIndex,1);
      randomTriviaCard.appendChild(answerLabel);
    }
  }
  const checkAnswerBtn = document.createElement("input");
  checkAnswerBtn.type = "button";
  checkAnswerBtn.value = "Check Answer";
  checkAnswerBtn.classList.add("btn", "btn-primary");
  checkAnswerBtn.addEventListener("click",()=>{
    const userAnswer = document.querySelector("input[name=answerOption]:checked").value;
    const answerTag = document.getElementById("answer-tag");
    console.log(triviaContent);
    if(userAnswer === triviaContent.results[0].correct_answer){
      answerTag.innerText = `It is ${decode(triviaContent.results[0].correct_answer)}. You got the right answer! `
      randomTriviaCard.append(answerTag);
    }else{
      answerTag.innerText = `It is ${decode(triviaContent.results[0].correct_answer)}. You got the wrong answer! `
      randomTriviaCard.append(answerTag);    
    }
    answerTag.classList.remove("hidden");
    checkAnswerBtn.remove();
  })
  randomTriviaCard.append(checkAnswerBtn);
}

function displayDailyRandoms(){
  const randomExcuseObj = document.querySelector("#random-excuse");

  Promise.all([getRandomJoke(),getRandomExcuse(),getRandomTrivia()])
  .then((results)=>{
    formatJoke(results[0]);
    randomExcuseObj.innerText =  results[1];
    formatTrivia(results[2]);
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

