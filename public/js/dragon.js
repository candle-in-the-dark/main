const questionDiv = $("#question");
let heading = $("<h5>");
const answer = $("#answer");

function getRiddle(){
const url = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple';
const xhr = $.getJSON(url);
xhr.done(function(data){
  if (xhr.status !== 200){
    return;
  }
  let choice = Math.floor(Math.random() * 10);

  let question = data.results[choice].question
  heading.text(question);
  questionDiv.append(heading);

  let rightAnswer = data.results[choice].correct_answer
  let answers = data.results[choice].incorrect_answers;
  answers.push(rightAnswer);
  while (answers.length > 0){
    let picker = Math.floor(Math.random() * answers.length)
    let button = $("<button>");
    button.text(answers[picker]);
    if (answers[picker] === rightAnswer){
      button.addClass("correct");
    }
    answer.append(button)
    answers.splice(picker, 1)
  }
});
};



window.onload = function() {
  getRiddle();
}
