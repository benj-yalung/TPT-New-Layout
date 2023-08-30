const element = (el) => document.querySelector(el)
const elements = (els) => document.querySelectorAll(els)

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

const profileTablist = element(".tabs__selections");
const tabsChoice = elements(".tabs__choice");
const tabsContents = elements("[data-target='tabsContent']")
const editFormButtons = elements("[data-target='tabsEdit']")
const cancelFormButtons = elements("[data-target='formCancel']")
const saveFormButtons = elements("[data-target='formSave']")
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

// Making the tabsContent editable
editFormButtons.forEach((button, index) => {
  button.addEventListener("click", () => tabsContents[index].classList.toggle("editable"))
})

// Cancelling the editing of the form
cancelFormButtons.forEach((button, index) => {
  button.addEventListener("click", () => tabsContents[index].classList.remove("editable"))
})

// Default styling for a profile field
const createShowcaseField = ( headingName, data ) => {
  const container = document.createElement("div")
  container.classList = "row px-5 mt-2"
  const heading = document.createElement('h2')
  heading.classList = "weight-black text-dark fs-6 col-3 px-0"
  heading.textContent = headingName
  const paragraph = document.createElement("p")
  paragraph.classList = "col-9 fs-6 px-0 weight-medium"
  paragraph.textContent = data
  container.append(heading, paragraph)

  return container
}

// Default styling for a list field
const createShowcaseListField = ( headingName, data ) => {
  const container = document.createElement("div")
  container.classList = "row px-5 mt-2"
  const heading = document.createElement('h2')
  heading.classList = "weight-black text-dark fs-6 col-3 px-0"
  heading.textContent = headingName
  const list = document.createElement("ul")
  list.classList = "col-9 px-0"
  
  data.forEach(item => {
    const listItem = document.createElement("li")
    listItem.classList = "col-9 fs-6 px-0 mb-1 weight-medium"
    listItem.textContent = item
    list.append(listItem)
  })

  container.append(heading, list)

  return container
}

// Handles the form submissions
const personalInformationForm = element("[data-target='personalInformation']")

personalInformationForm.addEventListener("submit", event => {
  event.preventDefault()
  const tabsData = document.querySelector("[data-target='tabsData1']")
  element("[data-target='cEmailAddress']").textContent = event.target.email.value
  element("[data-target='cPhoneNumber']").textContent = event.target.phoneNumber.value
  element("[data-target='cDateOfBirth']").textContent = new Date(event.target.dateOfBirth.value).toLocaleDateString("en-GB")
  tabsContents[event.target.dataset.index].classList.remove("editable")
  const identification = event.target.identification

  if ( !identification.files.length ) return
  
  tabsData.append(createShowcaseField("Identification", identification.files[0].name))
})


