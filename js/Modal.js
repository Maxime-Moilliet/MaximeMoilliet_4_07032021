import {enableBodyScroll, disableBodyScroll} from'./libs/body-scroll-lock.js';

class Modal {
  constructor(bdd) {
    this.bdd = bdd;

    const url = new URLSearchParams(window.location.search);
    let idIsValid = false;
    this.bdd.photographers.forEach((photographer) => {
        const photographerId = photographer.id;
        if (photographerId === parseInt(url.get("id"))) {
            idIsValid = true;
        }   
    });

    let id = null;
    if (url.get("id") == null || idIsValid === false) {
      id = "243";
    } else {
      id = url.get("id");
    }

    this.initModal(id);
  }

  initModal(id) {
    const photographer = this.bdd.photographers.filter((el) => el.id == id);
    const name = document.querySelector('.modal__title')
    name.innerHTML = "Contactez-moi <br/>" + photographer[0].name
    const btns = document.querySelectorAll("#js-modal");
    const modal = document.querySelector(".modal");

    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.openModal(e, modal);
      });
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        if (this.element.style.display === "flex") {
          this.closeModal();
        }
      }
    });
    const form = document.getElementById("js-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("envoyer");
    });
  }

  openModal(e, element) {
    e.preventDefault();
    this.element = element;
    this.changeDisplay();
    this.changeArias();
    disableBodyScroll(this.element)
    this.close = document.querySelector("#js-modalClose");
    this.closeModal = this.closeModal.bind(this);
    this.close.addEventListener("click", this.closeModal);
  }

  changeArias() {
    if (this.element.getAttribute("aria-hidden") === "true") {
      this.element.setAttribute("aria-hidden", "false");
      this.element.setAttribute("aria-modal", "true");
    } else {
      this.element.setAttribute("aria-hidden", "true");
      this.element.setAttribute("aria-modal", "false");
    }
  }

  changeDisplay() {
    if (this.element.style.display === "none") {
      this.element.style.display = "flex";
    } else {
      this.element.style.display = "none";
    }
  }

  closeModal() {
    this.changeArias();
    window.setTimeout(() => {
      this.changeDisplay();
      enableBodyScroll(this.element)
    }, 500);
    this.close.removeEventListener("click", this.closeModal);
  }
}

export { Modal };
