let randomExcuse;
let randomFetch = fetch("https://excuser-three.vercel.app/v1/excuse")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    randomExcuse = data[0].excuse;
    // console.log(randomExcuse);
    var randomExcuseElement = document.getElementById("random-excuse");
    randomExcuseElement.innerText = randomExcuse;
    return randomExcuse;
  });

var submitExcusesButton = document.getElementById("submitExcusesButton");
var selectElement = document.getElementById("inputGroupSelect01");
submitExcusesButton.addEventListener("click", function () {
  var selectedValue = selectElement.value;
  localStorage.setItem("selectedExcuseTopic", selectedValue);
  // alert("Selected value saved: " + selectedValue);

  let selectedExcuses;
  let addAPTagFlag = false;
  let selectedFetch = fetch(
    `https://excuser-three.vercel.app/v1/excuse/${selectedValue}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      selectedExcuses = data[0].excuse;
      console.log(selectedExcuses);
      let selectedExcuseElement = document.getElementById("addExcuses");
      // selectedExcuseElement.innerText = selectedExcuses;
      // selectedExcuseElement.classList.add("addFirstExcuses");
      const para = document.createElement("p");
      const node = document.createTextNode(selectedExcuses);
      para.appendChild(node);

      const element = document.getElementById("addExcuses");
      element.appendChild(para);
      return selectedExcuses;
    });
});
