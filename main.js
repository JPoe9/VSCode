


async function getRandomJoke() {
  let jokeResponse, jokeContent; 
  try { 
    jokeResponse = await fetch('https://v2.jokeapi.dev/joke/Any?type=single&safe-mode&lang=en');
    jokeContent = await jokeResponse.json();
  }
  catch(error) { console.log(error); }

  return jokeContent.joke;
}

// console.log(getRandomJoke());


async function getRandomExcuse(){
  let  excuseResponse,excuseJson;
  try{
    excuseResponse = await fetch("https://excuser-three.vercel.app/v1/excuse");
    excuseJson = await excuseResponse.json();
  }catch(error){console.log(error); 
                return "My alarm did not go off in time to come up with an excuse!";}

  return excuseJson[0].excuse;
}
// console.log(getRandomExcuse());

 function displayRandoms(){
  const randomJokeObj = document.querySelector("#random-joke");
  const randomExcuseObj = document.querySelector("#random-excuse");
  Promise.all([getRandomJoke(),getRandomExcuse()])
  .then((results)=>{
    randomJokeObj.innerText =  results[0];
    randomExcuseObj.innerText =  results[1];
  })
}

displayRandoms();
