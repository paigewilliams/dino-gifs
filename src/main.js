import { Giphy } from './../src/giphy';
import { Dino } from './../src/dinosaur';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

// function attachClickListener(){
//   $('ul#dino').on("click", "li", function(){
//    let number = this.id;
//   })
// }

$(document).ready(function(){

  let dinoObject = new Dino();
  let dinoPromise = dinoObject.getDino();


  dinoPromise.then(function(response){
    let body = JSON.parse(response);
    let array = body[0];
    array.forEach(function(name, index){
      $("#dino").append(`<li id=${index}>${name}</li>`);
    });
     //attachClickListener();

  }, function(error){
    $(".dinoError").text(`There was an error processing your request: ${error.message}`);
  });


$('ul#dino').on("click", "li", function(){
  let giphyObject = new Giphy();
  let giphyPromise = giphyObject.getGiph();
  let dinoId = this.id;
  console.log("before: " + dinoId);
  giphyPromise.then(function(response){
    let body = JSON.parse(response);
    console.log(dinoId);
    let specificGif = body.data[dinoId].embed_url
    $("#gif").html(`<iframe src="${specificGif}" width="480" height="327" frameBorder="0" allowFullScreen></iframe>`);
  }, function(error){
    $(".gifError").text(`There was error processing your request: ${error.message}`);
  });
});


})