// Education & Qualification selection
const qualification = {
  data: [
    {
      heading: "Education",
      content: "Bachelor of Arts Major in Philosophy - Stanford University",
      name: "education"
    },
    {
      heading: "Qualification",
      content: "Experienced, certified reading, writing, vocabulary, and grammar",
      name: "qualification"
    },
    {
      heading: "Certifications",
      content: [
        "Bilingual Extension Certificate",
        "Teaching Online Certificate",
        "Education Specialist: Teacher Leader"
      ],
      name: "certifications"
    },
    {
      heading: "Subjects",
      content: [
        "Math",
        "English",
        "Reading",
        "Writing",
        "Social Studies"
      ],
      name: "subjects"
    },
    {
      heading: "Language Spoken",
      content: [
        "English",
        "Spanish",
        "French"
      ],
      name: "language"
    }
  ],
  formData:[
    {
      heading: "Education",
      content: "Bachelor of Arts Major in Philosophy - Stanford University",
      name: "education",
      type: "text"
    },
    {
      heading: "Qualification",
      content: "Experienced, certified reading, writing, vocabulary, and grammar",
      name: "qualification",
      type: "text"
    },
    {
      heading: "Certifications",
      content: [
        {
          value: "Bilingual Extension Certificate",
          name: "certifications0"
        },
        {
          value: "Teaching Online Certificate",
          name: "certifications1"
        },
        {
          value: "Education Specialist: Teacher Leader",
          name: "certifications2"
        }
      ],
      name: "certifications",
      type: "text"
    },
    {
      heading: "Subjects",
      content: [
        {
          value: "Math",
          name: "subjects0"
        },
        {
          value: "English",
          name: "subjects1"
        },
        {
          value: "Reading",
          name: "subjects2"
        },
        {
          value: "Writing",
          name: "subjects3"
        },
        {
          value: "Social Studies",
          name: "subjects4"
        }
      ],
      name: "subjects",
      type: "text"
    },
    {
      heading: "Language Spoken",
      content: [
        {
          value: "English",
          name: "language0"
        },
        {
          value: "Spanish",
          name: "language1"
        },
        {
          value: "French",
          name: "language2"
        }
      ],
      name: "language",
      type: "text"
    },
    {
      heading: "Tutoring Years",
      name: "tutoringYears",
      type: "select",
      options: [
        "1-2",
        "3-5",
        "5-10",
        "10+"
      ]
    },
    {
      heading: "Teaching Years",
      name: "teachingYears",
      type: "select",
      options: [
        "1-2",
        "3-5",
        "5-10",
        "10+"
      ]
    },
    {
      heading: "Mentoring Years",
      name: "mentoringYears",
      type: "select",
      options: [
        "1-2",
        "3-5",
        "5-10",
        "10+"
      ]
    },
    {
      heading: "Field of Study",
      name: "fieldOfStudy",
      type: "text"
    },
    {
      heading: "High School English",
      name: "highSchoolEnglish",
      type: "checkbox",
      fields: [
        {
          id: "composition",
          value: "Composition"
        },
        {
          id: "literature",
          value: "Literature"
        }
      ]
    },
    {
      heading: "High School Math",
      name: "highSchoolMath",
      type: "checkbox",
      fields: [
        {
          id: "algebra",
          value: "Algebra"
        },
        {
          id: "preCalculus",
          value: "Pre-calculus"
        },
        {
          id: "highSchoolMathStatistics",
          value: "Statistics"
        },
        {
          id: "geometry",
          value: "Geometry"
        },
        {
          id: "trigonometry",
          value: "Trigonometry"
        },
        {
          id: "calculus",
          value: "Calculus"
        }
      ]
    },
    {
      heading: "High School Science",
      name: "highSchoolScience",
      type: "checkbox",
      fields: [
        {
          id: "physics",
          value: "Physics"
        },
        {
          id: "biology",
          value: "Biology"
        },
        {
          id: "chemistry",
          value: "Chemistry"
        },
        {
          id: "geology",
          value: "Geology"
        }
      ]
    },
    {
      heading: "High School Science",
      name: "highSchoolSocialStudies",
      type: "checkbox",
      fields: [
        {
          id: "worldHistory",
          value: "World History"
        },
        {
          id: "usHistory",
          value: "US History"
        },
        {
          id: "geography",
          value: "Geography"
        },
        {
          id: "highSchoolSpanish",
          value: "High School Spanish"
        },
        {
          id: "highSchoolFrench",
          value: "High School French"
        },
        {
          id: "highSchoolGerman",
          value: "High School German"
        },
        {
          id: "highSchoolMandarin",
          value: "High School Mandarin"
        }
      ]
    },
    {
      heading: "High School Other",
      name: "highSchoolOther",
      type: "text"
    },
    {
      heading: "University Humanities and Social Sciences:",
      name: "universityHUMSS",
      type: "checkbox",
      fields: [
        {
          id: "anthropology",
          value: "Anthropolgy"
        },
        {
          id: "history",
          value: "History"
        },
        {
          id: "politicalScience",
          value: "Political Science"
        },
        {
          id: "sociology",
          value: "Sociology"
        },
        {
          id: "psychology",
          value: "Psychology"
        },
        {
          id: "philosophy",
          value: "Philosophy"
        },
        {
          id: "universityHUMSSOther",
          value: "Other"
        }
      ]
    },
    {
      heading: "University Business and Law:",
      name: "universityBusinessAndLaw",
      type: "checkbox",
      fields: [
        {
          id: "economics",
          value: "Economics"
        },
        {
          id: "accounting",
          value: "Accounting"
        },
        {
          id: "marketing",
          value: "Marketing"
        },
        {
          id: "law",
          value: "Law"
        },
        {
          id: "universityBusinessAndLawStatistics",
          value: "Statistics"
        },
        {
          id: "finance",
          value: "Finance"
        },
        {
          id: "universityBusinessAndLawOther",
          value: "Other"
        }
      ]
    },
    {
      heading: "University STEM:",
      name: "universityStem",
      type: "checkbox",
      fields: [
        {
          id: "health",
          value: "Health"
        },
        {
          id: "premed",
          value: "Pre-med"
        },
        {
          id: "engineering",
          value: "Engineering"
        },
        {
          id: "universityStemCalculus",
          value: "Calculus"
        },
        {
          id: "universityStemPhysics",
          value: "Physics"
        }
      ]
    },
    {
      heading: "Test Prep/AP Classes:",
      name: "testPrepApClasses",
      type: "checkbox",
      fields: [
        {
          id: "apUsHistory",
          value: "AP US History"
        },
        {
          id: "apEuropeanHistory",
          value: "AP European History"
        },
        {
          id: "apSpanish",
          value: "AP Spanish"
        },
        {
          id: "apPsychology",
          value: "AP Psychology"
        },
        {
          id: "apBiology",
          value: "AP Biology"
        },
        {
          id: "apEnglishAndComposition",
          value: "AP English and Composition"
        },
        {
          id: "apChemistry",
          value: "AP Chemistry"
        },
        {
          id: "apEnvironmentalScience",
          value: "AP Environmental Science"
        },
        {
          id: "apCalculus",
          value: "AP Calculus"
        },
        {
          id: "apStatistics",
          value: "AP Statistics"
        },
        {
          id: "testPrepApClassesOther",
          value: "Other"
        },
        {
          id: "testPrepAct",
          value: "Test Prep ACT"
        },
        {
          id: "testPrepSat",
          value: "Test Prep SAT"
        },
        {
          id: "testPrepPsat",
          value: "Test Prep PSAT"
        },
        {
          id: "testPrepGre",
          value: "Test Prep GRE"
        },
        {
          id: "testPrepGed",
          value: "Test Prep GED"
        },
        {
          id: "testPrepLsat",
          value: "Test Prep LSAT"
        },
        {
          id: "testPrepOther",
          value: "Test Prep Other"
        }
      ]
    },
    {
      heading: "ESL (English as a Second Language):",
      name: "esl",
      type: "checkbox",
      fields: [
        {
          id: "beginner",
          value: "Beginner"
        },
        {
          id: "intermediate",
          value: "Intermediate"
        },
        {
          id: "advanced",
          value: "Advanced"
        },
        {
          id: "ielts",
          value: "IELTS"
        },
        {
          id: "toefl",
          value: "TOEFL"
        },
        {
          id: "eslOther",
          value: "Other"
        }
      ]
    },
    {
      heading: "Which group sizes do you feel comfortable leading?:",
      name: "groupSize",
      type: "checkbox",
      fields: [
        {
          id: "oneToOne",
          value: "1:1"
        },
        {
          id: "pods",
          value: "Pods (2-5 students)"
        },
        {
          id: "whole",
          value: "Whole classes (5-15 students)"
        }
      ]
    },
    {
      heading: "Please Upload Your Resume",
      name: "resume",
      type: "file"
    },
  ],
  tabsData: element("[data-target='tabsData2']"),
  form: element("[data-target='educationAndQualification']"),
  inner: element("[data-target='educationAndQualificationInner']"),
}

