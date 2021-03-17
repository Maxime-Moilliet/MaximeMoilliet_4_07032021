import { bdd } from "./bdd.js";
import { PhotographerProfile } from "./PhotographerProfile.js";
import { Lightbox } from "./Lightbox.js";

class Factory {
  constructor() {
    let Class;
    this.create = function (type) {
      if (type === "PhotographerProfile") {
        Class = new PhotographerProfile(bdd);
      } else if (type === "Lightbox") {
        Class = new Lightbox();
      }
      return Class;
    };
  }
}

const url = new URL(window.location.href)
if(url.pathname === "/photographer-profile.html") {
    const factory = new Factory();
    factory.create("PhotographerProfile");
    
    window.onload = () => {
      factory.create("Lightbox");
    };
}

