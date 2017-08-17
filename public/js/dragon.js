const questionDiv = $("#question");
let heading = $("<h5>");
const answer = $("#answer");
const info = JSON.parse(localStorage.getItem('info'));
let loggedIn;


function getRiddle(){
  getPlayerInfo()
  .then((result) =>{
    loggedIn = result;
    const url = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple';
    const xhr = $.getJSON(url);
    xhr.done(function(data){
      if (xhr.status !== 200){
        return;
      }
      setTimeout(function() {
        renderRiddle(data)
      }, 1500);
    })
  .catch((err) => {});
  })
}

function renderRiddle(data) {
  let choice = Math.floor(Math.random() * 10);
  if (info.inQuest) {
    while (info.questions.includes(choice)) {
      choice = Math.floor(Math.random() * 10);
    }
    info.questions.push(choice);
  }
  let question = data.results[choice].question

  heading.text(question.replace(/&#039;/g, "'"));
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
// sets the event handler and logic
  $('#answer').on('click', (event) => {
    if($(event.target).hasClass("correct")) {
        if (info.lastMap === 3 && info.inQuest) {
          submitScoreQuest()
          .then(() => {
            window.location.href = 'win.html';
          }).catch((err) => {})
        } else {
          submitScore(info.mapScore)
          .then(() => {
            if (info.inQuest) {
              info.questScore += info.mapScore;
            }
            localStorage.setItem('info', JSON.stringify(info))
            if (info.inQuest && loggedIn) {
              window.location.href = `maze.html?mapId=${info.lastMap+1}`
            } else {
              window.location.href = 'scoreboard.html';
            }
            })
          .catch((err) => {});
        }
    } else {
      window.location.href = "ded.html";
    }
  })
}

const submitScore = function(score) {
  const mapId = info.lastMap;
  const grabScore = {
    contentType: 'application/json',
    dataType: 'json',
    type: 'GET',
    url: `/user/scores/${mapId}`
  }
  return $.ajax(grabScore)
    .then((result) => {
      if (!result[0]) {
        const options = {
          contentType: 'application/json',
          data: JSON.stringify({ score, mapId }),
          dataType: 'json',
          type: 'POST',
          url: '/scores'
        };
      return $.ajax(options)
          .then(() => {})
          .catch(($xhr) => {
            Materialize.toast($xhr.responseText, 3000);
          });
      } else {
        if (result[0].score < score) {
          const update = {
            contentType: 'application/json',
            data: JSON.stringify({ score, mapId }),
            dataType: 'json',
            type: 'PATCH',
            url: '/scores'
          };
          return $.ajax(update)
            .then(() => {})
            .catch((err) => {})
        }
      }
    })
    .catch((err) => {
    })
}

function submitScoreQuest() {
  const score = {
    'map_id':3,
    'score':info.questScore
  }
  const questScore = {
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(score),
    type: 'POST',
    url: '/scores/quest'
  }
  return $.ajax(questScore)
    .then((results) => {})
    .catch((err) => {})
}

const getPlayerInfo = function(){
  const logCheck = {
    contentType: 'application/json',
    dataType: 'json',
    type: 'GET',
    url: '/token'
  };
  return $.ajax(logCheck);
};

window.onload = function() {
  getRiddle();
}
