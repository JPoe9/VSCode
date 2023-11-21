const jSelectionBtn = document.querySelector("#jokesSelection");
jSelectionBtn.addEventListener("click", getSelectJoke);

function getSelectJoke(){
    const jContainer = document.querySelector("#jokeReturnedContainer");
    const jPTag = document.querySelector("#jokeReturned");
//     jContainer.outerHTML =`<div class="container card" id="jokeReturnedContainer" style="text-align: center;">
//     <div class="row ">
//          <h2> Here's the joke you requested... enjoy! </h2>
// <p class="card-body" id="jokeReturned"></p>
//     </div>
// </div>`;
    let jCategory = document.querySelector("#jokeCategory").value;
    console.log(jCategory);
    let jType = document.querySelector("#jokeType").value
    console.log(jType);
    
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
        if(jType === "Single"){
            jPTag.innerText = responseObject.joke;
        }else{
            const jDelivery = document.createElement("p");
            jDelivery.classList.add("hidden");
            const jDeliveryBtn = document.createElement("input");
            jDeliveryBtn.type ="button";
            jDeliveryBtn.value = "Show Delivery";
            jDeliveryBtn.classList.add("btn","btn-primary");
            jPTag.innerText = responseObject.setup;
            jDelivery.innerText = responseObject.delivery;
            jContainer.appendChild(jDelivery);
            jContainer.appendChild(jDeliveryBtn);
            jDeliveryBtn.addEventListener("click", function (){
                jDelivery.classList.remove("hidden");
                jContainer.removeChild(jDeliveryBtn);
            })
        }
    })
    .catch(error=>console.log(error));
}