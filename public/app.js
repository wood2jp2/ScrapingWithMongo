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
            <a id='commentId' data-id=${currentArticle._id}>Leave a Comment</a>
            <a id='saveArticle' data-id=${currentArticle._id}>Save Article</a>
              </div>\
            </div>\
          </div>\
        </div>`);
  }
});

$('.modal').modal();

$(document).on('click', '#saveArticle', function() {
  var thisId = $(this).attr('data-id');

  $.ajax({
      method: 'PUT',
      url: '/articles/' + thisId,
      data: {
        saved: true
      }
    })
    .done(function(data) {
      window.location.reload();
    });
});

// when leave a comment is clicked...
$(document).on('click', '#commentId', function() {

  // open comment modal
  $('#modal1').modal('open');
  var thisId = $(this).attr('data-id');

  // get article data
  $.ajax({
      method: "GET",
      url: '/articles/' + thisId
    })
    // once that's finished
    .done(function(data) {
      console.log(data);
      $('#articleTitle').append(data.headline);
      if (data.body) {
        $('#postedComments').append(data.note.body);
      };

      // when the user wants to save the comment...
      $(document).on('click', '#saveNote', function() {
        console.log(thisId);
        $.ajax({
            method: 'POST',
            url: '/articles/' + thisId,
            data: {
              body: $('#commentInput').val()
            }
          })
          .done(function(data) {
            $('#notes').empty();
          });
        $('#commentInput').val('');
      });
      // if (data.note) {
      //   $("#textarea1").val(data.note.title);
      //   $("#textarea2").val(data.note.body);
      // }
    });
});
