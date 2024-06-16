const fs = require('fs');

// Function to load questions from a JSON file
function loadQuestions(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
}
//gets 3 questions of a given type
function get3Questions(type){
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
function filterByType(questions, type) {
    return questions.filter(question => question.type === type);
}

// Function to get a random question from the list
function getRandomQuestion(questions) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

// Load questions from 'data.json'
const data = loadQuestions('data.json');

//separate the data into easy, medium and hard questions
const easyQuestions = filterByType(data, "Easy");
const mediumQuestions = filterByType(data, "Medium");
const hardQuestions = filterByType(data, "Hard");

//gets 3 random easy questions
const threeEasyQuestions = get3Questions(easyQuestions);
const threeMediumQuestions = get3Questions(mediumQuestions);
const threeHardQuestions = get3Questions(hardQuestions);


threeEasyQuestions.forEach(question =>{
    console.log(`Q: ${question.question}`);
    console.log(`a: ${question.options.a}`);
    console.log(`b: ${question.options.b}`);
    console.log(`c: ${question.options.c}`);
    console.log(`answer: ${question.correctAnswer}`);
    console.log(`type: ${question.type}`);
})

