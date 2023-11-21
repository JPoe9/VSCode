const jSelectionBtn = document.querySelector("#jokesSelection");
jSelectionBtn.addEventListener("click", getSelectJoke);

function getSelectJoke(){
    const jContainer = document.querySelector("#jokeReturnedContainer");
    const jPTag = document.querySelector("#jokeReturned");
    const jDeliveryPTag = document.querySelector("#jokeDelivery");
    const jDeliveryBtn = document.querySelector("#jDeliveryBtn");
    jDeliveryPTag.classList.add("hidden");
    jDeliveryBtn.classList.add("hidden");
    jPTag.innerText = "";
    let jCategory = document.querySelector("#jokeCategory").value;
    let jType = document.querySelector("#jokeType").value
    
    let jUrl;
    if(jCategory === "Any Category"){
        jCategory = "Any";
    }
    switch (jType){
        case "Any Type":
            jUrl = `https://v2.jokeapi.dev/joke/${jCategory}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;
            break;
        case "Single":
            jUrl = `https://v2.jokeapi.dev/joke/${jCategory}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`;
            break;
        case "Two-part":
            jUrl = `https://v2.jokeapi.dev/joke/${jCategory}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart`;
    }
    fetch(jUrl)
    .then((response)=>response.json())
    .then(responseObject => {
        console.log(responseObject);
        jContainer.classList.remove("hidden");
        if(responseObject.type === "single" ){ //&& responseObject.joke
            jPTag.innerText = responseObject.joke;
        }else{ // responseObject.setup && responseObject.delivery
            jPTag.innerText = responseObject.setup;
            jDeliveryPTag.innerText = responseObject.delivery;
            jDeliveryBtn.classList.remove("hidden");
            jDeliveryBtn.addEventListener("click", function (){
                jDeliveryPTag.classList.remove("hidden");
                jDeliveryBtn.classList.add("hidden");
            })
        }
    })
    .catch(error=>console.log(error));
}