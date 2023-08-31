import { 
  qualificationData, 
  qualificationFormData, 
  scheduleData} from "./data.js"
import { 
  element,
  elements } from "../utilities.js"


// Changing avatar
const profileAvatar = element("[data-target=profileAvatar]")

profileAvatar.addEventListener("change", () => {
  const oFReader = new FileReader();
  oFReader.readAsDataURL(profileAvatar.files[0])

  oFReader.onload = oFREvent => {
    const avatarPreview = element("[data-target='avatarPreview']")
    avatarPreview.src = oFREvent.target.result
  };
})

// Tab interface
const tabsSelection = element("[data-target='tabsSelection']");
const tabsChoice = elements("[data-target='tabsChoice']");
const tabsContents = elements("[data-target='tabsContent']")
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
tabsSelection.addEventListener("keydown", changeTab);

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

const editFormButtons = elements("[data-target='tabsEdit']")
const cancelFormButtons = elements("[data-target='formCancel']")

// Making the tabsContent editable
editFormButtons.forEach((button, index) => {
  button.addEventListener("click", () => tabsContents[index].classList.add("editable"))
})

// Cancelling the editing of the form
cancelFormButtons.forEach((button, index) => {
  button.addEventListener("click", () => tabsContents[index].classList.remove("editable"))
})

// Default styling for a profile field
const createShowcaseField = ( headingName, data, columnWidth ) => {
  const container = Object.assign(document.createElement("div"), {
    classList: "row px-5 mt-2"
  })
  const heading = Object.assign(document.createElement('h2'), {
    classList: `weight-black text-dark fs-6 col-${ columnWidth? columnWidth[0] : 3 } px-0`,
    textContent: headingName
  })
  const paragraph = Object.assign(document.createElement("p"), {
    classList: `col-${ columnWidth? columnWidth[1] : 9 } fs-6 px-0 weight-medium`,
    textContent: data
  })
  container.append(heading, paragraph)

  return container
}

// Default styling for a list field
const createShowcaseListField = ( headingName, data, columnWidth ) => {
  const container = Object.assign(document.createElement("div"), {
    classList: "row px-5 mt-2"
  })
  const heading = Object.assign(document.createElement('h2'), {
    classList: `weight-black text-dark fs-6 col-${ columnWidth? columnWidth[0] : 3 } px-0`,
    textContent: headingName
  })
  const list = Object.assign(document.createElement("ul"), {
    classList: `col-${ columnWidth? columnWidth[1] : 9 } px-0`

  })
  data.forEach(item => {
    const listItem = Object.assign(document.createElement("li"), {
      classList: "col-9 fs-6 px-0 mb-1 weight-medium",
      textContent: item
    })
    list.append(listItem)
  })

  container.append(heading, list)

  return container
}

// Personal information selection
const personalInformation = {
  form: element("[data-target='personalInformation']"),
  tabsData: element("[data-target='tabsData1']")
}

personalInformation.form.addEventListener("submit", event => {
  event.preventDefault()
  element("[data-target='cEmailAddress']").textContent = event.target.email.value
  element("[data-target='cPhoneNumber']").textContent = event.target.phoneNumber.value
  element("[data-target='cDateOfBirth']").textContent = new Date(event.target.dateOfBirth.value).toLocaleDateString("en-GB")
  tabsContents[event.target.dataset.index].classList.remove("editable")
  const identification = event.target.identification

  if ( !identification.files.length ) return
  
  personalInformation.tabsData.append(createShowcaseField("Identification", identification.files[0].name))
})

// Education & Qualification selection
const qualification = {
  data: [ ...qualificationData ],
  showCase: [],
  formData: [...qualificationFormData],
  oldFormData: [...qualificationFormData],
  tabsData: element("[data-target='tabsData2']"),
  form: element("[data-target='educationAndQualification']"),
  inner: element("[data-target='educationAndQualificationInner']"),
}

const renderQualificationShowcaseFields = () =>{
  qualification.data.forEach(data => {
    qualification.tabsData.append(Array.isArray(data.content)? createShowcaseListField(`${ data.heading }:`, data.content, [4,8]) : createShowcaseField(`${ data.heading }:`, data.content, [4,8]))
  })
}

