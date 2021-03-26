class PhotographerProfile {
  constructor(bdd, id) {
    this.bdd = bdd;
    const select = document.querySelectorAll("#js-filter");
    select.forEach((option) => {
      addEventListener("click", () => {
        this.filterOption(option.value);
        console.log(option.value)
      });
    });
    this.filterBdd(id);
  }

  filterBdd(id) {
    const photographer = this.bdd.photographers.filter((el) => el.id == id);
    const medias = this.bdd.media.filter((el) => el.photographerId == id);
    this.sortMedias(medias, "init");
    this.buildBanner(photographer);
    this.buildGallery(medias);
  }

  filterOption(value) {
    const cards = document.querySelectorAll(".cardGallery");
    this.flipInit();
    this.flipRead(cards);
    if (value === "0") {
      this.sortMedias(this.cards, "popularity");
      this.ChangeGallery(this.cards);
    } else if (value === "1") {
      this.sortMedias(this.cards, "date");
      this.ChangeGallery(this.cards);
    } else if (value === "2") {
      this.sortMedias(this.cards, "title");
      this.ChangeGallery(this.cards);
    }
    this.flipPlay(this.cards);
  }

  buildBanner(photographer) {
    const name = document.querySelector(".banner__title");
    const location = document.querySelector(".banner__location");
    const description = document.querySelector(".banner__description");
    const tagContainer = document.querySelector(".banner__tags");
    const image = document.querySelector(".banner__img");

    name.innerHTML = photographer[0].name;
    location.innerHTML = photographer[0].city + ", " + photographer[0].country;
    description.innerHTML = photographer[0].tagline;
    image.setAttribute(
      "src",
      "./photos/PhotographersIDPhotos/" + photographer[0].portrait
    );

    photographer[0].tags.forEach((el) => {
      let li = document.createElement("li");
      let link = document.createElement("a");
      link.setAttribute("href", "/?tag=" + el);
      let tag = document.createElement("span");
      tag.setAttribute("class", "tag__item");
      tag.setAttribute("id", "js-tag");
      tag.innerHTML = "#" + el;

      tagContainer.appendChild(li);
      li.appendChild(link);
      link.appendChild(tag);
    });
  }

  LoadImage(element, urlImage, media) {
    const link = document.createElement("a");
    const image = new Image();
    const loader = document.createElement("div");
    link.setAttribute("href", "#");
    element.prepend(link);
    loader.classList.add("loader");
    image.src = urlImage;
    image.setAttribute("id", "js-galleryImg");
    image.setAttribute("class", "cardGallery__img");
    image.setAttribute("alt", media.alt);
    link.prepend(loader);
    image.onload = () => {
      link.prepend(image);
      link.removeChild(loader);
    };
  }

  buildGallery(medias) {
    this.cards = [];
    medias.forEach((media, i) => {
      const card = document.createElement("article");
      card.setAttribute("id", media.id);
      card.setAttribute("data-order", i);
      card.setAttribute("data-title", media.title);
      card.setAttribute("data-likes", media.likes);
      card.setAttribute("data-date", media.date);
      let galleryUrl = null;
      if (media.photographerId === 243) {
        galleryUrl = "./photos/Mimi/" + media.image;
      } else if (media.photographerId === 930) {
        galleryUrl = "./photos/Ellie-Rose/" + media.image;
      } else if (media.photographerId === 82) {
        galleryUrl = "./photos/Tracy/" + media.image;
      } else if (media.photographerId === 527) {
        galleryUrl = "./photos/Nabeel/" + media.image;
      } else if (media.photographerId === 925) {
        galleryUrl = "./photos/Rhode/" + media.image;
      } else if (media.photographerId === 195) {
        galleryUrl = "./photos/Marcel/" + media.image;
      }
      card.setAttribute("class", "cardGallery");
      card.innerHTML =
        '<div class="cardGallery__content"><h3 id="js-title" class="cardGallery__title">' +
        media.title +
        '</h3><div class="cardGallery__body"><p class="cardGallery__price">' +
        media.price +
        ' €</p><p class="cardGallery__likes" id="#' +
        media.id +
        '">' +
        media.likes +
        '</p><a href="#' +
        media.id +
        '" class="cardGallery__like"><i class="fas fa-heart cardGallery__icon" aria-label="likes"></i></a></div></div>';

      this.LoadImage(card, galleryUrl, media);
      this.cards.push(card);
    });
    const gallery = document.querySelector("#js-container");
    this.cards.forEach((card) => {
      gallery.appendChild(card);
    });
  }

  ChangeGallery(gallery) {
    gallery.forEach((media, i) => {
      this.cards[i].dataset.order = i;
    });
  }

  sortMedias(array, text) {
    if (text === "init") {
      return array.sort((a, b) => {
        a = a.likes;
        b = b.likes;
        return b > a ? 1 : -1;
      });
    } else if (text === "popularity") {
      return array.sort((a, b) => {
        a = a.dataset.likes;
        b = b.dataset.likes;
        return b > a ? 1 : -1;
      });
    } else if (text === "date") {
      return array.sort((a, b) => {
        a = new Date(a.dataset.date);
        b = new Date(b.dataset.date);
        return a > b ? 1 : -1;
      });
    } else if (text === "title") {
      return array.sort((a, b) => {
        a = a.dataset.title;
        b = b.dataset.title;
        return a > b ? 1 : -1;
      });
    }
  }

  flipInit() {
    (this.duration = 500), (this.positions = {});
  }

  flipRead(elements) {
    elements.forEach((element) => {
      const id = element.getAttribute("id");
      this.positions[id] = element.getBoundingClientRect();
    });
  }

  flipPlay(elements) {
    elements.forEach((element) => {
      const id = element.getAttribute("id");
      const newPosition = element.getBoundingClientRect();
      const oldPosition = this.positions[id];
      const deltaX = oldPosition.x - newPosition.x;
      const deltaY = oldPosition.y - newPosition.y;
      element.animate(
        [
          {
            transform: "translate(" + deltaX + "px, " + deltaY + "px)",
          },
          {
            transform: "none",
          },
        ],
        {
          duration: this.duration,
          easing: "ease-in-out",
          fill: "both",
        }
      );
      element.style.transform = "translate(" + deltaX + "px, " + deltaY + "px)";
    });
  }
}

export { PhotographerProfile };
