const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLevels(json.data));

  const displayLevels = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for (const lesson of lessons) {
      const btnDiv = document.createElement("div");
      btnDiv.innerHTML = `
      <button href="" class="btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}
        </button>
      `;
      levelContainer.append(btnDiv)
    }
  };
};
loadLessons();