const renderQualificationShowcaseFields = () =>{
  qualification.data.forEach(data => {
    qualification.tabsData.append(Array.isArray(data.content)? createShowcaseListField(`${ data.heading }:`, data.content) : createShowcaseField(`${ data.heading }:`, data.content))
  })
}

const emptyQualificationForm = () => {
  qualification.inner.innerHTML = ""
}

const renderQualificationFormInner = () => {
  qualification.formData.forEach(data => {
    switch(data.type) {
      case "text":
        if ( Array.isArray(data.content) ) {
          const fieldContainer = document.createElement("fieldset")
          fieldContainer.classList = "row px-5 mt-2"
          const legend = document.createElement("legend")
          legend.classList = "weight-black text-dark fs-6 col-3 px-0"
          const fields = document.createElement("div")
          fieldContainer.classList = "col-9 px-0 fs-6"

          data.content.forEach(inputData => {
            const input = document.createElement("input") 
            input.type = "text"
            input.value = inputData.value
          })
          return
        } 
        const textFieldContainer = document.createElement("div")
        textFieldContainer.classList = "row px-5 mt-2"
        textFieldContainer.innerHTML = `
          <label class="weight-black text-dark fs-6 col-3 px-0" for="${ data.name }">${ data.heading }:</label>
          <input class="col-9 fs-6 px-0 weight-medium px-2" id="${ data.name }" name="education" type="text" value="${ data.content?? "" }">
        `
        qualification.inner.append(textFieldContainer)

        return
      case "select":
        return
      case "checkbox":
        return
    }
  })
}

