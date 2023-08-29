const element = (el) => document.querySelector(el)
const elements = (els) => document.querySelectorAll(els)

// Dummy
const profileData = [
  [
    {
      title: "Email Address:",
      data: "elizabethsutton@tptutor.com"
    },
    {
      title: "Phone Number:",
      data: "(123) 456 7890"
    },
    {
      title: "Date of Birth:",
      data: 10/8/1998
    }
  ],
  [
    {
      title: "Education:",
      data: "Bachelor of Arts Major in Philosophy - Stanford University"
    },
    {
      title: "Qualification:",
      data: "Experienced, certified reading, writing, vocabulary, and grammar"
    },
    {
      title: "Certifications:",
      data: [
        "Bilingual Extension Certificate",
        "Teaching Online Certificate",
        "Education Specialist: Teacher Leader"
      ]
    },
    {
      title: "Subjects:",
      data: [
        "Math",
        "English",
        "Reading",
        "Writing",
        "Social Studies"
      ]
    },
    {
      title: "Language Spoken:",
      data: [
        "English",
        "Spanish",
        "French"
      ]
    }
  ],
  [
    {
      title: "Monday:",
      data: "5:00 AM - 2:00 PM"
    },
    {
      title: "Tuesday:",
      data: "5:00 AM - 2:00 PM"
    },
    {
      title: "Wednesday:",
      data: "5:00 AM - 2:00 PM"
    },
    {
      title: "Thursday:",
      data: "5:00 AM - 2:00 PM"
    },
    {
      title: "Friday:",
      data: "5:00 AM - 2:00 PM"
    },
    {
      title: "Saturday:",
      data: "5:00 AM - 2:00 PM"
    },
    {
      title: "Sunday:",
      data: "Unavailable"
    }
  ],
  [
    { data: "Bank of America ****1234 Bank" },
    { data: "Wells Fargo ****5678 Card" },
    
  ]
]

const profileTablist = element(".tabs__selections");
const tabsChoice = elements(".tabs__choice");
const profileHolder = element(".tabs__contents");
const tabsDataContainer = element("[data-target='tabsData']")
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

const changeTabContent = target =>{
  tabsDataContainer.innerHTML = ""
  const index = target.dataset.index
  profileHolder.setAttribute("aria-labelledby", target.id);
  profileData[index].forEach(profile => {
    const container = document.createElement('div')
    container.classList = "row px-5 mt-1"
    const heading = document.createElement("h2")
    heading.textContent = profile.title
    heading.classList = "weight-black text-dark fs-6 col-3 px-0"
    container.appendChild(heading)

    if ( Array.isArray(profile.data) ) {
      const innerContainer = document.createElement('ul')
      innerContainer.classList = "col-9 px-0"
      profile.data.forEach(data => {
        const item = document.createElement("li")
        item.classList = "col-9 fs-6 px-0 mb-1 weight-medium"
        item.textContent = data
        innerContainer.appendChild(item)
      })
      container.appendChild(innerContainer)
    } else {
      const paragraph = document.createElement('p')
      paragraph.textContent = profile.data
      paragraph.classList = "col-9 fs-6 px-0 weight-medium"
      container.appendChild(paragraph)
    }

    tabsDataContainer.appendChild(container)
  })

  if (index==3) {
  
    const addButton = document.createElement("button")
    addButton.classList = "text-white mt-2 ms-auto d-block px-5 tabs__button-add"
    addButton.textContent = "Add"
    tabsDataContainer.appendChild(addButton)
  }
}

const changeprofile = (event) =>{
  if (event.target.getAttribute("aria-selected") == "true") return

  tabsChoice.forEach(tab => tab.setAttribute("aria-selected", "false"));
  
  event.target.setAttribute("aria-selected", "true");
  profileHolder.classList.add("hide");
  changeTabContent(event.target);
  profileHolder.classList.remove("hide");
}

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