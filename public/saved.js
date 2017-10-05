$.getJSON('/saved', function(data) {

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
            <a id='commentId' data-id=${currentArticle._id}>Leave a Comment</a>
            <a id='unsaveArticle' data-id=${currentArticle._id}>Unsave Article</a>
              </div>\
            </div>\
          </div>\
        </div>`);
  }
});

$(document).on('click', '#unsaveArticle', function() {
  var thisId = $(this).attr('data-id');
  $.ajax({
      method: 'PUT',
      url: '/articles/' + thisId,
      data: {
        'saved': false
      }
    })
    .done(function(data) {
      window.location.reload();
    });
})
