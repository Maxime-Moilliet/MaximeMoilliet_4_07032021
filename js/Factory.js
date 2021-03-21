import { bdd } from "./bdd.js";
import { PhotographerProfile } from "./PhotographerProfile.js";
import { Lightbox } from "./Lightbox.js";
import { Modal } from "./Modal.js";
import { Likes } from "./Likes.js";

class Factory {
  constructor() {
    let classType;
    this.create = function (type, id) {
      if (type === "PhotographerProfile") {
        classType = new PhotographerProfile(bdd, id);
      } else if (type === "Lightbox") {
        classType = new Lightbox(bdd);
      } else if (type === "Modal") {
        classType = new Modal(bdd, id);
      } else if (type === "Likes") {
        classType = new Likes(bdd, id);
      }
      return classType;
    };
  }
}

const url = new URL(window.location.href);
if (
  url.pathname === "/photographer-profile.html" ||
  url.pathname === "/MaximeMoilliet_4_07032021/photographer-profile"
) {
  const url = new URLSearchParams(window.location.search);
  let id = null;

  let idIsValid = false;
  bdd.photographers.forEach((photographer) => {
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

  const factory = new Factory();
  factory.create("PhotographerProfile", id);

  window.onload = () => {
    factory.create("Lightbox");
    factory.create("Modal", id);
    factory.create("Likes", id);
  };
}
