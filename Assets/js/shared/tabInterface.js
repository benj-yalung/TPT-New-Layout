import { 
  element, 
  elements } from "../utilities.js"


export class TabInterface {
  tabsSelection
  tabsChoice
  tabsContents
  profileTabIndex = 0

  constructor(selection, choice, content) {
    this.tabsSelection = element(selection)
    this.tabsChoice = elements(choice)
    this.tabsContents = elements(content)
    
    this.tabsSelection.addEventListener("keydown", event => {
      if (event.keyCode == 37 || event.keyCode == 39) {
        if (event.keyCode == 37) {
          this.profileTabIndex--
          this.profileTabIndex = this.profileTabIndex < 0? 3 : this.profileTabIndex
        } else if (event.keyCode == 39) {
          this.profileTabIndex++
          this.profileTabIndex = this.profileTabIndex > 3? 0: this.profileTabIndex
        }
      }
      this.tabsChoice[this.profileTabIndex].focus()
    })
    
    // Changing the tab content
    this.tabsChoice.forEach((tabChoice, tabChoiceIndex) =>{
      tabChoice.addEventListener("click", event => {
    
        if (event.target.getAttribute("aria-selected") == "true") return
    
        this.tabsChoice.forEach(tab => tab.setAttribute("aria-selected", "false"))
        event.target.setAttribute("aria-selected", "true")
        this.tabsContents[tabChoiceIndex].classList.remove("hidden")
    
        this.tabsContents.forEach((tabContent, tabContentIndex) => {
          if ( tabContentIndex!==tabChoiceIndex ) {
            tabContent.classList.add("hidden")
            tabContent.classList.remove("editable")
          } 
        })
      })
    })
  }
}