// Default
renderQualificationFormInner()

const copyQualificationDataToFormData = () => {
  qualification.formData = [...qualification.data]
}

copyQualificationDataToFormData()

// Default fields
renderQualificationShowcaseFields()
renderQualificationFormInner()

// Schedule tab selection
const schedule = {
  data: [
    {
      date: "Monday",
      time: "5:00 AM - 2:00 PM"
    },
    {
      date: "Tuesday",
      time: "5:00 AM - 2:00 PM"
    },
    {
      date: "Wednesday",
      time: "5:00 AM - 2:00 PM"
    },
    {
      date: "Thursday",
      time: "5:00 AM - 2:00 PM"
    },
    {
      date: "Friday",
      time: "5:00 AM - 2:00 PM"
    },
    {
      date: "Saturday",
      time: "5:00 AM - 2:00 PM"
    },{
      date: "Sunday",
      time: "5:00 AM - 2:00 PM"
    }
  ],
  formData: [],
  tabsData: element("[data-target='tabsData3']"),
  form: element("[data-target='schedule']"),
  inner: element("[data-target='scheduleFormInner']"),
  addRowButton: element("[data-target='dateAddRow']")
}

// Copy defaultData to formData
const copyScheduleDataToFormData = () => {
  schedule.formData = [...schedule.data]
}

copyScheduleDataToFormData()

// Adds default dom
const rerenderScheduleShowcaseFields = () => {
  schedule.data.forEach(data => schedule.tabsData.append(createShowcaseField(`${data.date}:`, data.time)))
}

rerenderScheduleShowcaseFields()

const rerenderScheduleFormInner = () => {
  schedule.inner.innerHTML = ""
  
  schedule.formData.forEach((data, index) => schedule.inner.append(createEditableScheduleField(data, index)))
}

const defaultScheduleConfiguration = () => {
  schedule.form.querySelector("[data-target='formCancel']").addEventListener("click", () => {
    tabsContents[2].classList.remove("editable")
    schedule.formData = [...schedule.data]
  })

  editFormButtons[2].addEventListener("click", () =>{
    tabsContents[2].classList.add("editable")
    rerenderScheduleFormInner()
  })
}

