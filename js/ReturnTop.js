class ReturnTop {
  constructor() {
    document.addEventListener("scroll", this.BuildReturnTop);
}

  BuildReturnTop() {
    const returnTop = document.getElementById("js-returnTop");
    const header = document.querySelector(".header");
    if (window.scrollY >= header.offsetHeight - 30) {
      returnTop.style.display = "block";
    } else if (window.scrollY < header.offsetHeight - 30) {
      returnTop.style.display = "none"
    }
  }

}

export { ReturnTop };
