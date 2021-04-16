import {
  enableBodyScroll,
  disableBodyScroll,
} from './libs/body-scroll-lock.js';

class Lightbox {
  /**
   * Initialization Lightbox of the click
   * @param {array} bdd
   */
  constructor(bdd) {
    this.bdd = bdd;
    const images = Array.from(document.querySelectorAll('#js-galleryImg'));
    images.forEach((image) => {
      image.addEventListener('click', (e) => {
        const images2 = Array.from(document.querySelectorAll('#js-galleryImg'));
        images2.sort((a, b) => {
          a = a.dataset.order;
          b = b.dataset.order;
          return a > b ? 1 : -1;
        });
        const galleryAlts = images2.map((image) => image.dataset.alt);
        const galleryImages = images2.map((image) => image.getAttribute('src'));
        const galleryTitles = images2.map((image) => image.dataset.title);
        this.InitLightbox(
          e.currentTarget.getAttribute('src'),
          e.currentTarget.getAttribute('alt'),
          galleryImages,
          galleryTitles,
          galleryAlts,
        );
      });
    });
  }

  /**
   * Initialization Lightbox
   * @param {HTMLAttribute} url
   * @param {HTMLAttribute} alt
   * @param {array} images
   * @param {array} titles
   * @param {array} alts
   */
  InitLightbox(url, alt, images, titles, alts) {
    this.images = images;
    this.titles = titles;
    this.alts = alts;
    this.element = this.buildLightbox();
    const titleValue = this.bdd.media.filter((el) => el.alt === alt)[0].title;
    const { photographerId } = this.bdd.media.filter((el) => el.alt === alt)[0];
    this.videoPath = null;
    const { video } = this.bdd.media.filter((el) => el.photographerId === photographerId && el.image === undefined)[0];
    if (photographerId === 82) {
      this.videoPath = `/photos/Tracy/${video}`;
    } else if (photographerId === 243) {
      this.videoPath = `./photos/Mimi/${video}`;
    } else if (photographerId === 925) {
      this.videoPath = `./photos/Rhode/${video}`;
    } else if (photographerId === 527) {
      this.videoPath = `./photos/Nabeel/${video}`;
    } else if (photographerId === 195) {
      this.videoPath = `./photos/Marcel/${video}`;
    } else if (photographerId === 930) {
      this.videoPath = `./photos/Ellie-Rose/${video}`;
    }
    this.loadMedia(url, titleValue, alt);
    document.body.appendChild(this.element);
    this.onKeyUp = this.onKeyUp.bind(this);
    disableBodyScroll(this.element);
    document.addEventListener('keyup', this.onKeyUp);
  }

  /**
   * Viewing a media
   * @param {HTMLAttribute} url
   * @param {string} titleValue
   * @param {HTMLAttribute} alt
   */
  loadMedia(url, titleValue, alt) {
    this.url = null;
    this.title = null;
    this.alt = null;
    const container = this.element.querySelector('.lightbox__container');
    const title = document.createElement('h2');
    title.classList.add('lightbox__title');
    title.innerHTML = titleValue;
    const image = new Image();
    image.classList.add('lightbox__img');
    image.src = url;
    image.alt = alt;
    container.innerHTML = '';
    image.onload = () => {
      container.prepend(image);
      container.appendChild(title);
      this.url = url;
      this.title = titleValue;
      this.alt = alt;
    };
    if (url === './photos/miniature/video.jpg') {
      container.innerHTML = '';
      image.style.display = 'none';
      const videoPlayer = document.createElement('video');
      videoPlayer.setAttribute('controls', '');
      videoPlayer.setAttribute('autoplay', '');
      videoPlayer.setAttribute('loop', '');
      videoPlayer.style.maxWidth = '100%';
      videoPlayer.style.maxHeight = 'calc(100vh - 150px)';
      const source = document.createElement('source');
      source.setAttribute('src', this.videoPath);
      source.setAttribute('type', 'video/mp4');
      container.appendChild(videoPlayer);
      videoPlayer.appendChild(source);
      container.appendChild(title);
      // const videoPlayer = document.createElement('iframe');
      // videoPlayer.setAttribute('src', 'https://www.youtube.com/embed/5AE9lZSoCf8');
      // videoPlayer.setAttribute('title', 'chevaux');
      // videoPlayer.setAttribute('width', '1200px');
      // videoPlayer.setAttribute('height', '600px');
      // videoPlayer.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      // videoPlayer.setAttribute('allowfullscreen', '')
      // container.appendChild(videoPlayer);
      this.url = url;
      this.title = titleValue;
      this.alt = alt;
    }
  }

  /**
   * Build DOM Lightbox
   * @returns DOM
   */
  buildLightbox() {
    const dom = document.createElement('aside');
    dom.classList.add('lightbox');
    dom.innerHTML = '<i class=\'fas fa-chevron-left lightbox__prev\'></i><div class=\'lightbox__center\'><div class=\'lightbox__container\'></div><i class=\'fas fa-times lightbox__close\'></i></div><i class=\'fas fa-chevron-right lightbox__next\'></i>';
    dom
      .querySelector('.lightbox__close')
      .addEventListener('click', this.closeLightbox.bind(this));
    dom
      .querySelector('.lightbox__next')
      .addEventListener('click', this.next.bind(this));
    dom
      .querySelector('.lightbox__prev')
      .addEventListener('click', this.prev.bind(this));
    return dom;
  }

  /**
   * Close Lightbox
   */
  closeLightbox() {
    this.element.classList.add('lightboxOut');
    enableBodyScroll(this.element);
    window.setTimeout(() => {
      this.element.parentNode.removeChild(this.element);
    }, 300);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  /**
   * listen to the event keydown
   * @param {event} e
   */
  onKeyUp(e) {
    if (e.key === 'Esc' || e.key === 'Escape') {
      this.closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      this.prev(e);
    } else if (e.key === 'ArrowRight') {
      this.next(e);
    }
  }

  /**
   * go to the next media
   * @param {event} e
   */
  next(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    this.loadMedia(this.images[i + 1], this.titles[i + 1], this.alts[i + 1]);
  }

  /**
   * go to the prev media
   * @param {event} e
   */
  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    this.loadMedia(this.images[i - 1], this.titles[i - 1], this.alts[i - 1]);
  }
}

export { Lightbox };
