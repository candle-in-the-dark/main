const info = JSON.parse(localStorage.getItem('info'));
const map = info.lastMap;
$('#title').text(`High Scores for Map ${map}`);

const options = {
  contentType: 'application/json',
  dataType: 'json',
  type: 'GET',
  url: `/usernames/scores/${map}`
}
$.ajax(options)
  .then((result) => {
    result.forEach((element) => {
      const row = $('<tr>');
      const username = $('<td>').text(element.username);
      const score = $('<td>').text(element.score);
      $('#records').append(row.append(username).append(score));
    })
  })
  .catch((err) => { });






// const submitScore = function(endTime) {
//   const mapId = window.location.search.split('?')[1].split('=')[1];
//   const grabScore = {
//     contentType: 'application/json',
//     dataType: 'json',
//     type: 'GET',
//     url: `/scores/${mapId}`
//   }
//   $.ajax(grabScore)
//     .then((result) => {
//       if (!result[0]) {
//         const options = {
//           contentType: 'application/json',
//           data: JSON.stringify({ endTime, mapId }),
//           dataType: 'json',
//           type: 'POST',
//           url: '/scores'
//         };
//         $.ajax(options)
//           .then(() => {})
//           .catch(($xhr) => {
//             Materialize.toast($xhr.responseText, 3000);
//           });
//       } else {
//         if (result[0].score < endTime) {
//           const update = {
//             contentType: 'application/json',
//             data: JSON.stringify({ endTime, mapId }),
//             dataType: 'json',
//             type: 'PATCH',
//             url: '/scores'
//           };
//           $.ajax(update)
//             .then(() => {})
//             .catch((err) => {})
//         }
//       }
//     })
//     .catch((err) => {
//     })
// }