const emptyQualificationForm = () => {
  qualification.inner.innerHTML = ""
}

const emptyQualificationShowcase = () => {
  qualification.tabsData.innerHTML = ""
}

const renderQualificationFormInner = () => {
  qualification.formData.forEach(formData => {
    switch(formData.type) {
      case "text": {
        if ( Array.isArray(formData.content) ) {
          const fieldset = Object.assign(document.createElement("fieldset"), {
            classList: "row px-5 mt-2" 
          })
          const legend = Object.assign(document.createElement("legend"), {
            classList: "weight-black text-dark fs-6 col-3 px-0",
            textContent: formData.heading + ":"
          })
          const fields = Object.assign(document.createElement("div"), {
            classList: "col-9 fs-6 px-0"
          })

          formData.content.forEach((inputData, inputIdx) => {
            const inputContainer = Object.assign(document.createElement("div"), {
              classList: "row mx-0"
            })
            const input = Object.assign(document.createElement("input"), {
              type: "text",
              value: inputData.value,
              classList: "input__text--default d-block mb-2 px-2 weight-medium col-11",
              name: formData.name + inputIdx
            })
            input.addEventListener("change", event => {
              qualification.formData = qualification.formData.map(innerFormData => {
                if ( formData.name===innerFormData.name ) {
                  innerFormData.content = innerFormData.content.map(content => {
                    if ( inputData.id === content.id ) {
                      content.value = event.target.value
                    }

                    return content
                  })
                }

                return innerFormData
              })
            })
            const removeContainer = Object.assign(document.createElement('div'), {
              classList: "col-1 px-0"
            })
            const removeButton = Object.assign(document.createElement("button"), {
              classList: "bg-transparent rounded-circle d-block ms-auto",
              type: "button",
              innerHTML: `
              <span class="sr-only">Remove row</span>
              <svg fill="#ff3838" aria-hidden="true" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.965 27.965" xml:space="preserve" stroke="#ff3838"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c142_x"> <path d="M13.98,0C6.259,0,0,6.261,0,13.983c0,7.721,6.259,13.982,13.98,13.982c7.725,0,13.985-6.262,13.985-13.982 C27.965,6.261,21.705,0,13.98,0z M19.992,17.769l-2.227,2.224c0,0-3.523-3.78-3.786-3.78c-0.259,0-3.783,3.78-3.783,3.78 l-2.228-2.224c0,0,3.784-3.472,3.784-3.781c0-0.314-3.784-3.787-3.784-3.787l2.228-2.229c0,0,3.553,3.782,3.783,3.782 c0.232,0,3.786-3.782,3.786-3.782l2.227,2.229c0,0-3.785,3.523-3.785,3.787C16.207,14.239,19.992,17.769,19.992,17.769z"></path> </g> <g id="Capa_1_104_"> </g> </g> </g></svg>
              `
            })
            removeButton.dataset.target = "removeFieldRow"
            removeButton.addEventListener("click", () => {
              qualification.formData.map(innerFormData => {
                if ( innerFormData.name===formData.name ) {
                  innerFormData.content = formData.content.filter(content => content.id !== inputData.id)
                }

                return innerFormData
              })

              emptyQualificationForm()
              renderQualificationFormInner()
            })
            removeContainer.append(removeButton)
            inputContainer.append(input, removeContainer)

            fields.append(inputContainer)
          })

          const addRowContainer = Object.assign(document.createElement("div"), {
            classList: "d-flex my-3"
          })
          const addRowButton = Object.assign(document.createElement("button"), {
            type: "button",
            classList: "form__button bg-primary text-white rounded-2 py-1 px-2",
            textContent: "Add Row"
          })
          addRowButton.dataset.target = "fieldAddRow"
          addRowButton.addEventListener("click", () => {
            qualification.formData.map(innerFormData => {
              if ( formData.name===innerFormData.name ) {
                innerFormData.content = [...formData.content, {
                  value: "",
                  name: innerFormData.name + formData.content.length,
                  id: crypto.randomUUID()
                }]
              }

              return innerFormData
            })
            emptyQualificationForm()
            renderQualificationFormInner()
          })
          addRowContainer.append(addRowButton)

          fields.append(addRowContainer)
          fieldset.append(legend, fields)
          qualification.inner.append(fieldset)

          return
        } 

        const container = Object.assign(document.createElement("div"), {
          classList: "row px-5 mt-2",
        })
        const label = Object.assign(document.createElement("label"), {
          classList: "weight-black text-dark fs-6 col-3 px-0",
          textContent: formData.heading + ":"
        })
        label.setAttribute('for', formData.name)
        const input = Object.assign(document.createElement("input"), {
          classList: "input__text--default col-9 fs-6 px-0 weight-medium px-2",
          id: formData.name,
          name: formData.name,
          type: "text",
          value: formData.content?? ""
        })
        input.addEventListener("change", event => {
          qualification.formData = qualification.formData.map(innerFormData => {
            if ( innerFormData.name===formData.name ) {
              innerFormData.content = event.target.value
            }

            return innerFormData
          })
          
        })
        container.append(label, input)
        qualification.inner.append(container)

        return
      }
      case "select": {
        const container = Object.assign(document.createElement("div"), {
          classList: "row align-items-center px-5 mt-1"
        })
        const label = Object.assign(document.createElement("label"), {
          classList: "col-3 weight-black text-dark fs-6 px-0",
          textContent: formData.heading + ":"
        })
        label.setAttribute("for", formData.name)
        const select = Object.assign(document.createElement("select"), {
          classList: "input__text--default col-9 rounded-2 py-1 weight-medium",
          name: formData.name,
          id: formData.name
        })
        select.addEventListener("change", event => {
          qualification.formData = qualification.formData.map(innerFormData => {
            if ( innerFormData.name===formData.name ) {
              innerFormData.content = event.target.value
            }

            return innerFormData
          })
        })

        formData.options.forEach(option => {
          const optionItem = Object.assign(document.createElement("option"), {
            value: option,
            textContent: option,
          })
          optionItem.selected = option === formData.content

          select.append(optionItem)
        })

        container.append(label, select)
        qualification.inner.append(container)

        return
      }
      case "checkbox": {
        const fieldset = Object.assign(document.createElement("fieldset"), {
          classList: "row px-5 mt-2"
        })
        const legend = Object.assign(document.createElement("legend"), {
          classList: "weight-black text-dark fs-6 col-6 px-0 mb-2",
          textContent: formData.heading + ":"
        })
        const list = Object.assign(document.createElement("ul"), {
          classList: "px-0"
        })

        formData.fields.forEach((field, fieldIdx) => {
          const listItem = Object.assign(document.createElement("li"), {
            classList: "mt-1"
          })
          const input = Object.assign(document.createElement("input"), {
            classList: "me-2 rounded-2",
            type: "checkbox",
            name: formData.name,
            id: field.id,
            value: field.value
          })
          input.checked = field.selected
          input.addEventListener("change", event => {
            qualification.formData = qualification.formData.map(innerFormData => {
              if ( innerFormData.name===formData.name ) {
                innerFormData.fields = innerFormData.fields.map(innerField => {
                  if ( event.target.checked && innerField.id===event.target.id ) {
                    
                    innerField.selected = true
                  }
                  
                  return innerField
                })
              }
              
              return innerFormData
            })
          })
          const label = Object.assign(document.createElement("label"), {
            classList: "fs-6",
            textContent: field.value
          })
          label.setAttribute('for', field.id)
          listItem.append(input, label)
          list.append(listItem)
        })

        fieldset.append(legend, list)
        qualification.inner.append(fieldset)

        return
      }
      case "file": {
        const container = Object.assign(document.createElement("div"), {
          classList: "row px-5 mt-2 align-items-center"
        })
        const label = Object.assign(document.createElement("label"), {
          classList: "weight-black text-dark fs-6 col-4 px-0",
          textContent: formData.heading + ":"
        })
        label.setAttribute("for", formData.name)
        const input = Object.assign(document.createElement("input"), {
          classList: "input__text--default col-8 fs-6 px-0 weight-medium px-2",
          id: formData.name,
          name: formData.name,
          type: "file"
        })
        input.addEventListener("change", event => {
          if ( event.target.files[0] ) {
            qualification.formData = qualification.formData.map(innerFormData => {
              if ( formData.name===innerFormData.name ) {
                innerFormData.content = event.target.files[0].name
              }

              return innerFormData
            })
          }
        })
        container.append(label, input)
        qualification.inner.append(container)

        return
      }
    }
  })
}

