let currentQuestion = { category: "", text: "", answer: "" };

const questionBank = {
  "Historia szkoły": [
    { text: "Ilu było łącznie dyrektorów szkoły?", answer: "14" },
    { text: "Jakiego zawodu była Helena Modrzejewska, patronka II LO?", answer: "Była aktorką" },
    { text: "W którym roku powstała Dwójka?", answer: "W 1919r." },
    { text: "Od kiedy istnieje w Dwójce ZSU?", answer: "Od 1978 roku" },
    { text: "Kiedy do statutu wpisano instytucję Rzecznika Praw Ucznia?", answer: "W 1997 roku" },
  ],
  "Lekcje i przerwy": [
    { text: "Ile minut trwa typowa lekcja?", answer: "45" },
    { text: "O której godzinie zwykle zaczyna się pierwsza lekcja dnia?", answer: "8:00" },
  ],
  "Wydarzenia szkolne": [
    {
      text: "Którego znanego blogera kulinarnego Dwójkowicze próbowali zaprosić na Śniadanie w Dwójce, ale się nie udało?",
      answer: "Roberta Makłowicza",
    },
    { text: "Wydarzenie szkolne, na które Dwójkowicze czekają najbardziej, to:", answer: "Studniówka" },
    { text: "Która jednodniowa akcja szkolna cieszy się największą popularnością?", answer: "Piernik dla crusha" },
    { text: "Ile pamiątkowych drzew zasadzonych z jakiejś okazji znajduje się w szkolnym ogrodzie?", answer: "Dwa" },
    {
      text: "Jak nazywa się kościół, do którego uczniowie udają się na mszę po rozpoczęciu/zakończeniu roku?",
      answer: "Michała Archanioła ul. Stolarska",
    },
  ],
  "Bufet szkolny": [
    { text: "O nazwę którego ciasta w bufecie regularnie toczy się spór między Dwójkowiczami?", answer: "Murzynka" },
    { text: "Jaka nowość pojawiła się ostatnio w menu bufetowym?", answer: "Muffinki" },
    { text: "Która część garderoby z zeszłorocznego merchu szkolnego miała nadruk cynamonki?", answer: "Skarpetki" },
    { text: "Co najczęściej kupuje w bufecie pani dyrektor?", answer: "Hot dog/ kanapka na ciepło" },
    { text: "Jaki smak kawy pojawia się w bufecie w okresie świątecznym?", answer: "Piernikowy" },
  ],
  "Ciekawostki szkolne": [
    { text: "Jak na imię ma żółw, który mieszka w sali 41?", answer: "Bogdan - BOGDANKA" },
    { text: "Ile jest szafek jest w szkolnej piwnicy?", answer: "584" },
    { text: "co znajduje się za drzwiami w szatni oznaczonymi kartką „izolatka”?", answer: "Środki czystości" },
    { text: "Co znajduje się pod parkingiem/ boiskiem szkolnym?", answer: "Miejsce na opał / koks / węgiel" },
    { text: "Jaka marka samochodów występuje w największej liczbie na parkingu szkolnym? ", answer: "Kia/skoda" },
  ],
  "Uczniowie i absolwenci": [
    {
      text: "Bar na starym rynku, w którym prawdopodobieństwo spotkania absolwenta Dwójki jest największe, to:",
      answer: " Hola Hola/Kultowa/Czekolada",
    },
    { text: "Najczęstsze wytłumaczenie spóźnienienia przez Dwójkowicza, to:", answer: "Utrudnienia komunikacyjne" },
    { text: "Jak nazywa się absolwent z największą liczbą olimpiad?", answer: "Daniel Rudzki" },
    { text: "Wymień jednego nauczyciela, który jest absolwentem Dwójki", answer: "Rzepka, Sobczak, Kozłowska, Borucka, Potoczna, Kozikowska-Górna" },
    { text: "Ilu uczniów jest w tym roku w dwójce?", answer: "544" },
  ],
  "Dwójka a sport": [
    { text: "Jakie ćwiczenie gimnastyczne sprawia dwójkowiczom największą trudność?", answer: "Wymyk i/lub odmyk" },
    { text: "Jaka dyscyplina sportowa jest najczęstszą na WF-ie w II LO?", answer: "Siatkówka" },
    { text: "Jakie miejsce zajęła w tym roku grupa Dwójkowiczek w biegu sztafetowym?", answer: "9 miejsce" },
    { text: "Jaki taniec tańczy się w dwójce podczas studniówki zaraz po polonezie?", answer: "Walc" },
    { text: "Jaką powierzchnię ma boisko w sali gimnastycznej dwójki?", answer: "162 m2" },
  ],
  "Dwójkowe sukcesy": [
    { text: "W 2023 roku dwójka zajęła 1 miejsce w Wielkopolsce w rankingu perspektyw. A które miejsce zajęła w kraju? ", answer: "22" },
    {
      text: "Jaki tytuł w 2014 roku, jako pierwsza szkoła publiczna w Polsce, otrzymała dwójka?",
      answer: "Tytuł Szkoły Przyjaznej dla Sprawiedliwego Handlu",
    },
    { text: "Z jakiej olimpiady dwójka ma najwięcej laureatów?", answer: "Z WOS-u" },
    { text: "Które miejsce w rankingu “Najlepszego nauczyciela historii” zajął prof. Robert Śniegocki?", answer: "3" },
    { text: "Ile 1 miejsc w zeszlym roku zdobyło Koło Debat Dwójki?", answer: "2" },
  ],
};

export function getQuestionState() {
  return { currentQuestion };
}

export function drawQuestion(category) {
  const questions = questionBank[category];
  const randomIndex = Math.floor(Math.random() * questions.length);
  const selectedQuestion = questions[randomIndex];
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
