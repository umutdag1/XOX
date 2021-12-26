createEnvironment();
playGame();

function createEnvironment() {
    const mainEnv = document.getElementById("mainEnv");
    const squareCount = 9;
    for (let i = 0; i < squareCount; i++) {
        const newSquare = document.createElement("div");
        const imgElem = document.createElement("img");
        imgElem.src = "../XOX/assets/images/Blank.png";
        imgElem.classList.add("XO");
        newSquare.appendChild(imgElem);
        newSquare.classList.add("square");
        mainEnv.appendChild(newSquare);
    }
}

function checkTurn() {
    let turn = "O";
    return function () {
        if (turn === "X") {
            turn = "O";
        } else {
            turn = "X";
        }
        return turn;
    }
}

function setAndgetSquareArr() {
    const squareArr = [
        0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    const mainEnv = document.getElementById("mainEnv");
    const mainEnvSubSquares = mainEnv.getElementsByClassName("square");
    return function () {
        for (let i = 0; i < mainEnvSubSquares.length; i++) {
            if (squareArr[i] != 0) {
                continue;
            }
            const imgElem = mainEnvSubSquares[i].getElementsByClassName("XO")[0];
            const imgSrcStr = imgElem.src;
            const imgLastWord = imgSrcStr.slice(imgSrcStr.lastIndexOf("/") + 1);
            if (imgLastWord === 'X.png' || imgLastWord === 'O.png') {
                squareArr[i] = imgLastWord[0];
            }
        }

        return squareArr;
    }
}

function checkSquareArr(arr) {
    let winnerStatus = ``;
    if (arr[0] != 0 && arr[0] == arr[3] && arr[3] == arr[6]) {
        winnerStatus = `Winner ${arr[0]}`;
    } else if (arr[0] != 0 && arr[0] == arr[4] && arr[4] == arr[8]) {
        winnerStatus = `Winner ${arr[0]}`;
    } else if (arr[0] != 0 && arr[0] == arr[1] && arr[1] == arr[2]) {
        winnerStatus = `Winner ${arr[0]}`;
    } else if (arr[3] != 0 && arr[3] == arr[4] && arr[4] == arr[5]) {
        winnerStatus = `Winner ${arr[3]}`;
    } else if (arr[6] != 0 && arr[6] == arr[7] && arr[7] == arr[8]) {
        winnerStatus = `Winner ${arr[6]}`;
    } else if (arr[6] != 0 && arr[6] == arr[4] && arr[4] == arr[2]) {
        winnerStatus = `Winner ${arr[6]}`;
    } else if (arr[7] != 0 && arr[7] == arr[4] && arr[4] == arr[1]) {
        winnerStatus = `Winner ${arr[7]}`;
    } else if (arr[8] != 0 && arr[8] == arr[5] && arr[5] == arr[2]) {
        winnerStatus = `Winner ${arr[8]}`;
    } else {
        const isEverySquareFilled = arr.every((elem) => typeof elem === "string");
        if (isEverySquareFilled) {
            winnerStatus = `Tie! No Winner`;
        }
    }
    if (winnerStatus) {
        const infoElem = document.getElementById("playerTurnInfo");
        infoElem.innerText = winnerStatus;
        setTimeout(function () { alert(winnerStatus); }, 1);
        return 1;
    } else {
        return 0;
    }

}

function playGame() {
    const mainEnv = document.getElementById("mainEnv");
    const mainEnvSubSquares = mainEnv.getElementsByClassName("square");
    let turn = checkTurn();
    let endStatus = 0;
    let updateStatus = setAndgetSquareArr();
    for (square of mainEnvSubSquares) {
        square.addEventListener("click", playTurn);
    }

    function playTurn(e) {
        if (endStatus == 0) {
            const parentElem = e.target.parentNode;
            if (parentElem.className == 'square') {
                const imgElem = e.target;
                const imgSrcStr = imgElem.src;
                if (imgSrcStr.slice(imgSrcStr.lastIndexOf("/") + 1) === "Blank.png") {
                    const turnOfPlayer = turn();
                    const infoElem = document.getElementById("playerTurnInfo");
                    if (turnOfPlayer == 'X') {
                        imgElem.src = "../XOX/assets/images/X.png";
                        infoElem.innerText = 'O turn';
                    } else {
                        imgElem.src = "../XOX/assets/images/O.png";
                        infoElem.innerText = 'X turn';
                    }
                    endStatus = checkSquareArr(updateStatus());
                    setTimeout(function () {
                        if (endStatus == 1) {
                            const getUserRequest = confirm('Do you want to play again ?');
                            if(getUserRequest){
                                location.reload();
                            }
                        }
                    },0);
                }
            }
        }
    }
}