// Default fields
renderQualificationShowcaseFields()

const defaultQualificationConfiguration = () => {
  qualification.form.querySelector("[data-target='formCancel']").addEventListener("click", () => {
    tabsContents[1].classList.remove("editable")
    qualification.formData = [...qualification.oldFormData]
    emptyQualificationShowcase()
    renderQualificationShowcaseFields()
  })

  editFormButtons[1].addEventListener("click", () =>{
    tabsContents[1].classList.add("editable")
    qualification.formData = qualification.formData.map(formData => {
      if ( formData.type==="text" && Array.isArray(formData.content) ) {
        formData.content = formData.content.filter(content => !!content.value)
      }

      return formData
    })
    qualification.oldFormData = [...qualification.formData]
    emptyQualificationForm()
    renderQualificationFormInner()
  })
}

defaultQualificationConfiguration()

qualification.form.addEventListener("submit", event => {
  event.preventDefault()
  qualification.showCase = []

  qualification.formData.forEach(formData => {
    switch(formData.type) {
      case "text": {
        const result = { heading: formData.heading }
        
        if ( Array.isArray(formData.content) ) {
          result.content = formData.content
            .filter(content => !!content.value)
            .map(content => content.value)

          if ( !result.content.length ) return

        } else if ( formData.content ) {
          result.content = formData.content
        } else {
          return
        }

        qualification.showCase.push(result)

        return
      }
      case "select": {
        if ( formData.content === "------" ) return

        qualification.showCase.push({
          heading: formData.heading,
          content: formData.content
        })

        return
      }
      case "checkbox": {
        const result = { heading: formData.showCaseHeading?? formData.heading }

        result.content = formData.fields
          .filter(field => field.selected)
          .map(field => field.value)

        if ( !result.content.length ) return

        qualification.showCase.push(result)

        return 
      }
      case "file": {
        if ( !formData.content ) return

        qualification.showCase.push({
          heading: formData.showCaseHeading?? formData.heading,
          content: formData.content
        })
        
        return
      }
    }
  })

  qualification.data = [...qualification.showCase]
  qualification.oldFormData = [...qualification.formData]

  emptyQualificationShowcase()
  renderQualificationShowcaseFields()
  tabsContents[1].classList.remove("editable")
})

