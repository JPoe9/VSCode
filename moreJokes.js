const jSelectionBtn = document.querySelector("#jokesSelection");
jSelectionBtn.addEventListener("click", getSelectJoke);

function getSelectJoke(){
    const jContainer = document.querySelector("#jokeReturnedContainer");
    const jPTag = document.querySelector("#jokeReturned");
    const jDeliveryPTag = document.querySelector("#jokeDelivery");
    const jDeliveryBtn = document.querySelector("#jDeliveryBtn");
    jDeliveryPTag.classList.add("hidden");
    jDeliveryBtn.classList.add("hidden");
    let jCategory = document.querySelector("#jokeCategory").value;
    let jType = document.querySelector("#jokeType").value
    let jUrl;
    if(jCategory === "Any Category"){
        jCategory = "Any";
    }
    if(jType === "Any Type"){
        jUrl = `https://v2.jokeapi.dev/joke/${jCategory}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;
    }else{
        jUrl = `https://v2.jokeapi.dev/joke/${jCategory}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=${jType}`;
    }
    fetch(jUrl)
    .then((response)=>response.json())
    .then(responseObject => {
        jContainer.classList.remove("hidden");
        if(jType === "Single" && responseObject.joke){
            jPTag.innerText = responseObject.joke;
        }else if(responseObject.setup && responseObject.delivery){
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