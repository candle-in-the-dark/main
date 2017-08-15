function getRiddle(){
const url = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple';
const xhr = $.getJSON(url);
xhr.done(function(data){
  if (xhr.status !== 200){
    return;
  }
  console.log(data);
});
};
window.onload = function() {
  getRiddle();
}
