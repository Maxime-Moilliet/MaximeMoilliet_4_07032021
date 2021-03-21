import {
  enableBodyScroll,
  disableBodyScroll,
} from "./libs/body-scroll-lock.js";

class Lightbox {
  constructor(bdd) {
    this.bdd = bdd;
    const images = Array.from(document.querySelectorAll("#js-galleryImg"));
    const galleryImages = images.map((image) => image.getAttribute("src"));
    const galleryAlts = images.map((image) => image.getAttribute("alt"));
    const title = Array.from(document.querySelectorAll("#js-title"));
    const galleryTitles = title.map((alt) => alt.innerHTML);
    images.forEach((image) => {
      image.addEventListener("click", (e) => {
        this.InitLightbox(
          e.currentTarget.getAttribute("src"),
          e.currentTarget.getAttribute("alt"),
          galleryImages,
          galleryTitles,
          galleryAlts
        );
      });
    });
  }

  InitLightbox(url, alt, images, titles, alts) {
    this.images = images;
    this.titles = titles;
    this.alts = alts;
    this.element = this.buildLightbox(url);
    const titleValue = this.bdd.media.filter((el) => el.alt == alt)[0].title;
    this.loadImage(url, titleValue, alt);
    document.body.appendChild(this.element);
    this.onKeyUp = this.onKeyUp.bind(this);
    disableBodyScroll(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  loadImage(url, titleValue, alt) {
    this.url = null;
    this.title = null;
    this.alt = null;
    const image = new Image();
    const container = this.element.querySelector(".lightbox__container");
    const loader = document.createElement("div");
    const title = document.createElement("h2");
    title.classList.add("lightbox__title");
    title.innerHTML = titleValue;
    image.classList.add("lightbox__img");
    image.src = url;
    image.alt = alt;
    loader.classList.add("loader");
    container.innerHTML = "";
    container.prepend(loader);
    image.onload = () => {
      container.removeChild(loader);
      container.prepend(image);
      container.appendChild(title);
      this.url = url;
      this.title = titleValue;
      this.alt = alt;
    };
  }

  buildLightbox() {
    const dom = document.createElement("aside");
    dom.classList.add("lightbox");
    dom.innerHTML =
      '<i class="fas fa-chevron-left lightbox__prev"></i><div class="lightbox__center"><div class="lightbox__container"></div><i class="fas fa-times lightbox__close"></i></div><i class="fas fa-chevron-right lightbox__next"></i>';
    dom
      .querySelector(".lightbox__close")
      .addEventListener("click", this.closeLightbox.bind(this));
    dom
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox__prev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }

  closeLightbox() {
    this.element.classList.add("lightboxOut");
    enableBodyScroll(this.element);
    window.setTimeout(() => {
      this.element.parentNode.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  onKeyUp(e) {
    if (e.key == "Esc" || e.key == "Escape") {
      this.closeLightbox();
    } else if (e.key == "ArrowLeft") {
      this.prev(e);
    } else if (e.key == "ArrowRight") {
      this.next(e);
    }
  }

  next(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image == this.url);
    if (i == this.images.length - 1) {
      i = -1;
    }
    this.loadImage(this.images[i + 1], this.titles[i + 1], this.alts[i + 1]);
  }

  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image == this.url);
    if (i == 0) {
      i = this.images.length;
    }
    this.loadImage(this.images[i - 1], this.titles[i - 1], this.alts[i - 1]);
  }
}

export { Lightbox };
