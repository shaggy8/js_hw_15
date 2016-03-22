'use strict';
jQuery(function() {

  var start = 0;
  var lastStart;


  $('form').submit(function(event) {
    event.preventDefault();
    search();
  });


  $('.pages').click(function(event) {
    event.preventDefault();

    var $target = $(event.target);

    if ( !$target.is('.pages_links') || $target.data('thisPage') ) return;

    if ( $target.is('.forward') ) {
      start = lastStart + 8;
    } else if ( $target.is('.back') ) {
      start = lastStart - 8;
    } else {
      start = $target.attr('href') * 8;
    }

    search();
  });


  function search() {
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

    $('.pages_links').css('color', '').data('thisPage', false);
    $('.pages_links').eq(start / 8 + 1).css('color', 'red').data('thisPage', true);

    lastStart = start;
    start = 0;

    if (lastStart >= 56) {
      $('.forward').hide();
    } else {
      $('.forward').show();
    }

    if (lastStart >= 8) {
      $('.back').show();
    } else {
      $('.back').hide();
    }
  }
});