var saveData;

$('.load').hide();

var callBack = function (data1, status) {
  if (status === 1) { // title or author
    showList(data1);
  }
  else { // isbn
    if (data1.totalItems === 0)
      $('.containerBook').append("<h5 style='color:red'>No search result found by this ISBN. </h5>")
    else
      showBook(data1, 0);
  }
  saveData = data1;
};

var fetch = function (pathURL, callBack, status) {

  $.ajax({
    method: 'GET',
    url: pathURL,

    beforeSend: function(){
      $('.load').show();
    },
    success: function (data) {
      console.log('in fetch:');
      console.log(data);

      $('.load').hide();
      callBack(data, status);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }

  });

};


$('.searchBtn').click(function () {
  $('.containerBook').empty();
  $('.list').empty();

  var isbn = $('#isbn').val();
  var title = $('#title').val();
  var author = $('#author').val();

  if (isbn == '' && title == '' && author == '') {
    $('.containerBook').append("<h5 style='color:red'>Please fill any field below. </h5>");
  }
  else if (title == '' && isbn == '') {
    console.log(' search author only');
    var url = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + author;
    fetch(url, callBack, 1);
  }
  else if (isbn == '') {
    console.log(' search title only');
    url = 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + title;
    fetch(url, callBack, 1);
  }
  else {
    $('.list-10-books').css('display', 'none');    
    console.log(' search isbn only');
    url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '';
    // var url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:0439023521';
    fetch(url, callBack, 0);
  }

});

var showList = function (res) {
  for (var i = 0; i < 10; i++) {
    var title = res.items[i].volumeInfo.title;
    var d = res.items[i].volumeInfo.description;
    if (d === undefined) 
      d= "No description found";
      
    $('ol').append('<li data-id= ' + i + '  data-toggle="tooltip" title="'+ d+ '">' + title + '</li>');
  }

  $('.list-10-books').css('display', 'block');
};

var showBook = function (data, i) {
  var t = data.items[i].volumeInfo.title;
  var a = data.items[i].volumeInfo.authors; //[0];
  var d = data.items[i].volumeInfo.description;
  var im = data.items[i].volumeInfo.imageLinks; //.smallThumbnail;

  if (im === undefined)
    var img = '<img src="noimg.jpg" style="width: 176px; height: 170px;" >';
  else var img = '<img src="' + im.smallThumbnail + '" >';

  var header = '<h2>' + t + '</h2> ';

  if (d === undefined) var desc = '<p> No description found </p>';
  else var desc = '<p>' + d + '</p>';

  if (a === undefined) {
    var author = '<h4> No author found  </h4>';
  } else {
    author = '<h4>Written by: ' + a + '</h4>';
  }

  $('.containerBook').append(header + desc + author + img);
};

// show the detials in the containerbook of specify book by click on list item
$('ol').on('click', 'li', function () {
  console.log($(this).text());
  $('.containerBook').empty();
  // $(this).css('color', 'orange');
  var id = $(this).data().id;
  showBook(saveData, id);
});


$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});