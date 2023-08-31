

const body = document.body
const headerHamburger = document.querySelector("[data-target='headerHamburger']")


headerHamburger.addEventListener("click", () => {
  if ( headerHamburger.getAttribute("aria-expanded")==="true" ) {
    body.classList.remove("no-scroll")
    headerHamburger.removeAttribute("aria-expanded")
  } else {
    headerHamburger.setAttribute("aria-expanded", "true")
    body.classList.add("no-scroll")
  }
})