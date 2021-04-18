/* eslint class-methods-use-this: ["error", { "exceptMethods": ["buildBanner", "sortMedias"] }] */
class PhotographerProfile {
  /**
   * on click Initialize filterOption
   * @param {array} bdd
   * @param {string} id
   */
  constructor(bdd, id) {
    this.bdd = bdd;
    const select = document.querySelectorAll('#js-filter');
    // eslint-disable-next-line no-restricted-globals
    select.forEach((option) => addEventListener('click', () => {
      this.filterOption(option.value);
    }));
    this.filterBdd(id);
  }

  /**
   * Filter elements bdd
   * @param {integer} id
   */
  filterBdd(id) {
    // eslint-disable-next-line eqeqeq
    const photographer = this.bdd.photographers.filter((el) => el.id == id);
    // eslint-disable-next-line eqeqeq
    const medias = this.bdd.media.filter((el) => el.photographerId == id);
    this.sortMedias(medias, 'init');
    this.buildBanner(photographer);
    this.buildGallery(medias);
  }

  /**
   * Change the order of the elements
   * @param {HTMLElement.value} value
   */
  filterOption(value) {
    const cards = document.querySelectorAll('.cardGallery');
    this.flipInit();
    this.flipRead(cards);
    if (value === '0') {
      this.sortMedias(this.cards, 'popularity');
      this.sortMedias(this.images, 'popularity');
      this.ChangeGallery(this.cards);
      this.ChangeGallery(this.images);
    } else if (value === '1') {
      this.sortMedias(this.cards, 'date');
      this.sortMedias(this.images, 'date');
      this.ChangeGallery(this.cards);
      this.ChangeGallery(this.images);
    } else if (value === '2') {
      this.sortMedias(this.cards, 'title');
      this.sortMedias(this.images, 'title');
      this.ChangeGallery(this.cards);
      this.ChangeGallery(this.images);
    }
    this.flipPlay(this.cards);
  }

