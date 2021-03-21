class PhotographerProfile {
  constructor(bdd, id) {
    this.bdd = bdd;
    this.filterBdd(id);
  }

  filterBdd(id) {
    const photographer = this.bdd.photographers.filter((el) => el.id == id);
    const medias = this.bdd.media.filter((el) => el.photographerId == id);
    this.buildBanner(photographer);
    this.buildGallery(medias);
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
      link.setAttribute("href", "#");
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
    image.setAttribute("alt", media.alt)
    link.prepend(loader);
    image.onload = () => {
      link.prepend(image);
      link.removeChild(loader);
    };
  }

  buildGallery(medias) {
    const gallery = document.querySelector(".gallery");
    medias.forEach((media) => {
      const card = document.createElement("article");
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
        '<div class="cardGallery__content"><h3 id="js-title" class="cardGallery__title">' + media.title + '</h3><div class="cardGallery__body"><p class="cardGallery__price">' +
        media.price +
        ' €</p><p class="cardGallery__likes" id="#' + media.id + '">' +
        media.likes +
        '</p><a href="#' + media.id + '" class="cardGallery__like"><i class="fas fa-heart cardGallery__icon" aria-label="likes"></i></a></div></div>';

      this.LoadImage(card, galleryUrl, media);
      gallery.appendChild(card);
    });
  }
}

export { PhotographerProfile };
