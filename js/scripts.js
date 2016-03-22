'use strict';
jQuery(function() {

  var start = 0;
  var page;

  $('form').submit(search);

  $('.pages').click(function(ev) {

    if ( !$(ev.target).is('.pages_links') ) return;

    if ( $(ev.target).is('.forward') ) {
      start = page + 8;
    } else if ( $(ev.target).is('.back') ) {
      start = page - 8;
    } else {
      start = $(ev.target).attr('href') * 8;
    }
    console.log(start);
    search(ev);

    if (page >= 8) {
      $('.back').show();
    } else {
      $('.back').hide();
    }
  });


  function search(event) {
    event.preventDefault();

    var request = $('input[type="search"]').val();
    if (request== '') return;

    $.getJSON('http://ajax.googleapis.com/ajax/services/search/web?q=' + request + '&v=1.0&rsz=8&hl=ua&start=' + start + '&callback=?',
      function(data){

        console.log(data);
        var ul = document.createElement("ul");

        $.each(data.responseData.results, function(i, val){
          var li = document.createElement("li");
          li.innerHTML = '<h3><a href="' + val.unescapedUrl + '" title="' +
              val.unescapedUrl + '" target="_blank">' + val.title +
              '</a></h3><cite>' + val.unescapedUrl + '</cite><p>' + val.content +
              '</p>';                            
          ul.appendChild(li);
        });

      $('.links').html(ul);
      $('.pages').show();
    });

    page = start;
    start = 0;
  }
});