defaultScheduleConfiguration()

// Creates single schedule form field container
const createEditableScheduleField = ( data, index ) => {
  const fieldContainer = document.createElement("div")
  fieldContainer.classList = "row ps-5 pe-3 mt-2 align-items-start"
  fieldContainer.dataset.target = "dateRow"
  fieldContainer.innerHTML = `
  <div class="col-6 row align-items-center">
    <label class="col-4 weight-black text-dark fs-6 px-0" for="schedDate${ index }">Select day:</label>
    <select class="col-7 rounded-2 py-1 weight-medium" name="schedDate${ index }" id="schedDate${ index }" data-target="scheduleSelect${ index }">
    <option value=""></option>
      <option value="Monday" ${ data.date==="Monday"? "Selected": "" }>Monday</option>
      <option value="Tuesday" ${ data.date==="Tuesday"? "Selected": "" }>Tuesday</option>
      <option value="Wednesday" ${ data.date==="Wednesday"? "Selected": "" }>Wednesday</option>
      <option value="Thursday" ${ data.date==="Thursday"? "Selected": "" }>Thursday</option>
      <option value="Friday" ${ data.date==="Friday"? "Selected": "" }>Friday</option>
      <option value="Saturday" ${ data.date==="Saturday"? "Selected": "" }>Saturday</option>
      <option value="Sunday" ${ data.date==="Sunday"? "Selected": "" }>Sunday</option>
    </select>
  </div>
  <div class="col-5 row align-items-center pe-0">
    <label class="weight-black col-2 text-dark fs-6 px-0" for="time${ index }">Time:</label>
    <input class="fs-6 col-10 px-0 weight-medium px-2" id="time${ index }" name="time${ index }" type="text" value="${ data.time }" data-target='scheduleTime${ index }'>
  </div>
  <div class="col-1 px-0">
    <button class="bg-transparent rounded-circle d-block ms-auto" type="button" data-target="removeDateRow">
      <span class="sr-only">Remove date</span>
      <svg fill="#ff3838" aria-hidden="true" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.965 27.965" xml:space="preserve" stroke="#ff3838"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c142_x"> <path d="M13.98,0C6.259,0,0,6.261,0,13.983c0,7.721,6.259,13.982,13.98,13.982c7.725,0,13.985-6.262,13.985-13.982 C27.965,6.261,21.705,0,13.98,0z M19.992,17.769l-2.227,2.224c0,0-3.523-3.78-3.786-3.78c-0.259,0-3.783,3.78-3.783,3.78 l-2.228-2.224c0,0,3.784-3.472,3.784-3.781c0-0.314-3.784-3.787-3.784-3.787l2.228-2.229c0,0,3.553,3.782,3.783,3.782 c0.232,0,3.786-3.782,3.786-3.782l2.227,2.229c0,0-3.785,3.523-3.785,3.787C16.207,14.239,19.992,17.769,19.992,17.769z"></path> </g> <g id="Capa_1_104_"> </g> </g> </g></svg>
    </button>
  </div>
  `

  fieldContainer.querySelector(`[data-target=scheduleSelect${ index }]`).addEventListener("change", event => {
    schedule.formData[index].date = event.target.value
  })

  fieldContainer.querySelector(`[data-target=scheduleTime${ index }]`).addEventListener("change", event => {
    schedule.formData[index].time = event.target.value
  })

  fieldContainer.querySelector("[data-target='removeDateRow']").addEventListener("click", () => {
    schedule.formData = schedule.formData.filter((_, filterIndex) => filterIndex!==index)
    rerenderScheduleFormInner()
  })

  return fieldContainer
}

// Adds default schedule form dom
const createDefaultScheduleFormFields = () => {
  schedule.formData.forEach(( data, index ) => schedule.inner.append(createEditableScheduleField(data, index)))
}

createDefaultScheduleFormFields()

