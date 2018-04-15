// var fetch = function () {
//   var isbn = $('.isbn-input').val();

//   console.log("I'm in fetch");
//   console.log("input-isbn: " + isbn);

//   $.ajax({
//     method: "GET",
//     // url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:0439023521',
//     url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn,

//     success: function (data) {

//       var title = data.items[0].volumeInfo.title;
//       var author = data.items[0].volumeInfo.authors[0];
//       var description = data.items[0].volumeInfo.description;
//       var image = data.items[0].volumeInfo.imageLinks.smallThumbnail;

//       $('.containerBook').empty();
//       AddBook(title, author, description, image);

//       console.log(title + " ," + author + " ," + description + " ," + image);
//       console.log(data);
//     },
//     error: function (jqXHR, textStatus, errorThrown) {
//       console.log(textStatus);
//     }
//   });
// };


// $('.searchBtn').click(fetch);


// var AddBook = function (t, a, d, i) {
//   var header = '<h1>' + t + '</h1> ';
//   var desc = '<p>' + d + '</p>';
//   var author = '<h3>Written by: ' + a + '</h3>';
//   var img = '<img src="' + i + '" >';
//   $('.containerBook').append(header + desc + author + img);
// }



var fetch = function (num) {

  console.log("I'm in fetch");
  console.log("input-isbn: " + num);

  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + num,

    success: function (data) {

      var title = data.items[0].volumeInfo.title;
      var author = data.items[0].volumeInfo.authors[0];
      var description = data.items[0].volumeInfo.description;
      var image = data.items[0].volumeInfo.imageLinks.smallThumbnail;

      $('.containerBook').empty();
      AddBook(title, author, description, image);

      console.log(title + " ," + author + " ," + description + " ," + image);
      console.log(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

//var isbn= ;
$('.searchBtn').click(function (){fetch($('.isbn-input').val())});

var AddBook = function (t, a, d, i) {
  var header = '<h1>' + t + '</h1> ';
  var desc = '<p>' + d + '</p>';
  var author = '<h3>Written by: ' + a + '</h3>';
  var img = '<img src="' + i + '" >';
  $('.containerBook').append(header + desc + author + img);
}





