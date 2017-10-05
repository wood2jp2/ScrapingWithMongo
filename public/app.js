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
        <a data-id=${data.id} id='saveNote' class="waves-effect waves-light btn-large">Save</a>
      </div>\
    </form>\
  </div>`);

  if (data.note) {
    $("#titleinput").val(data.note.title);
    $("#bodyinput").val(data.note.body);
  }
});
});

$(document).on('click', '#saveNote', function() {
  var thisId = $(this).attr('data-id');
  console.log(thisId);

  $.ajax ({
    method: 'POST',
    url: '/articles/' + thisId,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  })
  .done(function(data) {
    console.log(data);
    $('#notes').empty();
  });
  $('#titleinput').val('');
  $('#bodyinput').val('');
});