schedule.addRowButton.addEventListener("click", () => {
  const newFormDate = {
    date: "",
    time: ""
  }
  schedule.formData.push(newFormDate)
  rerenderScheduleFormInner()
})

schedule.form.addEventListener("submit", event => {
  event.preventDefault()
  schedule.tabsData.innerHTML = ""
  tabsContents[event.target.dataset.index].classList.remove("editable")
  const hoursPerWeek = event.target.hoursPerWeek
  const hoursPerWeekDom = document.querySelector("[data-target='hoursPerWeek']")
  schedule.formData = schedule.formData.filter(data => data.date && data.time)
  schedule.data = [...schedule.formData]
  rerenderScheduleShowcaseFields()

  if ( !hoursPerWeek.value ) return

  hoursPerWeekDom.classList = "row px-5 mt-2 mx-1 pb-3"
  hoursPerWeekDom.innerHTML = `
  <h2 class="weight-black text-dark fs-6 col-3 px-0">Hours per week:</h2>
  <p class="col-9 fs-6 px-0 weight-medium">${ hoursPerWeek.value }</p>
  `
})

// Get paid tab selection
const getPaid = {
  data: [
    {
      bank: "Bank of America",
      number: "12345678",
      type: "Bank"
    },
    {
      bank: "Wells Fargo",
      number: "12345678",
      type: "Card"
    }
  ],
  formData: [],
  tabsData: element("[data-target='tabsData4']"),
  form: element("[data-target='getPaid']"),
  inner: element("[data-target='getPaidInner']"),
  addRowButton: element("[data-target='bankAddRow']")
}

const rerenderGetPaidFormInner = () => {
  getPaid.inner.innerHTML = ""
  
  getPaid.formData.forEach((data, index) => getPaid.inner.append(createEditableGetPaidField(data, index)))
}

const createEditableGetPaidField = (data, index) => {
  const fieldContainer = document.createElement("div")
  fieldContainer.classList = "row px-5 mt-2 align-items-start"
  fieldContainer.dataset.target = "dateRow"
  fieldContainer.innerHTML = `
  <div class="col-4 px-0">
    <label class="weight-black text-dark fs-6 px-0" for="bankName${ index} ">Bank name:</label>
    <input class="fs-6 px-0 weight-medium px-2" type="text" id="bankName${ index}" ${ data.bank? `value="${ data.bank }"` : "" } data-target="bankName${ index }">
  </div>
  <div class="col-4 px-0">
    <label class="col-4 weight-black text-dark fs-6 px-0" for="bankNumber${ index }">Number:</label>
    <input class="fs-6 px-0 weight-medium px-2" type="password" id="bankNumber${ index }" ${ data.number? `value="${ data.number }"` : "" } data-target="bankNumber${ index }">
  </div>
  <div class="col-3 px-0">
    <label class="col-4 weight-black text-dark fs-6 px-0" for="bankType${ index }">Type:</label>
    <select class="col-7 rounded-2 py-1 weight-medium d-block py-1 min-w-100" name="bankType${ index }" id="bankType${ index }" data-target="bankType${ index }">
      <option value=""></option>
      <option value="Bank" ${ data.type==="Bank"? "selected": "" }>Bank</option>
      <option value="Card" ${ data.type==="Card"? "selected": "" }>Card</option>
    </select>
  </div>
  <div class="col-1 px-0 mt-4">
    <button class="bg-transparent rounded-circle d-block ms-auto" type="button" data-target="removeBankRow">
      <span class="sr-only">Remove date</span>
      <svg fill="#ff3838" aria-hidden="true" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.965 27.965" xml:space="preserve" stroke="#ff3838"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c142_x"> <path d="M13.98,0C6.259,0,0,6.261,0,13.983c0,7.721,6.259,13.982,13.98,13.982c7.725,0,13.985-6.262,13.985-13.982 C27.965,6.261,21.705,0,13.98,0z M19.992,17.769l-2.227,2.224c0,0-3.523-3.78-3.786-3.78c-0.259,0-3.783,3.78-3.783,3.78 l-2.228-2.224c0,0,3.784-3.472,3.784-3.781c0-0.314-3.784-3.787-3.784-3.787l2.228-2.229c0,0,3.553,3.782,3.783,3.782 c0.232,0,3.786-3.782,3.786-3.782l2.227,2.229c0,0-3.785,3.523-3.785,3.787C16.207,14.239,19.992,17.769,19.992,17.769z"></path> </g> <g id="Capa_1_104_"> </g> </g> </g></svg>
    </button>
  </div>
  `

  fieldContainer.querySelector(`[data-target=bankName${ index }]`).addEventListener("change", event => {
    getPaid.formData[index].bank = event.target.value
  })

  fieldContainer.querySelector(`[data-target=bankNumber${ index }]`).addEventListener("change", event => {
    getPaid.formData[index].number = event.target.value
  })

  fieldContainer.querySelector(`[data-target=bankType${ index }]`).addEventListener("change", event => {
    getPaid.formData[index].type = event.target.value
  })

  fieldContainer.querySelector("[data-target=removeBankRow]").addEventListener("click", () => {
    getPaid.formData = getPaid.formData.filter((_, filterIndex) => filterIndex!==index)
    rerenderGetPaidFormInner()
  })

  return fieldContainer
}

