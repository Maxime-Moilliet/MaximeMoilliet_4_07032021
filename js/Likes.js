class Likes {
  constructor(bdd, id) {
    const likes = document.querySelectorAll(".cardGallery__like");
    let IsLiked = false;
    this.buildInfo(bdd, id, IsLiked)
    likes.forEach((like) => {
      like.addEventListener("click", (e) => {
        const likeId = like.getAttribute("href");
        this.addLike(e, bdd, likeId.slice(1), id);
        IsLiked = true;
        this.buildInfo(bdd, id, IsLiked)
      });
    });
  }

  addLike(e, bdd, likeId, id) {
    e.preventDefault();
    const like = bdd.media.filter((el) => el.id == likeId);
    like[0].likes = like[0].likes + 1;
    const countLikes = document.querySelectorAll(".cardGallery__likes");
    const countLikeId = [];
    countLikes.forEach((countLike) => {
      const countLikeID = countLike.getAttribute("id");
      countLikeId.push(parseInt(countLikeID.slice(1)));
    });
    const countLike = countLikeId.filter(
      (el) => el == parseInt(parseInt(like[0].id))
    );
    const likeText = document.getElementById("#" + countLike);
    likeText.innerHTML = like[0].likes;
  }

  buildInfo(bdd, id, IsLiked) {
    
    const photographer = bdd.photographers.filter((el) => el.id == id);
    const medias = bdd.media.filter((el) => el.photographerId == id);
    let likes = null;
    medias.forEach((media) => {
      likes += media.likes;
    });
    if(IsLiked === true) {
      likes + 1
    }
    const infoLikes = document.getElementById("js-infoLikes");
    const infoPrice = document.getElementById("js-infoPrice");
    infoLikes.innerHTML =
      likes + ' <i class="fas fa-heart info__icon" aria-label="likes">';
    infoPrice.innerHTML = photographer[0].price + "€ / jour";
  }
}

export { Likes };
