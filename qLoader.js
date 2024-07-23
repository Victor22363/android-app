//gets 3 questions of a given type
export function get3Questions(type) {
  let output = [];
  for (let i = 0; i < 3; i++) {
    let tempQuestion = getRandomQuestion(type);
    output.push(tempQuestion);

    // Find the index of the tempQuestion and remove it from easyQuestions
    const index = type.indexOf(tempQuestion);
    if (index !== -1) {
      type.splice(index, 1);
    }
  }
  return output;
}

//filter the json by the type
export function filterByType(questions, category, type) {
  return questions.filter(question => question[category] === type);
}

// Function to get a random question from the list
export function getRandomQuestion(questions) {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}
