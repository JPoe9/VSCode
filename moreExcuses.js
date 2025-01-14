let randomExcuse;
let randomFetch = fetch("https://excuser-three.vercel.app/v1/excuse")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    randomExcuse = data[0].excuse;
    let randomExcuseElement = document.getElementById("random-excuse");
    randomExcuseElement.innerText = randomExcuse;
    return randomExcuse;
  });

let submitExcusesButton = document.getElementById("submitExcusesButton");
let selectElement = document.getElementById("inputGroupSelect01");
submitExcusesButton.addEventListener("click", function () {
  let selectedValue = selectElement.value;
  localStorage.setItem("selectedExcuseTopic", selectedValue);
  let selectedExcuses;
  fetch(`https://excuser-three.vercel.app/v1/excuse/${selectedValue}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      selectedExcuses = data[0].excuse;
      let selectedExcuseElement = document.getElementById("addExcuses");
      selectedExcuseElement.classList.remove("hidden");
      let para = document.createElement("p");
      para.style.cssText = "margin:2px;";
      if (selectedExcuseElement.children.length > 0) {
        para.classList.add("border-top");
      }
      const node = document.createTextNode(selectedExcuses);
      para.appendChild(node);
      let element = document.getElementById("addExcuses");
      element.appendChild(para);
    });
});
