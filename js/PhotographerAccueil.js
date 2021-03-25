class PhotographerAccueil {
  constructor(bdd) {
    const url = new URLSearchParams(window.location.search);
    let tagExist = false;
    bdd.photographers.forEach((photographer) => {
      const photographerTag = photographer.tags;
      photographerTag.forEach((tag) => {
        if (tag === url.get("tag")) {
          tagExist = true;
        }
      });
    });
    if (url.get("tag") == null || tagExist === false) {
      this.tags = [];
    } else {
      this.tags = [url.get("tag")];
      this.selectTag(this.tags);
    }
  }

  selectTag(tag) {
    const tags = [
      document.getElementById("portrait"),
      document.getElementById("art"),
      document.getElementById("fashion"),
      document.getElementById("architecture"),
      document.getElementById("travel"),
      document.getElementById("sport"),
      document.getElementById("animals"),
      document.getElementById("events"),
    ];
    tags.forEach((tags) => {
      if (tags.getAttribute("id") === tag[0]) {
        tags.classList.add("active");
      }
    });
  }
}

export { PhotographerAccueil };
