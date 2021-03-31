class PhotographerAccueil {
  constructor(bdd) {
    this.bdd = bdd;
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
    if (url.get("tag") !== null && tagExist !== false) {
      const tag = url.get("tag");
      this.toggleClass([tag]);
    } else {
      this.toggleClass([]);
    }
    const tags = document.querySelectorAll("#js-tags");
    tags.forEach((tag) => {
      tag.addEventListener("click", this.tagClicked.bind(this));
    });
  }

  tagClicked(e) {
    e.preventDefault();
    const url = new URL(window.location.href).searchParams;
    let tagExist = url.getAll("tag");
    const addTag = e.currentTarget.dataset.name;

    if (tagExist.includes(addTag)) {
      tagExist = tagExist.filter((tag) => tag !== addTag);
    } else {
      tagExist.push(addTag);
    }

    let newUrl = "index.html";
    tagExist.forEach((tag, i) => {
      if (i === 0) {
        newUrl += `?tag=${tag}`;
      } else {
        newUrl += `&tag=${tag}`;
      }
    });
    window.history.pushState({}, "", newUrl);
    this.toggleClass(tagExist);
  }

  toggleClass(tagExist) {
    const tags = Array.from(document.querySelectorAll("#js-tags"));
    console.log(tags.filter((tag) => tag.dataset.name == "portrait"));
    tags.forEach((tag) => {
      if (tagExist.includes(tag.dataset.name)) {
        tag.classList.add("active");
      } else {
        tag.className = "tag__item";
      }
    });
    this.filterPhotographer(tagExist);
  }

  filterPhotographer(tagExist) {
    const photographersExist = this.bdd.photographers.filter((photographer) => {
      for (let i = 0; i < tagExist.length; i++) {
        if (!photographer.tags.includes(tagExist[i])) return false;
      }
      return true;
    });
    const cards = document.querySelectorAll("#js-card");
    const container = document.querySelector(".main__container");
    if (cards.length > 0) {
      cards.forEach((card) => {
        container.removeChild(card);
      });
    }
    this.buildCard(photographersExist, tagExist);
  }

  buildCard(photographersExist, tagExist) {
    photographersExist.innerHTML = "";
    const container = document.querySelector(".main__container");
    this.isBuild = true;
    photographersExist.forEach((photographer) => {
      const card = document.createElement("article");
      card.setAttribute("class", "cardPhotographer");
      card.setAttribute("id", "js-card");
      card.innerHTML = `<a href="./photographer-profile.html?id=${photographer.id}">
          <img class="cardPhotographer__img" src="./photos/PhotographersIDPhotos/${photographer.portrait}"
              alt="${photographer.alt}">
          <h2 class="cardPhotographer__name">${photographer.name}</h2>
        </a>
        <p class="cardPhotographer__location">${photographer.city}, ${photographer.country}</p>
        <p class="cardPhotographer__description">${photographer.tagline}</p>
        <p class="cardPhotographer__price">${photographer.price}€/jour</p>
        <ul class="cardPhotographer__tags">
        </ul>`;
      const ul = card.querySelector(".cardPhotographer__tags");
      photographer.tags.forEach((tag) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href=""><span class="tag__item" id="js-tags" data-name="${tag}">#${tag}</sapn></a>`;
        tagExist.forEach((tags) => {
          console.log(tags, tag);
          if (tag == tags) {
            li.setAttribute("class", "tag__item active")
          }
        });
        ul.appendChild(li);
      });
      container.appendChild(card);
    });
  }
}

export { PhotographerAccueil };
