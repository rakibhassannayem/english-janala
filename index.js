const createElements = (arr) => {
  const htmlElement = arr.map(
    (el) => `<span class="btn font-normal bg-blue-50">${el}</span>`
  );
  return htmlElement.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("btn-active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      clickedBtn.classList.add("btn-active");
      displayLevelWord(data.data);
    });
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayWordDetails(json.data));
};

const displayWordDetails = (word) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <h2 class="font-semibold text-2xl">
            ${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${
    word.pronunciation
  })
          </h2>
          <div>
            <span class="font-medium text-lg mb-2">Meaning</span>
            <p class="font-bangla text-lg">${word.meaning}</p>
          </div>
          <div>
            <span class="font-medium text-lg mb-2">Example</span>
            <p class="font-bangla text-lg">
              ${word.sentence}
            </p>
          </div>
          <div>
            <span class="font-bangla font-medium text-lg">সমার্থক শব্দ গুলো</span>
            <div class="space-x-2 mt-2">
              ${createElements(word.synonyms)}
            </div>
          </div>
  `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center p-5">
        <img class="w-20" src='./assets/alert-error.png'>
          <p class="font-bangla text-gray-500 text-lg">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। 
          </p>
          <h1 class="font-bangla font-bold text-3xl">নেক্সট Lesson এ যান</h1>
        </div>
        `;
    manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-white space-y-3 p-4 shadow-sm">
            <span class="text-2xl font-semibold">${word.word}</span>
            <p>Meaning / Pronounciation</p>
            <span class="font-bangla text-gray-900 text-2xl font-semibold">"${
              word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
            } / ${
      word.pronunciation ? word.pronunciation : "উচ্চারন পাওয়া যায়নি"
    }"</span>
            <div class="flex justify-between">
              <button onclick="loadWordDetails(${
                word.id
              })" class="bg-blue-100 p-2 rounded-lg cursor-pointer">
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button class="bg-blue-100 p-2 rounded-lg cursor-pointer">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
        `;
    wordContainer.append(card);
    manageSpinner(false);
  });
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button id="lesson-btn-${lesson.level_no}"
      onclick="loadLevelWord(${lesson.level_no})"
      class="btn btn-outline btn-primary lesson-btn">
          <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}
      </button>
      `;
    levelContainer.append(btnDiv);
  }
};

loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filteredWords = allWords.filter((word)=>word.word.toLowerCase().includes(searchValue))
      displayLevelWord(filteredWords)
    });
});
