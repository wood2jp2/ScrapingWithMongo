$.getJSON('/articles', function(data) {

  for (let i = 0; i < data.length; i++) {

    const currentArticle = data[i];
    $('#articles').prepend(`<div class="row">
    <div class="col s12 m6">\
            <div class="card blue-grey darken-1">\
            <div class="card-content white-text">\
              <span class="card-title">${currentArticle.headline}</span>\
                <p>${currentArticle.summary}</p>\
            </div>\
            <div class="card-action">\
            <a href="${currentArticle.url}" target='_blank'>Check it out!</a>\
            <a id='commentId' data-id=${currentArticle._id}>Leave a Comment</>
              </div>\
            </div>\
          </div>\
        </div>`);
  }
}); 

$(document).on('click', '#commentId', function() {
  $('#notes').empty();
  var thisId = $(this).attr('data-id');
  console.log(thisId);
  $.ajax({
    method: "GET",
    url: '/articles/' + thisId
  })

  .done(function(data) {
    console.log('data');
  })
})
