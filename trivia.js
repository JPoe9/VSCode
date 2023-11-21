// available options on page:
// category
// difficulty

// fetch 5 trivia questions from selected category/difficulty
// display questions and answer choices
// for each question, display the question and choices
// compare user answer with correct answer
// display results

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
// getTriviaCategories();

// ids
// category
// difficulty

async function getTriviaQuestions(category = 9, difficulty = "easy") {
  let triviaQuestions;
  try {
    const triviaResponse = await fetch(
      `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty.toLowerCase()}`
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
function checkAnswers(triviaQuestions) {
  const triviaAnswers = document.querySelectorAll("input:checked");
  const questionDivs = document.querySelectorAll("#trivia-questions > div");
  for (let i = 0; i < triviaQuestions.length; i++) {
    const result = document.createElement("p");
    const selectedAnswer = triviaAnswers[i].value;
    const correctAnswer = triviaQuestions[i].correct_answer;
    if (selectedAnswer === correctAnswer) {
      result.innerText = "Correct!!";
    } else {
      result.innerText = `Sorry the correct answer is ${correctAnswer}`;
    }
    questionDivs[i].append(result);
  }
}
async function displayTrivia() {
  const triviaSection = document.getElementById("trivia-questions");
  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;
  const triviaObject = await getTriviaQuestions(category, difficulty);
  const triviaQuestions = triviaObject.results;
  const questionElements = triviaQuestions.map((questionDetails) => {
    const questionDiv = document.createElement("div");
    const question = document.createElement("p");
    const choices = getChoices(questionDetails);
    question.innerText = decode(questionDetails.question);
    questionDiv.classList.add("trivia-question");
    questionDiv.append(question);
    choices.forEach((choice) => questionDiv.append(choice));
    return questionDiv;
  });
  const checkAnswersButton = document.createElement("input");
  checkAnswersButton.type = "button";
  checkAnswersButton.id = "check-answers";
  checkAnswersButton.classList.add("btn", "btn-primary");
  checkAnswersButton.value = "Check Answers";
  checkAnswersButton.addEventListener("click", () =>
    checkAnswers(triviaQuestions)
  );
  questionElements.forEach((question) => triviaSection.append(question));
  triviaSection.append(checkAnswersButton);
}
populateCategoryOptions();
document
  .getElementById("triviaSelection")
  .addEventListener("click", displayTrivia);
// getTriviaQuestions(28, "medium");
