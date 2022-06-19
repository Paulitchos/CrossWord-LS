import checkIfCompleted from "./checkIfCompleted";

function checkIfIsClicked(clickedLetters, letraKey) {
  //console.log(clickedLetters);
  const letraHasBeenClicked = clickedLetters === letraKey;
  //console.log(clickedLetters.key !== letraKey);
  //const letraHasBeenCompleted = checkIfCompleted(completedLetters, letraKey);

  if (letraHasBeenClicked) {
    return true;
  }
  return false;
}

export default checkIfIsClicked;
