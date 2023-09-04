import { element } from "../../utilities.js"

const createForm = element("[data-target='taskCreateForm']")


createForm.addEventListener("submit", event => {
  event.preventDefault()
})