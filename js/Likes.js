/* eslint class-methods-use-this: ["error", { "exceptMethods": ["addLike", "buildInfo"] }] */
class Likes {
  /**
   * listen to the click on button like
   * @param {array} bdd
   * @param {string} id
   */
  constructor(bdd, id) {
    const likes = document.querySelectorAll('.cardGallery__like');
    let IsLiked = false;
    this.buildInfo(bdd, id, IsLiked);
    likes.forEach((like) => {
      like.addEventListener('click', (e) => {
        const likeId = like.getAttribute('href');
        this.addLike(e, bdd, likeId.slice(1), id);
        IsLiked = true;
        this.buildInfo(bdd, id, IsLiked);
      });
    });
  }

  /**
   * add a like
   * @param {event} e
   * @param {array} bdd
   * @param {boolean} likeId
   */
  addLike(e, bdd, likeId) {
    e.preventDefault();
    // eslint-disable-next-line eqeqeq
    const like = bdd.media.filter((el) => el.id == likeId);
    like[0].likes += 1;
    const countLikes = document.querySelectorAll('.cardGallery__likes');
    const countLikeId = [];
    countLikes.forEach((countLike) => {
      const countLikeID = countLike.getAttribute('id');
      /* eslint radix: ["error", "as-needed"] */
      countLikeId.push(parseInt(countLikeID.slice(1)));
    });
    const countLike = countLikeId.filter(
      (el) => el === parseInt(parseInt(like[0].id)),
    );
    const likeText = document.getElementById(`#${countLike}`);
    likeText.innerHTML = like[0].likes;
  }

  /**
   * Build Dom info
   * @param {array} bdd
   * @param {string} id
   * @param {boolean} IsLiked
   */
  buildInfo(bdd, id, IsLiked) {
    // eslint-disable-next-line eqeqeq
    const photographer = bdd.photographers.filter((el) => el.id == id);
    // eslint-disable-next-line eqeqeq
    const medias = bdd.media.filter((el) => el.photographerId == id);
    let likes = null;
    medias.forEach((media) => {
      likes += media.likes;
    });
    if (IsLiked === true) {
      likes += 1;
    }
    const infoLikes = document.getElementById('js-infoLikes');
    const infoPrice = document.getElementById('js-infoPrice');
    infoLikes.innerHTML = `${likes} <em class="fas fa-heart info__icon" aria-label="likes"></em>`;
    infoPrice.innerHTML = `${photographer[0].price}??? / jour`;
  }
}

export { Likes };
