const element = (el) => document.querySelector(el)
const elements = (els) => document.querySelectorAll(els)

const profileTablist = element(".tabs__selections");
const tabsChoice = elements(".tabs__choice");
const tabsContents = elements("[data-target='tabsContent']")
const editFormButtons = elements("[data-target='tabsEdit']")
const cancelFormButtons = elements("[data-target='formCancel']")
const saveFormButtons = elements("[data-target='formSave']")
const dateAddRowButton = element("[data-target='dateAddRow']")
let profileTabIndex = 0;

const changeTab = event =>{
    
  if (event.keyCode == 37 || event.keyCode == 39) {
    if (event.keyCode == 37) {
      profileTabIndex--;
      profileTabIndex = profileTabIndex < 0? 3 : profileTabIndex;
    } else if (event.keyCode == 39) {
      profileTabIndex++;
      profileTabIndex = profileTabIndex > 3? 0: profileTabIndex;
    }
  }
  tabsChoice[profileTabIndex].focus();
}
// for using arrow to change tabs
profileTablist.addEventListener("keydown", changeTab);

// Changing the tab content
tabsChoice.forEach((tabChoice, tabChoiceIndex) =>{
  tabChoice.addEventListener("click", event => {

    if (event.target.getAttribute("aria-selected") == "true") return

    tabsChoice.forEach(tab => tab.setAttribute("aria-selected", "false"))
    event.target.setAttribute("aria-selected", "true")
    tabsContents[tabChoiceIndex].classList.remove("hidden")

    tabsContents.forEach((tabContent, tabContentIndex) => {
      if ( tabContentIndex!==tabChoiceIndex ) {
        tabContent.classList.add("hidden")
        tabContent.classList.remove("editable")
      } 
    })
  })
})

// Changing avatar
const previewImage = () => {
  const oFReader = new FileReader();
  const profileAvatar = element("[data-target='profileAvatar']")
  oFReader.readAsDataURL(profileAvatar.files[0])

  oFReader.onload = oFREvent => {
    const avatarPreview = element("[data-target='avatarPreview']")
    avatarPreview.src = oFREvent.target.result
  };
};

// Making the tabsContent editable
editFormButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    tabsContents[index].classList.toggle("editable")
  })
})

// Cancelling the editing of the form
cancelFormButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    tabsContents[index].classList.remove("editable")
  })
})