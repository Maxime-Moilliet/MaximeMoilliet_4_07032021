class ReturnTop {
  constructor() {
    document.addEventListener("scroll", this.BuildReturnTop);
}

  BuildReturnTop() {
    const returnTop = document.getElementById("js-returnTop");
    const header = document.querySelector(".header");
    if (window.scrollY >= header.offsetHeight - 30) {
      returnTop.style.top = "10px";
    } else if (window.scrollY < header.offsetHeight - 30) {
      returnTop.style.top = "-100px";
    }
  }

}

export { ReturnTop };
