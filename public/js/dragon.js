const questionDiv = $("#question");
const heading = $("<h5>");

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
  // question.text(data);
});
};

window.onload = function() {
  getRiddle();
}
