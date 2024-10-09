let currentQuestion = { category: "", text: "", answer: "" };
let questionBank = {
  "Historia szkoły": [
    { text: "W którym roku założono 2LO?", answer: "1960" },
    { text: "Jaki jest patron 2LO?", answer: "Jan Kochanowski" },
  ],
  "Lekcje i przerwy": [
    { text: "Ile minut trwa typowa lekcja?", answer: "45" },
    { text: "O której godzinie zwykle zaczyna się pierwsza lekcja dnia?", answer: "8:00" },
  ],
  "Wydarzenia szkolne": [
    { text: "Które wydarzenie szkolne odbywa się co roku na wiosnę?", answer: "Pokaz Talentów" },
    { text: "Jakie święto narodowe obchodzone jest w Polsce 11 listopada?", answer: "Święto Niepodległości" },
  ],
  "Bufet szkolny": [
    { text: "Jaki jest najpopularniejszy produkt sprzedawany w bufecie szkolnym?", answer: "Pizza" },
    { text: "Jaki napój jest często dostępny w bufecie szkolnym?", answer: "Sok" },
  ],
  "Ciekawostki szkolne": [
    { text: "Ile sal lekcyjnych znajduje się w głównym budynku?", answer: "30" },
    { text: "Jakie jest najwyższe drzewo rosnące na terenie szkoły?", answer: "Dąb" },
  ],
  "Uczniowie i absolwenci": [
    { text: "Który znany absolwent został politykiem krajowym?", answer: "Andrzej Nowak" },
    { text: "Kto był przewodniczącym szkoły w roku 2000?", answer: "Marek Kowalski" },
  ],
  "Dwójka a sport": [
    { text: "Który sport jest najpopularniejszy wśród uczniów?", answer: "Piłka nożna" },
    { text: "Ile medali szkoła zdobyła w ostatnich zawodach sportowych?", answer: "10" },
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
