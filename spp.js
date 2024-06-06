window.addEventListener("DOMContentLoaded", () => {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  const playerDisplay = document.querySelector(".displayplayer");
  const announcer = document.querySelector(".hide");
  const resetBtn = document.querySelector(".reset-btn");

  const winningChances = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let game = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = false;

  init();

  function init() {
    tiles.forEach((tile) => tile.addEventListener("click", boxClick));
    playerDisplay.innerHTML = currentPlayer;
    isGameActive = true;
    resetBtn.addEventListener("click", resetGame);
  }

  function boxClick() {
    let tileIndex = this.dataset.index;
    if (game[tileIndex] !== "" || !isGameActive) {
      //gameactive false irundhuchuna & game array empty ya illana vom intha condition work agum
      alert("Please Choose empty tile");
      return;
    }
    updateBox(this, tileIndex);
    checkWinner();
  }

  function changePlayer() {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    playerDisplay.innerHTML = currentPlayer;
  }

  function updateBox(tile, index) {
    game[index] = currentPlayer;
    tile.innerHTML = currentPlayer;
  }

  function checkWinner() {
    let isWon = false;
    for (let i = 0; i < winningChances.length; i++) {
      const condition = winningChances[i]; // if 'i' has the value of 0 then the winning chances value is [0,1,2]
      const tile1 = game[condition[0]]; // ippa condition array la [0,1,2] vandhuchuna indha variable adhoda 1st index value va store panro;
      const tile2 = game[condition[1]];
      const tile3 = game[condition[2]];

      if (tile1 == "" || tile2 == "" || tile3 == "") {
        continue; // continue means intha condition satisfy aachuna it backs to init() function
      }

      if (tile1 == tile2 && tile2 == tile3) {
        isWon = true;
        tiles[condition[0]].classList.add("win");
        tiles[condition[1]].classList.add("win");
        tiles[condition[2]].classList.add("win");
      }
    }
    if (isWon) {
      announcer.classList.remove("hide");
      announcer.innerHTML = `${currentPlayer} Won the Match`;
      isGameActive = false;
    } else if (!game.includes("")) {
      announcer.innerHTML = `Game Draw :)`;
      isGameActive = false;
    } else {
      changePlayer();
    }
  }

  function resetGame() {
    game = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = false;
    alert("clicked");
    announcer.classList.add("hide");
  }
});
