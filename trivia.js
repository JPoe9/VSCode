function decode(encoded) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = encoded;
  return textArea.value;
}

async function getTriviaCategories() {
  let categories;
  try {
    const categoryResponse = await fetch(
      `https://opentdb.com/api_category.php`
    );
    categories = await categoryResponse.json();
    console.log(categories);
  } catch (error) {
    console.error(error);
  }

  return categories.trivia_categories;
}

async function populateCategoryOptions() {
  const categoryPicklist = document.getElementById("category");
  const categoryOptions = await getTriviaCategories();
  categoryOptions.forEach((option) => {
    const newOption = document.createElement("option");
    newOption.value = option.id;
    newOption.innerText = option.name;
    categoryPicklist.append(newOption);
  });
}

async function getTriviaQuestions(category = 9, difficulty = "easy") {
  let triviaQuestions;
  try {
    const triviaResponse = await fetch(
      `https://opentdb.com/api.php?amount=5${category ? '&category='+category : ''}${difficulty ? '&difficulty='+difficulty.toLowerCase() : ''}`
    );
    triviaQuestions = await triviaResponse.json();
  } catch (error) {
    console.error(error);
  }

  return triviaQuestions;
}

function getChoices(questionDetails) {
  const answers = [];
  const possibleAnswers = [];
  const questionName = Math.round(Math.random() * 10000);
  possibleAnswers.push(questionDetails.correct_answer);
  questionDetails.incorrect_answers.forEach((incorrectAnswer) =>
    possibleAnswers.push(incorrectAnswer)
  );
  while (possibleAnswers.length) {
    const answerLabel = document.createElement("label");
    const radioBtn = document.createElement("input");
    const answerIndex = Math.floor(Math.random() * possibleAnswers.length);
    answerLabel.innerText = decode(possibleAnswers[answerIndex]);
    radioBtn.type = "radio";
    radioBtn.name = questionName;
    radioBtn.value = possibleAnswers[answerIndex];
    answerLabel.prepend(radioBtn);
    possibleAnswers.splice(answerIndex, 1);
    answers.push(answerLabel);
  }
  return answers;
}

function disableOptions() {
  const options = document.querySelectorAll('input[type="radio"]');
  for(let option of options) option.disabled = true;
}

function checkAnswers(triviaQuestions) {
  const triviaAnswers = document.querySelectorAll("input:checked");
  const questionDivs = document.querySelectorAll("#trivia-questions > div");
  const messageSection = document.getElementById("message");
  const scoreboard = document.createElement("p");
  let score = 0;
  while(messageSection.children.length) messageSection.removeChild(messageSection.lastChild);
  for (let i = 0; i < triviaQuestions.length; i++) {
    const result = document.createElement("p");
    const selectedAnswer = triviaAnswers[i].value;
    const options = document.querySelectorAll(`input[name="${triviaAnswers[i].name}"]`)
    const correctAnswer = triviaQuestions[i].correct_answer;
    if (selectedAnswer === correctAnswer) {
      triviaAnswers[i].parentElement.classList.add("correct-selection");
      score++;
      result.innerText = "Correct!!";
      result.className = "correct"
    } else {
      triviaAnswers[i].parentElement.classList.add("incorrect-selection");
      result.innerText = `Sorry the correct answer is ${correctAnswer}`;
      result.className = "incorrect"
    }
    for(let option of options) if(option.value === correctAnswer) option.parentElement.classList.add("answer");
    questionDivs[i].append(result);
  }
  switch(score) {
    case 5:
      scoreboard.innerText = "5/5 questions answered correctly! Great job!";
      break;
    case 4:
      scoreboard.innerText = "4/5 questions answered correctly! So close!";
      break;
    case 3:
      scoreboard.innerText = "3/5 questions answered correctly. Gettting warmer!";
      break;
    case 2:
      scoreboard.innerText = "2/5 questions answered correctly. I bet you'll do better next time!";
      break;
    case 1:
      scoreboard.innerText = "1/5 questions answered correctly. I bet you'll do better next time!";
      break;
    default:
      scoreboard.innerText = "Oops! Please try again. You got this!";
      break;
  }
  disableOptions();
  messageSection.append(scoreboard);
  scoreboard.classList.add("scoreboard");
  const resetBtn = document.getElementById("reset-btn");
  resetBtn.classList.remove("hidden");

}

function createQuestionElement(questionDetails) {
  const questionDiv = document.createElement("div");
  const question = document.createElement("p");
  const choices = getChoices(questionDetails);
  question.innerText = decode(questionDetails.question);
  questionDiv.classList.add("trivia-question", "trivia");
  questionDiv.append(question);
  choices.forEach((choice) => questionDiv.append(choice));
  return questionDiv;
}

async function displayTrivia() {
  const selectors = document.querySelectorAll('select');
  console.log(selectors);
  selectors.forEach(selector => selector.disabled = true);
  const submitBtn = document.getElementById("triviaSelection");
  submitBtn.classList.add("hidden");
  const triviaSection = document.getElementById("trivia-questions");
  const messageSection = document.getElementById("message");
  let category = document.getElementById("category").value;
  let difficulty = document.getElementById("difficulty").value;
  if(category === "Any Category") category = null;
  if(difficulty === "Any Difficulty") difficulty = null;
  const triviaObject = await getTriviaQuestions(category, difficulty);
  const triviaQuestions = triviaObject.results;
  const questionElements = triviaQuestions.map(createQuestionElement);
  const checkAnswersButton = document.createElement("input");
  checkAnswersButton.type = "button";
  checkAnswersButton.id = "check-answers";
  checkAnswersButton.classList.add("btn", "btn-primary");
  checkAnswersButton.value = "Check Answers";
  checkAnswersButton.addEventListener("click", (e) => {
    if(document.querySelectorAll("input:checked").length === 5) {
      checkAnswers(triviaQuestions)
      e.target.remove();
    } else {
      const error = document.createElement("p");
      error.classList.add('error')
      error.innerText = "Error: Please answer all trivia questions";
      messageSection.append(error);
    }
});
  questionElements.forEach((question) => triviaSection.append(question));
  triviaSection.append(checkAnswersButton);
}

populateCategoryOptions();
document
  .getElementById("triviaSelection")
  .addEventListener("click", displayTrivia);
// getTriviaQuestions(28, "medium");