  /**
   * Buil banner photographer in DOM
   * @param {arrayElement} photographer
   */
  buildBanner(photographer) {
    const name = document.querySelector('.banner__title');
    const location = document.querySelector('.banner__location');
    const description = document.querySelector('.banner__description');
    const tagContainer = document.querySelector('.banner__tags');
    const image = document.querySelector('.banner__img');

    name.innerHTML = photographer[0].name;
    location.innerHTML = `${photographer[0].city}, ${photographer[0].country}`;
    description.innerHTML = photographer[0].tagline;
    image.setAttribute(
      'src',
      `./photos/PhotographersIDPhotos/${photographer[0].portrait}`,
    );

    photographer[0].tags.forEach((el) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.setAttribute('href', `/MaximeMoilliet_4_07032021/?tag=${el}`);
      const tag = document.createElement('span');
      tag.setAttribute('class', 'tag__item');
      tag.setAttribute('id', 'js-tag');
      tag.innerHTML = `#${el}`;

      tagContainer.appendChild(li);
      li.appendChild(link);
      link.appendChild(tag);
    });
  }

  /**
   * Load image and build image in DOM
   * @param {HTMLElement} element
   * @param {string} urlImage
   * @param {Object} media
   * @param {integer} idx
   */
  LoadImage(element, urlImage, media, idx) {
    const link = document.createElement('a');
    const image = new Image();
    const loader = document.createElement('div');
    link.setAttribute('href', '#');
    element.prepend(link);
    loader.classList.add('loader');
    image.src = urlImage;
    image.setAttribute('id', 'js-galleryImg');
    image.setAttribute('class', 'cardGallery__img');
    image.setAttribute('alt', media.alt);
    image.setAttribute('data-order', idx);
    image.setAttribute('data-likes', media.likes);
    image.setAttribute('data-date', media.date);
    image.setAttribute('data-title', media.title);
    image.setAttribute('data-alt', media.alt);
    if (urlImage === './photos/miniature/video.jpg') {
      image.setAttribute('data-url', media.id);
    }
    link.prepend(loader);
    image.onload = () => {
      link.prepend(image);
      link.removeChild(loader);
      this.images.push(image);
    };
  }

  /**
   * Build cards in DOM
   * @param {array} medias
   */
  buildGallery(medias) {
    this.cards = [];
    this.images = [];
    medias.forEach((media, idx) => {
      const card = document.createElement('article');
      card.setAttribute('id', media.id);
      card.setAttribute('data-order', idx);
      card.setAttribute('data-title', media.title);
      card.setAttribute('data-likes', media.likes);
      card.setAttribute('data-date', media.date);
      let galleryUrl = null;
      if (media.video === undefined) {
        if (media.photographerId === 243) {
          galleryUrl = `./photos/Mimi/${media.image}`;
        } else if (media.photographerId === 930) {
          galleryUrl = `./photos/Ellie-Rose/${media.image}`;
        } else if (media.photographerId === 82) {
          galleryUrl = `./photos/Tracy/${media.image}`;
        } else if (media.photographerId === 527) {
          galleryUrl = `./photos/Nabeel/${media.image}`;
        } else if (media.photographerId === 925) {
          galleryUrl = `./photos/Rhode/${media.image}`;
        } else if (media.photographerId === 195) {
          galleryUrl = `./photos/Marcel/${media.image}`;
        }
      } else {
        galleryUrl = './photos/miniature/video.jpg';
      }
      card.setAttribute('class', 'cardGallery');
      card.innerHTML = `<div class="cardGallery__content"><h3 id="js-title" class="cardGallery__title">${
        media.title
      }</h3><div class="cardGallery__body"><p class="cardGallery__price">${
        media.price
      } €</p><p class="cardGallery__likes" id="#${
        media.id
      }">${
        media.likes
      }</p><a href="#${
        media.id
      }" class="cardGallery__like"><i class="fas fa-heart cardGallery__icon" aria-label="likes"></i></a></div></div>`;
      this.LoadImage(card, galleryUrl, media, idx);
      this.cards.push(card);
    });
    const gallery = document.querySelector('#js-container');
    this.cards.forEach((card) => {
      gallery.appendChild(card);
    });
  }

  /**
   * New position HTMLElements in DOM
   * @param {HTMLElement} gallery
   */
  ChangeGallery(gallery) {
    gallery.forEach((media, i) => {
      this.cards[i].dataset.order = i;
      this.images[i].dataset.order = i;
    });
  }

  /**
   * Change the order of the elements
   * @param {array} array
   * @param {string} text
   * @returns
   */
  sortMedias(array, text) {
    if (text === 'init') {
      array.sort((a, b) => (b.likes > a.likes ? 1 : -1));
    } if (text === 'popularity') {
      array.sort((a, b) => (b.dataset.likes > a.dataset.likes ? 1 : -1));
    } if (text === 'date') {
      array.sort((a, b) => (new Date(a.dataset.date) > new Date(b.dataset.date) ? 1 : -1));
    } if (text === 'title') {
      array.sort((a, b) => (a.dataset.title > b.dataset.title ? 1 : -1));
    }
  }

  /**
   * Initialize variables
   */
  flipInit() {
    this.duration = 500;
    this.positions = {};
  }

  /**
   * Calculate the position of all elements
   * @param {HTMLElements} elements
   */
  flipRead(elements) {
    elements.forEach((element) => {
      const id = element.getAttribute('id');
      this.positions[id] = element.getBoundingClientRect();
    });
  }

  /**
   * Calculate the arrival position of all the elements and playing animation
   * @param {HTMLElements} elements
   */
  flipPlay(elements) {
    elements.forEach((element) => {
      const id = element.getAttribute('id');
      const newPosition = element.getBoundingClientRect();
      const oldPosition = this.positions[id];
      const deltaX = oldPosition.x - newPosition.x;
      const deltaY = oldPosition.y - newPosition.y;
      element.animate(
        [
          {
            transform: `translate(${deltaX}px, ${deltaY}px)`,
          },
          {
            transform: 'none',
          },
        ],
        {
          duration: this.duration,
          easing: 'ease-in-out',
          fill: 'both',
        },
      );
      // eslint-disable-next-line no-param-reassign
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
  }
}

export { PhotographerProfile };