// Schedule tab selection
const schedule = {
  data: scheduleData,
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
const renderScheduleShowcaseFields = () => {
  schedule.data.forEach(data => schedule.tabsData.append(createShowcaseField(`${data.date}:`, data.time)))
}

renderScheduleShowcaseFields()

const renderScheduleFormInner = () => {
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
    renderScheduleFormInner()
  })
}

defaultScheduleConfiguration()

// Creates single schedule form field container
const createEditableScheduleField = ( data, index ) => {
  const fieldContainer = Object.assign(document.createElement("div"), {
    classList: "row ps-5 pe-3 mt-2 align-items-start",
    innerHTML: `
    <div class="col-6 row align-items-center">
      <label class="col-4 weight-black text-dark fs-6 px-0" for="schedDate${ index }">Select day:</label>
      <select class="input__text--default col-7 rounded-2 py-1 weight-medium" name="schedDate${ index }" id="schedDate${ index }" data-target="scheduleSelect${ index }">
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
      <input class="input__text--default fs-6 col-10 px-0 weight-medium px-2" id="time${ index }" name="time${ index }" type="text" value="${ data.time }" data-target='scheduleTime${ index }'>
    </div>
    <div class="col-1 px-0">
      <button class="bg-transparent rounded-circle d-block ms-auto" type="button" data-target="removeDateRow">
        <span class="sr-only">Remove date</span>
        <svg fill="#ff3838" aria-hidden="true" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.965 27.965" xml:space="preserve" stroke="#ff3838"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c142_x"> <path d="M13.98,0C6.259,0,0,6.261,0,13.983c0,7.721,6.259,13.982,13.98,13.982c7.725,0,13.985-6.262,13.985-13.982 C27.965,6.261,21.705,0,13.98,0z M19.992,17.769l-2.227,2.224c0,0-3.523-3.78-3.786-3.78c-0.259,0-3.783,3.78-3.783,3.78 l-2.228-2.224c0,0,3.784-3.472,3.784-3.781c0-0.314-3.784-3.787-3.784-3.787l2.228-2.229c0,0,3.553,3.782,3.783,3.782 c0.232,0,3.786-3.782,3.786-3.782l2.227,2.229c0,0-3.785,3.523-3.785,3.787C16.207,14.239,19.992,17.769,19.992,17.769z"></path> </g> <g id="Capa_1_104_"> </g> </g> </g></svg>
      </button>
    </div>
    `
  })
  fieldContainer.dataset.target = "dateRow"

  fieldContainer.querySelector(`[data-target=scheduleSelect${ index }]`).addEventListener("change", event => {
    schedule.formData[index].date = event.target.value
  })

  fieldContainer.querySelector(`[data-target=scheduleTime${ index }]`).addEventListener("change", event => {
    schedule.formData[index].time = event.target.value
  })

  fieldContainer.querySelector("[data-target='removeDateRow']").addEventListener("click", () => {
    schedule.formData = schedule.formData.filter((_, filterIndex) => filterIndex!==index)
    renderScheduleFormInner()
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
  renderScheduleFormInner()
})

schedule.form.addEventListener("submit", event => {
  event.preventDefault()
  schedule.tabsData.innerHTML = ""
  tabsContents[event.target.dataset.index].classList.remove("editable")
  const hoursPerWeek = event.target.hoursPerWeek
  const hoursPerWeekDom = document.querySelector("[data-target='hoursPerWeek']")
  schedule.formData = schedule.formData.filter(data => data.date && data.time)
  schedule.data = [...schedule.formData]
  renderScheduleShowcaseFields()

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
  const fieldContainer = Object.assign(document.createElement("div"), {
    classList: "row px-5 mt-2 align-items-start",
    innerHTML: `
    <div class="col-4 px-0">
      <label class="weight-black text-dark fs-6 px-0" for="bankName${ index} ">Bank name:</label>
      <input class="input__text--default fs-6 px-0 weight-medium px-2" type="text" id="bankName${ index}" ${ data.bank? `value="${ data.bank }"` : "" } data-target="bankName${ index }">
    </div>
    <div class="col-4 px-0">
      <label class="col-4 weight-black text-dark fs-6 px-0" for="bankNumber${ index }">Number:</label>
      <input class="input__text--default fs-6 px-0 weight-medium px-2" type="password" id="bankNumber${ index }" ${ data.number? `value="${ data.number }"` : "" } data-target="bankNumber${ index }">
    </div>
    <div class="col-3 px-0">
      <label class="col-4 weight-black text-dark fs-6 px-0" for="bankType${ index }">Type:</label>
      <select class="input__text--default col-7 rounded-2 py-1 weight-medium d-block py-1 min-w-100" name="bankType${ index }" id="bankType${ index }" data-target="bankType${ index }">
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
  })
  fieldContainer.dataset.target = "dateRow"

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
  const container = Object.assign(document.createElement("div"), {
    classList: "row px-5 mt-2"
  })
  const bankHeading = Object.assign(document.createElement('h2'), {
    classList: "weight-black text-dark fs-6 col-4 px-0",
    textContent: bank
  })
  const numberParagraph = Object.assign(document.createElement("p"), {
    classList: "col-4 fs-6 px-0 weight-medium",
    textContent: "****" + number.slice(4)
  })
  const typeParagraph = Object.assign(document.createElement("p"), {
    classList: "col-4 fs-6 px-0 weight-medium",
    textContent: type
  })
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
const renderGetPaidShowcaseFields = () => {
  getPaid.data.forEach(data => getPaid.tabsData.append(createShowcaseGetPaidField(`${data.bank}:`, data.number, data.type)))
}

renderGetPaidShowcaseFields()

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
  renderGetPaidShowcaseFields()
})