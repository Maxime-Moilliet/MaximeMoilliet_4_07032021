// eslint-disable-next-line import/extensions
import { enableBodyScroll, disableBodyScroll } from './libs/body-scroll-lock.js';

/* eslint max-len: ["error", { "code": 110 }] */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["inputError", "inputValid", "validate"] }] */
class Modal {
  /**
   * Initialization Modal
   * @param {array} bdd
   * @param {string} id
   */
  constructor(bdd, id) {
    this.bdd = bdd;
    this.initModal(id);
  }

  /**
   * Initialization Modal on click open Modal
   * @param {string} id
   */
  initModal(id) {
    // eslint-disable-next-line eqeqeq
    const photographer = this.bdd.photographers.filter((el) => el.id == id);
    const name = document.querySelector('.modal__title');
    name.innerHTML = `Contactez-moi <br/>${photographer[0].name}`;
    const btns = document.querySelectorAll('#js-modal');
    const modal = document.querySelector('.modal');
    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.openModal(e, modal);
        // eslint-disable-next-line no-shadow
        window.addEventListener('keyup', (e) => {
          if (e.key === 'Esc' || e.key === 'Escape') {
            if (this.element.getAttribute('aria-hidden') === 'false') {
              this.closeModal(e);
            }
          }
        });
      });
    });
    document.getElementById('js-submit').setAttribute('disabled', 'true');
    const form = document.getElementById('js-form');
    const inputs = [
      document.getElementById('first'),
      document.getElementById('last'),
      document.getElementById('mail'),
      document.getElementById('area'),
    ];
    form.addEventListener('change', (e) => {
      e.preventDefault();
      this.validateText(inputs[0], 'prénom');
      this.validateText(inputs[1], 'nom');
      this.validateMail(inputs[2]);
      this.validateArea(inputs[3]);
      this.validate(inputs);
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('js-form').style.display = 'none';
      document.getElementById('modalTitle').style.display = 'none';
      document.querySelector('.modal__formValid').style.display = 'block';
      // eslint-disable-next-line no-console
      console.log(`Nom du photographe : ${photographer[0].name}`);
      // eslint-disable-next-line no-console
      console.log(`input prénom : ${inputs[0].value}`);
      // eslint-disable-next-line no-console
      console.log(`input nom : ${inputs[1].value}`);
      // eslint-disable-next-line no-console
      console.log(`input mail : ${inputs[2].value}`);
      // eslint-disable-next-line no-console
      console.log(`input textarea : ${inputs[3].value}`);
    });
  }

  /**
   * Open Modal
   * @param {event} e
   * @param {HTMLElement} element
   */
  openModal(e, element) {
    e.preventDefault();
    this.element = element;
    this.changeDisplay();
    this.changeArias();
    disableBodyScroll(this.element);
    this.close = document.querySelector('#js-modalClose');
    this.closeModal = this.closeModal.bind(this);
    this.close.addEventListener('click', this.closeModal);
  }

  /**
   * Change Aria Modal
   */
  changeArias() {
    if (this.element.getAttribute('aria-hidden') === 'true') {
      this.element.setAttribute('aria-hidden', 'false');
      this.element.setAttribute('aria-modal', 'true');
    } else {
      this.element.setAttribute('aria-hidden', 'true');
      this.element.setAttribute('aria-modal', 'false');
    }
  }

  /**
   * Change display Modal
   */
  changeDisplay() {
    if (this.element.style.display === 'none') {
      this.element.style.display = 'flex';
    } else {
      this.element.style.display = 'none';
    }
  }

  /**
   * Close Modal
   */
  closeModal() {
    this.changeArias();
    enableBodyScroll(this.element);
    window.setTimeout(() => {
      this.changeDisplay();
    }, 500);
    this.close.removeEventListener('click', this.closeModal);
  }

  /**
   * Validate input type string (firstname...)
   * @param {HTMLElement} input
   * @param {string} name
   */
  validateText(input, name) {
    this.inputValidate(
      input,
      '^[a-zA-Z- ]{3,20}$',
      `Veuillez remplir le champs ${name}`,
      'Le champs doit contenir que des lettres et avoir au moins 3 caractères',
    );
  }

  /**
   * Validate input mail
   * @param {HTMLElement} input
   */
  validateMail(input) {
    this.inputValidate(
      input,
      '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
      'Veuillez remplir le champs mail',
      'Veuillez entrer une adresse mail valide',
    );
  }

  /**
   * Validate input area
   * @param {HTMLElement} input
   */
  validateArea(input) {
    this.inputValidate(
      input,
      '',
      'Veuillez remplir le champs de text',
      'Le champs doit contenir au moins 10 caractères',
    );
  }

  /**
   * Validate is empty ?
   * @param {HTMLElement} input
   * @param {string} regexp
   * @param {string} textEmpty
   * @param {string} textNoValid
   * @returns inputError or continue script
   */
  inputValidate(input, regexp, textEmpty, textNoValid) {
    if (input.value.trim() === '') {
      return this.inputError(input, textEmpty);
    }
    return this.inputRegExp(input, regexp, textNoValid);
  }

  /**
   * Validate pattern input value
   * @param {HTMLElement} input
   * @param {string} regexp
   * @param {string} text
   * @returns
   */
  inputRegExp(input, regexp, text) {
    const reg = new RegExp(regexp, 'g');

    if (reg.test(input.value)) {
      return this.inputValid(input);
    }
    return this.inputError(input, text);
  }

  /**
   * Show Error
   * @param {HTMLElement} input
   * @param {string} text
   * @returns error
   */
  inputError(input, text) {
    const inputError = input;
    inputError.parentNode.dataset.error = text;
    inputError.parentNode.dataset.errorVisible = 'true';
  }

  /**
   * Remove all text error
   * @param {HTMLElemnt} input
   * @returns
   */
  inputValid(input) {
    const inputValid = input;
    inputValid.parentNode.dataset.error = '';
    inputValid.parentNode.dataset.errorVisible = 'false';
  }

  /**
   * checks if all the inputs is valid and start animation
   * @param {HTMLElements} inputs
   */
  validate(inputs) {
    let validateInputs = 0;
    inputs.forEach((input) => {
      if (input.parentNode.dataset.error === '') {
        validateInputs += 1;
      }
    });
    if (inputs.length === validateInputs) {
      document.getElementById('js-submit').removeAttribute('disabled');
    }
  }
}

export { Modal };
