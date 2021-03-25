import {
  enableBodyScroll,
  disableBodyScroll,
} from "./libs/body-scroll-lock.js";

class Modal {
  constructor(bdd, id) {
    this.bdd = bdd;
    this.initModal(id);
  }

  initModal(id) {
    const photographer = this.bdd.photographers.filter((el) => el.id == id);
    const name = document.querySelector(".modal__title");
    name.innerHTML = "Contactez-moi <br/>" + photographer[0].name;
    const btns = document.querySelectorAll("#js-modal");
    const modal = document.querySelector(".modal");

    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.openModal(e, modal);
        window.addEventListener("keyup", (e) => {
          if (e.key === "Esc" || e.key === "Escape") {
            if (this.element.getAttribute("aria-hidden") == "false") {
              this.closeModal(e);
            }
          }
        });
      });
    });
    document.getElementById("js-submit").setAttribute("disabled", "true");
    const form = document.getElementById("js-form");
    const inputs = [
      document.getElementById("first"),
      document.getElementById("last"),
      document.getElementById("mail"),
      document.getElementById("area"),
    ];
    form.addEventListener("change", (e) => {
      e.preventDefault();
      this.validateText(inputs[0], "prénom");
      this.validateText(inputs[1], "nom");
      this.validateMail(inputs[2]);
      this.validateArea(inputs[3]);
      this.validate(inputs);
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      document.getElementById("js-form").style.display = "none";
      document.getElementById("modalTitle").style.display = "none";
      document.querySelector(".modal__formValid").style.display = "block";
      console.log("Nom du photographe : " + photographer[0].name)
      console.log("input prénom : " + inputs[0].value)
      console.log("input nom : " + inputs[1].value)
      console.log("input mail : " + inputs[2].value)
      console.log("input textarea : " + inputs[3].value)
    })
  }

  openModal(e, element) {
    e.preventDefault();
    this.element = element;
    this.changeDisplay();
    this.changeArias();
    disableBodyScroll(this.element);
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
    enableBodyScroll(this.element);
    window.setTimeout(() => {
      this.changeDisplay();
    }, 500);
    this.close.removeEventListener("click", this.closeModal);
  }

  validateText(input, name) {
    this.inputValidate(
      input,
      "^[a-zA-Z- ]{3,20}$",
      "Veuillez remplir le champs " + name,
      "Le champs doit contenir que des lettres et avoir au moins 3 caractères"
    );
  }

  validateMail(input) {
    this.inputValidate(
      input,
      "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
      "Veuillez remplir le champs mail",
      "Veuillez entrer une adresse mail valide"
    );
  }

  validateArea(input) {
    this.inputValidate(
      input,
      "^[a-zA-Z0-9*-_ éèâàç&.'=+:()[]|/]{10,1000}$",
      "Veuillez remplir le champs de text",
      "Le champs doit contenir au moins 10 caractères"
    );
  }

  inputValidate(input, regexp, textEmpty, textNoValid) {
    if (input.value.trim() === "") {
      return this.inputError(input, textEmpty);
    } else {
      return this.inputRegExp(input, regexp, textNoValid);
    }
  }

  inputRegExp(input, regexp, text) {
    let reg = new RegExp(regexp, "g");

    if (reg.test(input.value)) {
      return this.inputValid(input);
    } else {
      return this.inputError(input, text);
    }
  }

  inputError(input, text) {
    return (
      (input.parentNode.dataset.error = text),
      (input.parentNode.dataset.errorVisible = "true")
    );
  }

  inputValid(input) {
    return (
      (input.parentNode.dataset.error = ""),
      (input.parentNode.dataset.errorVisible = "false")
    );
  }

  validate(inputs) {
    let validateInputs = 0;

    inputs.forEach((input) => {
      if (input.parentNode.dataset.error == "") {
        validateInputs++;
      }
    });
    if (inputs.length === validateInputs) {
      document.getElementById("js-submit").removeAttribute("disabled");
    }
  }
}

export { Modal };
