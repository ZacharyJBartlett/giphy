var gifList = ["Kung Fury", "Kung Pow", "Platypus", "Tuba", "Rocket Power", "Scarface", "Moana", "Fatality", "Major Payne"];

function renderButtons() {

    $("#button-list").empty();
    for (var i = 0; i < gifList.length; i++) {
        var but = $("<button>").text(gifList[i]);
        $("button").addClass("data-person");
        $("#button-list").append(but);
    }
};

$("#newGif").on("click", function(event) {
    event.preventDefault();
    var newGif = $("#add").val().trim();
    gifList.push(newGif);
    renderButtons();

});

$("#button-list").on("click", "button", function() {
    $("#animationDomination").empty();
    var findGif = $(this).text();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + findGif + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            $("#animationDomination").append("<img src='" + response.data[i].images.fixed_height.url + "'></img>");
            $("#animationDomination").append("Rating: " + response.data[i].rating + "<br>");
            console.log(response.data);
        };
    });
});
$(".gif").on("click", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

renderButtons();