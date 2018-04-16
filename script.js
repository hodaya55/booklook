
var fetch = function (pathURL) {
  // var fetch = function (title) {


  // return $.ajax({
  var res = $.ajax({
    method: "GET",
    // url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + title,
    url: pathURL,

    success: function (data) {
      console.log("in fetch:");
      console.log(data);


    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);

    },
    async: false



  });
  return res;
};

var res;
$('.searchBtn').click(function () {

  $('.containerBook').empty();
  $('.list').empty();

  var isbn = $('#isbn').val();
  var title = $('#title').val();
  var author = $('#author').val();

  if (isbn == "" && title == "" && author == "") {
    $('.containerBook').append("<h5 style='color:red'>Please fill any field below. </h5>")
  }
  else if (title == "" && isbn == "") {
    console.log(" search author only");
    var url = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + author;

    res = fetch(url);
    showList(res);
  }
  else if (isbn == "") {
    console.log(" search title only");
    var url = 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + title;

    res = fetch(url);
    showList(res);
  }
  else {
    $('.list-10-books').css('display', 'none');
    console.log(" search isbn only");
    var url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '';
    // var url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:0439023521';

    res = fetch(url);
    if (res.responseJSON.totalItems == 0)
      $('.containerBook').append("<h5 style='color:red'>No search result found by this ISBN. </h5>")

    else
      AddBook(res, 0);
  }

});


var showList = function (res) {

  for (var i = 0; i < 10; i++) {
    var title = res.responseJSON.items[i].volumeInfo.title;
    $('ol').append("<li data-id= " + i + ">" + title + "</li>");
  }

  $('.list-10-books').css('display', 'block');
}

var AddBook = function (data, i) {

  var t = data.responseJSON.items[i].volumeInfo.title;
  var a = data.responseJSON.items[i].volumeInfo.authors //[0];
  var d = data.responseJSON.items[i].volumeInfo.description;
  var im = data.responseJSON.items[i].volumeInfo.imageLinks //.smallThumbnail;

  if (im === undefined)
    var img = '<img src="noimg.jpg" >';
  else
    var img = '<img src="' + im.smallThumbnail + '" >';

  var header = '<h1>' + t + '</h1> ';

  if (d === undefined)
    var desc = '<p> no found description </p>';
  else
    var desc = '<p>' + d + '</p>';

  if (a === undefined) {
    var author = '<h3> no found authors </h3>';
  }
  else
    var author = '<h3>Written by: ' + a + '</h3>';


  $('.containerBook').append(header + desc + author + img);


}

// show the detials in the containerbook of specify book
$('ol').on('click', 'li', function () {
  console.log($(this).text());
  $('.containerBook').empty();

  var id = $(this).data().id;
  AddBook(res, id);

})


