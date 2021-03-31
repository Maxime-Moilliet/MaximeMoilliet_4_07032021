import { bdd } from "./bdd.js";
import { PhotographerProfile } from "./PhotographerProfile.js";
import { Lightbox } from "./Lightbox.js";
import { Modal } from "./Modal.js";
import { Likes } from "./Likes.js";
import { PhotographerAccueil } from "./PhotographerAccueil.js";
import { ReturnTop } from "./ReturnTop.js";

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
      } else if (type === "PhotographerAccueil") {
        classType = new PhotographerAccueil(bdd);
      } else if (type === "ReturnTop") {
        classType = new ReturnTop();
      }
      return classType;
    };
  }
}

const factory = new Factory();
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

  factory.create("PhotographerProfile", id);

  window.onload = () => {
    const script = document.createElement("script");
    script.setAttribute("src", "./js/customSelect.js");
    script.setAttribute("async", "true");
    script.setAttribute("type", "text/javascript");
    const elt = document.getElementsByTagName("script")[0];
    elt.parentNode.appendChild(script);

    factory.create("Lightbox");
    factory.create("Modal", id);
    factory.create("Likes", id);
  };
} else if (
  url.pathname === "/" ||
  url.pathname === "/index.html" ||
  url.pathname === "/MaximeMoilliet_4_07032021/"
  ) {
    window.onload = () => {
      factory.create("PhotographerAccueil");
      factory.create("ReturnTop");
  };
}
