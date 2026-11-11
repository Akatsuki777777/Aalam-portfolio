fetch("./content.json")
  .then(response => {
    if (!response.ok) throw new Error("Could not load content.json");
    return response.json();
  })
  .then(data => {
    // Profile
    document.querySelector(".logo").textContent = data.name.toUpperCase() + ".";
    document.querySelector(".hero p").textContent = data.about;

    // Projects
    const keys = ["governance", "majan", "mine"];
    const cards = document.querySelectorAll("[data-project]");

    data.projects.forEach((project, index) => {
      const card = cards[index];
      if (!card) return;

      card.querySelector("h3").textContent = project.name;
      card.querySelector("p").textContent = project.description;

      const existing = projects[keys[index]];
      if (existing) {
        existing.title = project.name;
        existing.description = project.description;
        existing.url = project.url;
      }
    });

    // Skills
    const skillRows = document.querySelectorAll("#skills .skill-row");
    data.skills.forEach((skill, index) => {
      if (!skillRows[index]) return;
      skillRows[index].children[0].textContent = skill.name;
      skillRows[index].children[1].textContent = skill.level;
    });

    // Languages
    const languageCards = document.querySelectorAll("#languages .card");
    data.languages.forEach((language, index) => {
      if (!languageCards[index]) return;
      languageCards[index].querySelector("h3").textContent = language.name;
      languageCards[index].querySelector("p").textContent = language.level;
    });

    // Professional profile links
    document.querySelector('a[href*="linkedin.com"]').href = data.profiles.linkedin;
    document.querySelector('a[href*="github.com"]').href = data.profiles.github;

    // Learning progress
    const progressRows = document.querySelectorAll("#progress .skill-row");
    const duo = data.learning.duolingo;
    const mimo = data.learning.mimo;

    [
      `${duo.streak} days`,
      duo.gems.toLocaleString(),
      duo.arabicScore,
      duo.englishScore
    ].forEach((value, index) => {
      if (progressRows[index]) progressRows[index].children[1].textContent = value;
    });

    if (progressRows[4]) {
      progressRows[4].children[1].textContent =
        `${mimo.progress}% · ${mimo.completedSections}/${mimo.totalSections}`;
    }

    if (progressRows[5]) {
      progressRows[5].children[1].textContent = `${mimo.functionsProgress}%`;
    }

    console.log("Portfolio content loaded successfully.");
  })
  .catch(error => console.error("Portfolio data error:", error));
