const questionDiv = $("#question");
let heading = $("<h5>");
const answer = $("#answer");
const info = JSON.parse(localStorage.getItem('info'));


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

  $('#answer').on('click', (event) => {
    if($(event.target).hasClass("correct")){
      submitScore();
      if (info.inQuest) {
        window.location.href = `maze.html?mapId=${info.lastMap+1}`
      } else {
        window.location.href = 'win.html';
      }
    }
    else{
      window.location.href = "ded.html";
    }
  })
});
};

//This will have to move to the dragon's riddle pageif we go that route (teehee!!!)
const submitScore = function(endTime) {
  const mapId = info.lastMap;
  const grabScore = {
    contentType: 'application/json',
    dataType: 'json',
    type: 'GET',
    url: `/user/scores/${mapId}`
  }
  $.ajax(grabScore)
    .then((result) => {
      if (!result[0]) {
        const options = {
          contentType: 'application/json',
          data: JSON.stringify({ endTime, mapId }),
          dataType: 'json',
          type: 'POST',
          url: '/scores'
        };
        $.ajax(options)
          .then(() => {})
          .catch(($xhr) => {
            Materialize.toast($xhr.responseText, 3000);
          });
      } else {
        if (result[0].score < endTime) {
          const update = {
            contentType: 'application/json',
            data: JSON.stringify({ endTime, mapId }),
            dataType: 'json',
            type: 'PATCH',
            url: '/scores'
          };
          $.ajax(update)
            .then(() => {})
            .catch((err) => {})
        }
      }
    })
    .catch((err) => {
    })
}




window.onload = function() {
  getRiddle();
}
