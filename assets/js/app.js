           var topics = ["wine", "beer", "cocktail", "vodka", "tequila", "whiskey", "champagne", "martini"];
           var api_key = "ckvCPO4jnCg338m2CttOtkDLb1bmZjK0"
           var count = 0;
           var location;
           


        //    function evilLaugh () {
        //     var audio = $("audio");
        //     audio.attr("src", "assets/audio/sound.mp3");
        //     drinkButton[0].play();
        //    }

           function renderButton() {

               $("#buttons-view").empty();
               $("#buttons-view").val("");
            //    audio[0].play();
               for (var i = 0; i < topics.length; i++) {

                   var drinkButton = $("<button>");
                   drinkButton.addClass("drink-button");
                   drinkButton.attr("data-name", topics[i]);
                   drinkButton.text(topics[i]);
                   $("#buttons-view").append(drinkButton);
               }
               
           }


           function displayDrinkGIF() {
               var topic = $(this).attr("data-name");
               var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic +
                   "&api_key=" + api_key + "&limit=10";

               $.ajax({
                   url: queryURL,
                   method: "GET"
               }).then(function (response) {
                   console.log(response);
                   var resp_data = response.data;
                   $(".btn-container").empty();
                   for (var i = 0; i < resp_data.length; i++) {

                       console.log(resp_data[i])
                       var img = $("<img>");
                       img.addClass("images");
                    //    img.attr("src", resp_data[i].images.fixed_height_still.url)
                       img.attr("data-type", "still");
                       img.attr("data-still", resp_data[i].images.fixed_height_still.url);
                       img.attr("data-animate", resp_data[i].images.fixed_height.url);
                       img.attr("src", resp_data[i].images.fixed_height_still.url)
                       console.log(img)

                        var r = $("<p>");
                        r.addClass("rating");
                        r.append(resp_data[i].rating);
                        
                        $(".btn-container").append(img);
                        $(".btn-container").append(r);

                       console.log(resp_data[i].rating)
                       


                   }

                   $(".images").on("click", function () {
                    var state = $(this).attr("data-type");
                    if ($(this).attr("data-type") === "animate") {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-type", "still");
                    } else {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-type", "animate");
                    }

                })

               })
           }

           $("#add-drink").on("click", function (event) {
               event.preventDefault();


               var drink = $("#drink-input").val().trim();
               $("#drink-input").val("");

               if (!topics.includes(drink)) {
                topics.push(drink);
               }


               
               console.log(topics);

               renderButton();
           });


           $(document).on("click", ".drink-button", displayDrinkGIF)
           {
        //    evilLaugh();
           };


           renderButton();