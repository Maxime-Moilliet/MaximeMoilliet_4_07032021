class ReturnTop {
  /**
   * lisen scroll on body
   */
  constructor() {
    document.addEventListener('scroll', this.BuildReturnTop);
  }

  /**
   * Show ReturnTop or not show ReturnTop
   */
  BuildReturnTop() {
    const returnTop = document.getElementById('js-returnTop');
    const header = document.querySelector('.header');
    if (window.scrollY >= header.offsetHeight - 30) {
      returnTop.style.display = 'block';
      returnTop.setAttribute('aria-hidden', 'false');
    } else if (window.scrollY < header.offsetHeight - 30) {
      returnTop.style.display = 'none';
      returnTop.setAttribute('aria-hidden', 'true');
    }
  }
}

export { ReturnTop };
