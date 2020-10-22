let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //cols
    [0, 4, 8],
    [2, 4, 6] //diags
]; //just for reference
$(document).ready(() => {
    setScoreBoard();
    let x = true;
    let i = 0;
    let gameOver = false;
    let playerOneScore = 0;
    let playerTwoScore = 0;
    console.log("DOM ready");

    $(window).resize(function () {
        setScoreBoard();
    });

    function setScoreBoard(){
        if (window.innerWidth < 780) {
            $('#playerOneScoreLabel').html('P1');
            $('#playerTwoScoreLabel').html('P2');
        } else {
            $('#playerOneScoreLabel').html('Player 1');
            $('#playerTwoScoreLabel').html('Player 2');
        }
    }

    $("body").on('DOMSubtreeModified', "#playerOneScore", function() {
        console.log("changed");
    });

    $("td.box").each(function () {
        $(this).attr('i', i++);
    });

    $('td.box').click(function changeBoxValue() {
        let box = $(this);
        if (!box.text() && !gameOver) {
            //blank box code
            let value = x ? 'X' : 'O';
            box.text(value);
            let win = checkWin(value);
            if (win)
                incrScore(x);
            x = !x;
        }
    });

    $('#restart').click(function restart() {
        console.log("restart");
        gameOver = false;
        $('td.box').empty();
    });

    function incrScore(p1win) {
        let winner;
        console.log(p1win);
        if (p1win) {
            $('#playerOneScore').text(createScore(++playerOneScore));
            winner = "player one";
        } else {
            $('#playerTwoScore').text(createScore(++playerTwoScore));
            winner = "player two";
        }
        setTimeout(alert(`${winner} won the round`),1000);
        console.log(playerOneScore);
        console.log(playerTwoScore);
    }

    function createScore(score) {
        return (score > 9) ? score : '0' + score;
    }

    function checkWin(value) {
        let boxes = $(`td.box:contains(${value})`);

        if (boxes.length > 2) {
            console.log('maybe won');

            //state of game
            let diag = new Array(0, 0);
            let col = new Array(0, 0, 0);
            let row = new Array(0, 0, 0);

            //tracking the state with naive approach
            boxes.each((index, elem) => {
                let i = $(elem).attr('i');
                //for diagonal condition
                (i == 4) ? (++diag[0], ++diag[1]) :
                    ((i % 4 == 0) ? ++diag[0] :
                        ((i % 2 == 0) ? ++diag[1] : console.log("not diagonal")));
                //for column condition
                //console.log(`i : ${i}`);
                (i < 3) ? ++row[0] : ((i < 6) ? ++row[1] : ((i < 9) ? ++row[2] : console.log("not row")));
                //for column condition
                ++col[i % 3];
            });

            //checking win condition
            if (diag.some(d => d > 2) || col.some(c => c > 2) || row.some(r => r > 2)) {
                console.log(`cols : ${col}`);
                console.log(`rows : ${row}`);
                console.log(`diag : ${diag}`);
                console.log(`${value} : won`);
                gameOver = true;
                return gameOver;
            }
        } else {
            return false;
        }
    }
});