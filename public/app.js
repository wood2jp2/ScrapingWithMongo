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

$(document).on('click', '#commentId', function() {

  $('#notes').empty();
  var thisId = $(this).attr('data-id');
  $.ajax({
      method: "GET",
      url: '/articles/' + thisId
    })

    .done(function(data) {
      $('#notes').append(`<div class="row">\
    <form class="col s12">\
      <div class="row">\
      <h4>${data.headline}</h4>
        <div class="input-field col s12">\
        <textarea id="textarea1" class="materialize-textarea"></textarea>\
        <label for="title">Title</label>\
        </div>
        <div class='input-field col s12'>
          <textarea id="textarea2" class="materialize-textarea"></textarea>\
          <label for="comment">Comment</label>\
        </div>
        <a data-id=${data._id} id='saveNote' class="waves-effect waves-light btn-large">Save</a>
      </div>\
    </form>\
  </div>`);

      // if (data.note) {
      //   $("#textarea1").val(data.note.title);
      //   $("#textarea2").val(data.note.body);
      // }
    });
});

$(document).on('click', '#saveNote', function() {
  var thisId = $(this).attr('data-id');
  console.log(thisId);

  $.ajax({
      method: 'POST',
      url: '/articles/' + thisId,
      data: {
        title: $('#textarea1').val(),
        body: $('#textarea2').val()
      }
    })
    .done(function(data) {
      $('#notes').empty();
    });
  $('#textarea1').val('');
  $('#textarea2').val('');
  console.log(thisId);
});