const createShowcaseGetPaidField = ( bank, number, type ) => {
  const container = document.createElement("div")
  container.classList = "row px-5 mt-2"
  const bankHeading = document.createElement('h2')
  bankHeading.classList = "weight-black text-dark fs-6 col-4 px-0"
  bankHeading.textContent = bank
  const numberParagraph = document.createElement("p")
  numberParagraph.classList = "col-4 fs-6 px-0 weight-medium"
  numberParagraph.textContent = "****" + number.slice(4)
  const typeParagraph = document.createElement("p")
  typeParagraph.classList = "col-4 fs-6 px-0 weight-medium"
  typeParagraph.textContent = type
  container.append(bankHeading, numberParagraph, typeParagraph)
  
  return container
}

// Copy defaultData to formData
const copyGetPaidDataToFormData = () => {
  getPaid.formData = [...getPaid.data]
}

copyGetPaidDataToFormData()

getPaid.addRowButton.addEventListener("click", () => {
  const newFormData = {
    bank: "",
    number: "",
    type: ""
  }
  getPaid.formData.push(newFormData)
  rerenderGetPaidFormInner()
})

// Adds default dom
const rerenderGetPaidShowcaseFields = () => {
  getPaid.data.forEach(data => getPaid.tabsData.append(createShowcaseGetPaidField(`${data.bank}:`, data.number, data.type)))
}

rerenderGetPaidShowcaseFields()

const defaultGetPaidConfiguration = () => {
  getPaid.form.querySelector("[data-target='formCancel']").addEventListener("click", () => {
    tabsContents[3].classList.remove("editable")
    getPaid.formData = [...getPaid.data]
  })

  editFormButtons[3].addEventListener("click", () =>{
    tabsContents[3].classList.add("editable")
    rerenderGetPaidFormInner()
  })
}

defaultGetPaidConfiguration()

// Adds default schedule form dom
const createDefaultGetPaidFormFields = () => {
  getPaid.formData.forEach(( data, index ) => getPaid.inner.append(createEditableGetPaidField(data, index)))
}

createDefaultGetPaidFormFields()

getPaid.form.addEventListener("submit", event => {
  event.preventDefault()
  getPaid.tabsData.innerHTML = ""
  tabsContents[event.target.dataset.index].classList.remove("editable")
  
  getPaid.formData = getPaid.formData.filter(data => data.bank && data.number && data.type)
  getPaid.data = [...getPaid.formData]
  rerenderGetPaidShowcaseFields()
})