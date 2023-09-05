import { TabInterface } from "../shared/tabInterface.js";
import { element } from "../utilities.js";


new TabInterface("[data-target='tabsSelection']", "[data-target='tabsChoice']", "[data-target='tabsContent']")

const form = element("[data-target='createMessage']")

form.addEventListener("submit", event => {
  event.preventDefault()
})