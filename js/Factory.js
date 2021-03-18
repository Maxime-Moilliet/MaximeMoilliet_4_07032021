import { bdd } from "./bdd.js";
import { PhotographerProfile } from "./PhotographerProfile.js";
import { Lightbox } from "./Lightbox.js";
import { Modal } from "./Modal.js";

class Factory {
  constructor() {
    let Class;
    this.create = function (type) {
      if (type === "PhotographerProfile") {
        Class = new PhotographerProfile(bdd);
      } else if (type === "Lightbox") {
        Class = new Lightbox();
      } else if (type === "Modal") {
        Class = new Modal(bdd);
      }
      return Class;
    };
  }
}

const url = new URL(window.location.href);
if (url.pathname === "/photographer-profile.html" || url.pathname === "/MaximeMoilliet_4_07032021/photographer-profile.html") {
  const factory = new Factory();
  factory.create("PhotographerProfile");

  window.onload = () => {
    factory.create("Lightbox");
    factory.create("Modal");
  };
}
