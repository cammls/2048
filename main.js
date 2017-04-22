(function($) {

    $.fn.mygame = function(size) {
        var gameObject = $(this).attr("id");
        var blockSize = size;
        var boardSize = (size) * 4.3;

        //we call the functions that make the board, the grid and generate the first two tiles
        MakeBoard($(this));
        MakeGrid();
        FirstTiles();

        document.onkeyup = function(event) {
          if (event.keyCode >= 37 && event.keyCode <= 40) { // if users presses one of the arrow keys
            switch (event.keyCode) {
              case 37: // when the user presses the left arrow
              console.log("left key");
              $(".square-container" ).each(function() {
                //we loop on all the divs square container
                if ($(this).is(':parent')) // we enter this condition only if the div is parent of a tile
                {
                  if ($(this).data('columns') != 0 )
                  {
                    console.log("je suis pas dans la colonne 0!");
                    var currentPos = $(this).data('position'); // we stock the current position of the tile
                    var tile = $(this).children(); // we stock the tile itself
                    //CheckNeighbour(currentPos);
                    console.log("check");
                    if ((currentPos = MoveLeft(currentPos, tile)) != null)
                    {
                      console.log("y a un tile a gauche, je vais merger si meme val");
                      console.log($('.square-container[data-position='+(currentPos-1)+']').text());
                      console.log($('.square-container[data-position='+(currentPos)+']').text());

                      if ( $('.square-container[data-position='+(currentPos-1)+']').text() ==  $('.square-container[data-position='+currentPos+']').text()) // the tile and its neighbour on the left have the same value
                      {
                        console.log("we meeerge");
                        MergeTiles(currentPos-1,tile,$('.square-container[data-position='+(currentPos-1)+']').children());
                      }
                      else  // the tiles have different value, they don't merge
                      {
                          console.log("we dont merge");
                      }
                    }
                  }
                }
              });
              break;
              case 38: // up arrow key
              console.log("up key");
              $(".square-container" ).each(function() {
                //we loop on all the divs square container
                if ($(this).is(':parent')) // we enter this condition only if the div is parent of a tile
                {
                  var line = $(this).data('line');
                  if (line != 0 )
                  {
                    console.log("je suis pas dans la line 0!");
                    var currentPos = $(this).data('position'); // we stock the current position of the tile
                    var tile = $(this).children(); // we stock the tile itself

                    if ((currentPos = MoveUp(currentPos, tile)) != null)
                    {
                      console.log("y a un tile en haut, je vais merger si meme val");

                      if ( $('.square-container[data-position='+(currentPos-4)+']').text() ==  $('.square-container[data-position='+currentPos+']').text()) // the tile and its neighbour on the left have the same value
                      {
                        console.log("we meeerge");
                        MergeTiles(currentPos-4,tile,$('.square-container[data-position='+(currentPos-4)+']').children());

                      }
                      else  // the tiles have different value, they don't merge
                      {
                          console.log("we dont merge");
                      }
                    }
                  }
                }
              })

              break;
              case 39: // right arrow key
              console.log("right key");
              $(".square-container" ).each(function() {
                //we loop on all the divs square container
                if ($(this).is(':parent')) // we enter this condition only if the div is parent of a tile
                {
                  if ($(this).data('columns') != 3 )
                  {
                    console.log("je suis pas dans la colonne 3!");
                    var currentPos = $(this).data('position'); // we stock the current position of the tile
                    var tile = $(this).children(); // we stock the tile itself
                    //CheckNeighbour(currentPos);
                    console.log("check");
                    if ((currentPos = MoveRight(currentPos, tile)) != null)
                    {
                      if ( $('.square-container[data-position='+(currentPos+1)+']').text() ==  $('.square-container[data-position='+currentPos+']').text()) // the tile and its neighbour on the left have the same value
                      {
                        console.log("we meeerge");
                        MergeTiles(currentPos+1,tile,$('.square-container[data-position='+(currentPos+1)+']').children());
                      }
                      else  // the tiles have different value, they don't merge
                      {
                          console.log("we dont merge");
                      }
                    }
                  }
                }
              });

              break;
              case 40: // down arrow key is pressed
              console.log("down key");
              $(".square-container" ).each(function() {
                //we loop on all the divs square container
                if ($(this).is(':parent')) // we enter this condition only if the div is parent of a tile
                {
                  if ($(this).data('line') != 3 )
                  {
                    console.log("je suis pas dans la line 3!");
                    var currentPos = $(this).data('position'); // we stock the current position of the tile
                    var tile = $(this).children(); // we stock the tile itself

                    if ((currentPos = MoveDown(currentPos, tile)) != null)
                    {
                      console.log("y a un tile en bas, je vais merger si meme val");

                      if ( $('.square-container[data-position='+(currentPos+4)+']').text()
                      ==  $('.square-container[data-position='+currentPos+']').text())
                      //&&  $('.square-container[data-position='+(currentPos+4)+']').children().data("merge")== false) // the tile and its neighbour on the left have the same value
                      {
                        console.log("we meeerge");
                        console.log($('.square-container[data-position='+(currentPos+4)+']').children());
                        MergeTiles(currentPos+4,tile,$('.square-container[data-position='+(currentPos+4)+']').children());
                        MoveDown(currentPos-1,tile);
                        MoveDown(currentPos-2,tile);

                      }
                      else  // the tiles have different value, they don't merge
                      {
                          console.log("we dont merge");
                      }
                    }
                  }
                }
              })
            break;
            }
              MakeTile();
          }
        };

        function MoveLeft(currentPos,tile) // currently works for left arrow
        {
          var lim;
          switch($('.square-container[data-position='+(currentPos)+']').data("line")) {
            case 0:
            lim = 0;
            break;
            case 1:
            lim = 4;
            break;
            case 2:
            lim = 8;
            break;
            case 3:
            lim = 12;
            break;
          }
          if ( $('.square-container[data-position='+(currentPos-1)+']').is(':parent') == false && currentPos > lim ) // no tile on your left
          {
            //console.log("je bouuge");
             $('.square-container[data-position='+(currentPos-1)+']').append(tile);
             currentPos= currentPos -1;
             return MoveLeft(currentPos, tile); //recursivity !!!! on met un return pour avoir le bon currentPos
          }
          else
          {
            //console.log("je finis la recursion");
            return currentPos;
          }
        }
        function MoveRight(currentPos,tile) // currently works for left arrow
        {
          var lim;
          switch($('.square-container[data-position='+(currentPos)+']').data("line")) {
            case 0:
            lim = 3;
            break;
            case 1:
            lim = 7;
            break;
            case 2:
            lim = 11;
            break;
            case 3:
            lim = 15;
            break;
          }
          if ( $('.square-container[data-position='+(currentPos+1)+']').is(':parent') == false && currentPos < lim ) // no tile on your left
          {
            //console.log("je bouuge");
             $('.square-container[data-position='+(currentPos+1)+']').append(tile);
             currentPos= currentPos + 1;
             return MoveRight(currentPos, tile); //recursivity !!!! on met un return pour avoir le bon currentPos
          }
          else
          {
            //console.log("je finis la recursion");
            return currentPos;
          }
        }
        function MoveUp(currentPos,tile) // currently works for left arrow
        {
          if ( $('.square-container[data-position='+(currentPos-4)+']').is(':parent') == false && currentPos > 3 ) // no tile on your left
          {
            console.log("je bouuge");
             $('.square-container[data-position='+(currentPos-4)+']').append(tile);
             currentPos= currentPos -4;
             return MoveUp(currentPos, tile); //recursivity !!!! on met un return pour avoir le bon currentPos
          }
          else
          {
            //console.log("je finis la recursion");
            return currentPos;
          }
        }
        function MoveDown(currentPos,tile) // currently works for left arrow
        {
          if ( $('.square-container[data-position='+(currentPos+4)+']').is(':parent') == false && currentPos < 12 ) // no tile on your left
          {
            console.log("je bouuge");
             $('.square-container[data-position='+(currentPos+4)+']').append(tile);
             currentPos= currentPos +4;
             return MoveDown(currentPos, tile); //recursivity !!!! on met un return pour avoir le bon currentPos
          }
          else
          {
            //console.log("je finis la recursion");
            return currentPos;
          }
        }
        function MergeTiles(pos, tile_0, tile_1)
        {
          //console.log("on doit merger les tiles en pos"+pos);
          var newVal;
          var val1 =  +($(tile_0).text()); //converts string into int
          var val2 = +($(tile_1).text());
          newVal=val1+val2;
          $(tile_0).detach();
          $(tile_1).detach();
           $('.square-container[data-position=' + pos + ']').append("<div class='tile'>"+newVal+"</div>");
           $('.square-container[data-position=' + pos + ']').children().attr("data-merge",true);
          console.log("new merged value is "+newVal);
        }

        function Random42() //  randomly generate a 4 or a 2 . S'en servir ou pas???
        {
            var value;
            if (Math.floor((Math.random() * 2) + 1) == 1) {
                value = 2;
            } else {
                value = 4;
            }
            return value;
        }

        function FirstTiles() // makes two random tiles for the beginning of the game
        {
             var val = Random42();
             var val2 = Random42();
            var nb = Math.floor((Math.random() * 16));
            var nb2 = (nb2 = Math.floor(Math.random() * 16)) == nb ? ((nb2 + 1) % 16) : nb2; // ?: remplace un if else. (copyright Louis gecko and Stackoverflow)
            $('.square-container[data-position=' + nb + ']').append("<div class='tile'>"+val+"</div>");
            $('.square-container[data-position=' + nb2 + ']').append("<div class='tile'>"+val2+"</div>");
            $(".tile").css('width', blockSize);
            $(".tile").css('height', blockSize);
        }

        function MakeTile() // makes one random tile
        {
            var val = Random42();
            var nb = Math.floor((Math.random() * 16)); // generate random number between 0 and 15
            if ($('.square-container[data-position=' + nb + ']').is(':parent') == false) // check if div is empty
            {
                $('.square-container[data-position=' + nb + ']').append("<div class='tile'>"+val+"</div>");

                $(".tile").css('width', blockSize);
                $(".tile").css('height', blockSize);
                $(".tile").attr("data-merge",false);
            } else // if div is taken, we generate a tile on a new position that is empty
            {
                MakeTile(); // beautiful recursion
            }
        }

        function MakeGrid() // makes the 16 little divs et sets their datat attributes
        {
            for (var i = 0; i < 16; i++) // we set the data positions (O to 15)
            {
                $("#board").append("<div data-position=" + i + " class='square-container'></div>");
            }
            for (var i=0; i < 4; i++) // we set the data lines
            {
              $('.square-container[data-position='+i+']').attr("data-line",0);
            }
            for (var i=4; i < 8; i++)
            {
              $('.square-container[data-position='+i+']').attr("data-line",1);
            }
            for (var i=8; i < 12; i++)
            {
              $('.square-container[data-position='+i+']').attr("data-line",2);
            }
            for (var i=12; i < 16; i++)
            {
              $('.square-container[data-position='+i+']').attr("data-line",3);
            }
            for (var i=0; i < 13; i=i+4) // we set the data columns
            {
              $('.square-container[data-position='+i+']').attr("data-columns",0);
            }
            for (var i=1; i < 14; i=i+4)
            {
              $('.square-container[data-position='+i+']').attr("data-columns",1);
            }
            for (var i=2; i < 15; i=i+4)
            {
              $('.square-container[data-position='+i+']').attr("data-columns",2);
            }
            for (var i=3; i < 16; i=i+4)
            {
              $('.square-container[data-position='+i+']').attr("data-columns",3);
            }

            $(".square-container").css('width', blockSize);
            $(".square-container").css('height', blockSize);
        }

        function MakeBoard(obj) //makes the big div
        {
            obj.append("<div id='board'></div>");
            $("#board").css('width', boardSize);
            $("#board").css('height', boardSize);

        };
    };
    $("div").mygame(150);
}(jQuery));
