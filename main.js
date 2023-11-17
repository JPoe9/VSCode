


async function getRandomJoke() {
  let jokeResponse, jokeContent; 
  try { 
    jokeResponse = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode&lang=en');
    jokeContent = await jokeResponse.json();
  }
  catch(error) { console.log(error); }

  console.log(jokeContent);
}

getRandomJoke();