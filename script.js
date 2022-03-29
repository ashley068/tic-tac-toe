let count = 0,
  rows = [0, 0, 0],
  cols = [0, 0, 0],
  diag = 0,
  anti_diagonal = 0,
  player;
const message = document.getElementById("winner");

function playerClicked(i, j, element) {
  if (
    element.style.backgroundColor != "yellow" &&
    element.style.backgroundColor != "red"
  ) {
    count++;
    player = count % 2 ? 1 : -1;
    if (player === 1) {
      element.style.backgroundColor = "yellow";
    } else if (player === -1) {
      element.style.backgroundColor = "red";
    }
    rows[i] += player;
    cols[j] += player;
    if (i === j) diag += player;
    if (i + j === 2) anti_diagonal += player;

    if ([rows[i], cols[j], diag, anti_diagonal].includes(3)) {
      message.innerHTML = "Player1 wins!!";
      TimeoutFunction();
      return;
    } else if ([rows[i], cols[j], diag, anti_diagonal].includes(-3)) {
      message.innerHTML = "Player2 wins!!";
      TimeoutFunction();
      return;
    }
    if (count === 9) {
      message.innerHTML = "draw";
      TimeoutFunction();
    }
  }
}
let gameTimeout;
function TimeoutFunction() {
  clearTimeout(gameTimeout);
  gameTimeout = setTimeout(() => {
    location.reload();
  }, 2000);
}
