const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLevels(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWords(data.data));

  const displayLevelWords = (words) => {
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
      
    } else {
      words.forEach((word) => {
        const card = document.createElement("div");

        card.innerHTML = `
        <div class="card bg-white space-y-3 p-4 shadow-sm">
            <span class="text-2xl font-semibold">${word.word}</span>
            <p>Meaning /Pronounciation</p>
            <span class="font-bangla text-gray-900 text-2xl font-semibold">"${word.meaning} / ${word.pronunciation}"</span>
  
            <div class="flex justify-between">
              <button class="bg-blue-100 p-2 rounded-lg cursor-pointer">
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button class="bg-blue-100 p-2 rounded-lg cursor-pointer">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
        `;
        wordContainer.append(card);
      });
    }
  };
};

const displayLevels = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}
        </button>
      `;
    levelContainer.append(btnDiv);
  }
};

loadLessons();
