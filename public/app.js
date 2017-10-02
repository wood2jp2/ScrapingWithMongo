$.getJSON('/articles', function(data) {

  for (let i = 0; i < data.length; i++) {
    // $('#articles').append(data[]);


    const currentArticle = data[i];
    $('#articles').append(`<div class="row">
    <div class="col s12 m6">\
            <div class="card blue-grey darken-1">\
            <div class="card-content white-text">\
              <span class="card-title">${currentArticle.headline}</span>\
                <p>${currentArticle.summary}</p>\
            </div>\
            <div class="card-action">\
            <a href="${currentArticle.url}">Check it out!</a>\
              </div>\
            </div>\
          </div>\
        </div>`);
  }
})
