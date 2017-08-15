const questionDiv = $("#question");
let heading = $("<h5>");
const answer = $("#answer");
let button = $("<input>").attr('type', 'radio')

function getRiddle(){
const url = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple';
const xhr = $.getJSON(url);
xhr.done(function(data){
  if (xhr.status !== 200){
    return;
  }
  let choice = Math.floor(Math.random() * 10);
  console.log(data.results[choice]);
  let question = data.results[choice].question
  heading.text(question);
  questionDiv.append(heading);
  let answers = []
  for (let i = 0; i < data.results[choice].incorrect_answers.length; i++){
    answers.push(data.results[choice].incorrect_answers[i])
  }
  answers.push(data.results[choice].correct_answer);
  // console.log(answers);
  for (i = 0; i < data.results[choice].incorrect_answers.length)
});
};

window.onload = function() {
  getRiddle();
}
