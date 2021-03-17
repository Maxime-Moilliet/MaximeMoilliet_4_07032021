class PhotographerProfile {
  constructor(bdd) {
    this.bdd = bdd;
    const url = new URLSearchParams(window.location.search);
    let id = null;

    let idIsValid = false;
    this.bdd.photographers.forEach((photographer) => {
      const photographerId = photographer.id;
      if (photographerId === parseInt(url.get("id"))) {
        idIsValid = true;
      }
    });
    if (url.get("id") == null || idIsValid === false) {
      id = "243";
    } else {
      id = url.get("id");
    }
    this.filterBdd(id);
  }

  filterBdd(id) {
    const photographer = this.bdd.photographers.filter((el) => el.id == id);
    const medias = this.bdd.media.filter((el) => el.photographerId == id);
    this.buildBanner(photographer);
    this.buildGallery(medias);
    this.buildInfo(medias, photographer);
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

  LoadImage(element, urlImage) {
    const link = document.createElement("a");
    const image = new Image();
    const loader = document.createElement("div");
    link.setAttribute("href", "#");
    element.prepend(link);
    loader.classList.add("loader");
    image.src = urlImage;
    image.setAttribute("id", "js-galleryImg");
    image.setAttribute("class", "cardGallery__img");
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
      const galleryPrice = media.price;
      const galleryLikes = media.likes;
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
        '<div class="cardGallery__content"><h3 class="cardGallery__title">Arc-en-ciel</h3><div class="cardGallery__body"><p class="cardGallery__price">' +
        galleryPrice +
        ' €</p><p class="cardGallery__likes">' +
        galleryLikes +
        '</p><i class="fas fa-heart cardGallery__icon" aria-label="likes"></i></div></div>';

      this.LoadImage(card, galleryUrl);
      gallery.appendChild(card);
    });
  }

  buildInfo(medias, photographer) {
    let likes = null;
    medias.forEach((media) => {
      likes += media.likes;
    });
    const infoLikes = document.getElementById("js-infoLikes");
    const infoPrice = document.getElementById("js-infoPrice");
    infoLikes.innerHTML =
      likes + ' <i class="fas fa-heart info__icon" aria-label="likes">';
    infoPrice.innerHTML = photographer[0].price + "€ / jour";
  }
}

export { PhotographerProfile };
