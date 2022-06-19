function checkIfCompleted(completedLetters, letraKey) {
  return completedLetters.filter((cl) => cl.key === letraKey).length > 0;
}

export default checkIfCompleted;
