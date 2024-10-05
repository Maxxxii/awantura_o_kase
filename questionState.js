let currentQuestion = { category: "", text: "", answer: "" };
let questionBank = {
  "Historia szkoły": [
    { text: "Ile schodów znajduje się w 2LO?", answer: "24" },
    { text: "Jaka jest najdłuższą rzeką w Polsce?", answer: "Odra" },
  ],
  "Lekcje i przerwy": [
    { text: "What is the largest planet?", answer: "Jupiter" },
    { text: "How many continents are there?", answer: "7" },
  ],
  "Wydarzenia szkolne": [
    { text: "Who wrote 'Hamlet'?", answer: "Shakespeare" },
    { text: "What is the speed of light?", answer: "299,792 km/s" },
  ],
  "Bufet szkolny": [
    { text: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
    { text: "What is the smallest ocean?", answer: "Arctic Ocean" },
  ],
  "Ciekawostki szkolne": [
    { text: "What is the chemical symbol for water?", answer: "H2O" },
    { text: "How many bones are there in the human body?", answer: "206" },
  ],
  "Uczniowie i absolwenci": [
    { text: "In what year did the Titanic sink?", answer: "1912" },
    { text: "What is the square root of 64?", answer: "8" },
  ],
  "Dwójka a sport": [
    { text: "What is the hardest natural substance on Earth?", answer: "Diamond" },
    { text: "What element does 'O' represent on the periodic table?", answer: "Oxygen" },
  ],
};

// Get the current game state
export function getQuestionState() {
  return { currentQuestion };
}

// Draw a question from a category
export function drawQuestion(category) {
  const questions = questionBank[category];
  const randomIndex = Math.floor(Math.random() * questions.length);
  const selectedQuestion = questions[randomIndex];
  // Properly assign the selected question and answer
  currentQuestion.text = selectedQuestion.text;
  currentQuestion.answer = selectedQuestion.answer;
  currentQuestion.category = category;
  emitUpdate();
}

let ioInstance;

export function io(io) {
  ioInstance = io;
}

function emitUpdate() {
  if (ioInstance) {
    ioInstance.emit("updateQuestionboard", getQuestionState());
  }
}
