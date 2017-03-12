var topics = ["polar bear","grizzly bear","hyena","shark","wolf","tiger","lion"];


function giphySearch (){

var animal = $(this).attr("data-animal");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
  animal + "&api_key=dc6zaTOxFJmzC&limit=10";
$.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    console.log(queryURL);
    console.log(response);


    var results = response.data;

    for (var i = 0; i < results.length; i++) {


      var stillUrl = response.data[i].images.original_still.url;
      var animatedUrl = response.data[i].images.original.url;

      var animalDiv = $("<div>");

      var p = $("<p>").text("Rating: " + results[i].rating);
    
      var animalImage = $("<img>");

      animalImage.attr({
        "src": stillUrl, 
        "data-still": stillUrl, 
        "data-animate": animatedUrl, 
        "data-state": "still", 
        "class": "gif"});

      animalDiv.append(p);
      animalDiv.append(animalImage);

      $("#gifs-appear-here").prepend(animalDiv);

      
    }
  });
}


function renderButtons() {
  
  $("#buttons-view").empty();
 
  for (var i = 0; i < topics.length; i++) {
 
    var createButton = $("<button>");

    console.log(createButton);
    
    createButton.addClass("animal");
   
    createButton.attr("data-animal", topics[i]);
    
    createButton.text(topics[i]);
    
    $("#buttons-view").prepend(createButton);


  }
}



$("#add-animal").on("click", function(event) {
  event.preventDefault();



  if ($("#animal-input").val().length > 0){

    var animal = $("#animal-input").val().trim();
  
    topics.push(animal);
    console.log(topics)
    
    renderButtons();
  }

  $("#animal-input").val(" ");

});

function dance() {

  var state = $(this).attr("data-state");
  
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
};


$(document).ready(function() 
{
  renderButtons();

  $("body").on("click", ".animal", giphySearch);
  $("body").on("click", ".gif", dance);
});