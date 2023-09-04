import { 
  personalInformationFormData,
  personalInformationShowcaseData,
  qualificationShowcaseData, 
  qualificationFormData, 
  scheduleShowcaseData, 
  getPaidShowcaseData,
  scheduleFormData,
  getPaidFormData} from "./data.js"
import { element } from "../utilities.js"
import { TabInterface } from "../shared/tabInterface.js";

 
// Changing avatar
class ProfileAvatar {
  profileAvatar = element("[data-target=profileAvatar]")
  constructor() {

  this.profileAvatar.addEventListener("change", () => {
    const oFReader = new FileReader();
    oFReader.readAsDataURL(this.profileAvatar.files[0])
    
    oFReader.onload = oFREvent => {
      const avatarPreview = element("[data-target='avatarPreview']")
      avatarPreview.src = oFREvent.target.result
      };
    })
  }
}

const profileAvatar = new ProfileAvatar()

new TabInterface("[data-target='tabsSelection']", "[data-target='tabsChoice']", "[data-target='tabsContent']")

class DomCreation {

  createShowcaseField ( headingName, data, columnWidth ) {
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

  createShowcaseListField ( headingName, data, columnWidth ) {
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

  createFormContainer (styling) {
    const container = Object.assign(document.createElement("div"), {
      classList: styling?? "row px-5 mt-2",
    })

    return container
  }

  createFormLabel ( heading, name, classList ) {
    const label = Object.assign(document.createElement("label"), {
      classList: classList?? "weight-black text-dark fs-6 col-3 px-0",
      textContent: heading + ":"
    })
    label.setAttribute('for', name)

    return label
  }

  createFormInput ( name, content, type, classList ) {
    const input = Object.assign(document.createElement("input"), {
      classList: classList?? "input__text--default col-9 fs-6 px-0 weight-medium px-2",
      id: name,
      name,
      type,
      value: content?? ""
    })

    return input
  }

  createFormLegend (heading) {
    const legend = Object.assign(document.createElement("legend"), {
      classList: "weight-black text-dark fs-6 col-3 px-0",
      textContent: heading + ":"
    })

    return legend
  }

  createFormFieldset () {
    const fieldset = Object.assign(document.createElement("fieldset"), {
      classList: "row px-5 mt-2" 
    })

    return fieldset
  }

  createFormSelect( name, classList ) {
    const select = Object.assign(document.createElement("select"), {
      name,
      id: name,
      classList: classList?? "input__text--default col-5 py-1 weight-medium"
    })

    return select
  }

  createFormButton(classList, textContent, type) {
    const button = Object.assign(document.createElement("button"), {
      type: type?? "button",
      classList,
      textContent: textContent?? ""
    })

    return button
  }
}

const domCreation = new DomCreation()

class PersonalInformation {
  showcase = [...personalInformationShowcaseData]
  formData = [...personalInformationFormData]
  oldFormData = [...personalInformationFormData]
  tabContent = element("[data-id='personalInformationTabContent']")
  tabsData = element("[data-target='tabsData1']")
  form = element("[data-target='personalInformation']")
  formInner = element("[data-target='personalInformationInner']")
  edit = element("[data-target='editPersonalInformation']")
  cancel = element("[data-target='formCancelPersonalInformation']")

  constructor() {
    this.edit.addEventListener("click", () => {
      this.tabContent.classList.add("editable")
      this.clearPersonalInformationForm()
      this.renderPersonalInformationForm()
    })
    
    this.cancel.addEventListener("click", () => {
      this.tabContent.classList.remove("editable")
      this.formData = [...this.oldFormData]
      this.clearPersonalInformationShowcase()
      this.renderPersonalInformationShowcase()
    })
    
    this.form.addEventListener("submit", event => {
      event.preventDefault()
      this.showcase = this.formData.map(formData => ({
        heading: formData.heading,
        content: formData.content
      }))
      this.oldFormData = [...this.formData]
      this.tabContent.classList.remove('editable')
      this.clearPersonalInformationShowcase()
      this.renderPersonalInformationShowcase()
    })

    this.renderPersonalInformationShowcase()
  }

  renderPersonalInformationShowcase(){
    this.showcase.forEach(data => {
      if ( !data.content || !data.heading ) return
  
      this.tabsData.append(Array.isArray(data.content)? domCreation.createShowcaseListField(`${ data.heading }:`, data.content) : domCreation.createShowcaseField(`${ data.heading }:`, data.content))
    })
  }

  renderPersonalInformationForm() {
    this.formData.forEach(formData => {
      const container = domCreation.createFormContainer()
      const label = domCreation.createFormLabel(formData.heading, formData.name)
      const input = domCreation.createFormInput(formData.name, formData.type==="file"? "" : formData.content, formData.type)
  
      input.addEventListener("change", event => {
        this.formData = this.formData.map(innerFormData => innerFormData.name===formData.name? {
          ...innerFormData,
          content: formData.type==="file" ? event.target.files[0].name : event.target.value
        } : innerFormData
        )
      })

      container.append(label, input)
      this.formInner.append(container)
    })
  }

  clearPersonalInformationShowcase () {
    this.tabsData.innerHTML = ""
  }
  
  clearPersonalInformationForm () {
    this.formInner.innerHTML = ""
  }
}

const personalInformation = new PersonalInformation()

// Education & Qualification selection
class Qualification {
  showcase = [...qualificationShowcaseData]
  formData = [...qualificationFormData]
  oldFormData = [...qualificationFormData]
  tabContent = element("[data-id='qualificationTabContent']")
  tabsData = element("[data-target='tabsData2']")
  form = element("[data-target='educationAndQualification']")
  formInner = element("[data-target='educationAndQualificationInner']")
  edit = element("[data-target='editQualification']")
  cancel = element("[data-target='formCancelQualification']")

  constructor() {
    this.edit.addEventListener("click", () =>{
      this.tabContent.classList.add("editable")
      this.emptyQualificationForm()
      this.renderQualificationForm()
    })
    
    this.cancel.addEventListener("click", () => {
      this.tabContent.classList.remove("editable")
      this.formData = [...this.oldFormData]
      this.emptyQualificationShowcase()
      this.renderQualificationShowcase()
    })
    
    this.form.addEventListener("submit", event => {
      event.preventDefault()
      this.sanitizeFormData()
      this.showcase = []
      this.oldFormData = [...this.formData]
      this.hydrateShowcaseData()
      this.tabContent.classList.remove("editable")
      this.emptyQualificationShowcase()
      this.renderQualificationShowcase()
    })

    this.renderQualificationShowcase()
  }

  sanitizeFormData() {
    this.formData = this.formData.map(formData => {
      switch(formData.type) {
        case "text": {
          if ( Array.isArray(formData.content) ) {
            return {
              ...formData,
              content: formData.content.filter(content => !!content.value )
            }
          }

          return formData
        }
        default: return formData
      }
    })
  }

  hydrateShowcaseData() {
    this.formData.forEach(formData => {
      switch(formData.type) {
        case "text": {
          if ( !formData.content || !formData.content.length ) return 

          this.showcase.push({
            heading: formData.heading,
            content: Array.isArray(formData.content)? formData.content
              .filter(content => !!content.value)
              .map(content => content.value) : formData.content
          })
  
          return
        }
        case "select": {
          if ( formData.content === "------" ) return
  
          this.showcase.push({
            heading: formData.heading,
            content: formData.content
          })
  
          return
        }
        case "checkbox": {
          const result = { 
            heading: formData.showCaseHeading?? formData.heading,
            content: formData.fields
            .filter(field => field.selected)
            .map(field => field.value)
          }

          if ( !result.content.length ) return
  
          this.showcase.push(result)
  
          return 
        }
        case "file": {
          if ( !formData.content ) return
  
          this.showcase.push({
            heading: formData.showCaseHeading?? formData.heading,
            content: formData.content
          })
          
          return
        }
      }
    })
  }

  emptyQualificationShowcase () {
    this.tabsData.innerHTML = ""
  }

  renderQualificationShowcase () {
    this.showcase.forEach(data => {
      this.tabsData.append(Array.isArray(data.content)? domCreation.createShowcaseListField(`${ data.heading }:`, data.content, [4,8]) : domCreation.createShowcaseField(`${ data.heading }:`, data.content, [4,8]))
    })
  }

  emptyQualificationForm () {
    this.formInner.innerHTML = ""
  }

  renderQualificationForm = () => {
    this.formData.forEach(formData => {
      switch(formData.type) {
        case "text": {
          if ( Array.isArray(formData.content) ) {
            const fieldset = domCreation.createFormFieldset()
            const legend = domCreation.createFormLegend(formData.heading)
            const fields = Object.assign(document.createElement("div"), {
              classList: "col-9 fs-6 px-0"
            })
  
            formData.content.forEach((inputData, inputIdx) => {
              const inputContainer = domCreation.createFormContainer("row mx-0")

              const input = domCreation.createFormInput(formData.name + inputIdx, inputData.value, "text", "input__text--default d-block mb-2 px-2 weight-medium col-11")
              input.addEventListener("change", event => {
                this.formData = this.formData.map(innerFormData => formData.name===innerFormData.name? {
                  ...innerFormData,
                  content: innerFormData.content.map(content => inputData.id === content.id? {
                    ...content,
                    value: event.target.value
                  } : content)
                } : innerFormData)
              })

              const removeContainer = domCreation.createFormContainer("col-1 px-0")

              const removeButton = domCreation.createFormButton("bg-transparent rounded-circle d-block ms-auto")
              removeButton.innerHTML = `
              <span class="sr-only">Remove row</span>
              <svg fill="#ff3838" aria-hidden="true" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.965 27.965" xml:space="preserve" stroke="#ff3838"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c142_x"> <path d="M13.98,0C6.259,0,0,6.261,0,13.983c0,7.721,6.259,13.982,13.98,13.982c7.725,0,13.985-6.262,13.985-13.982 C27.965,6.261,21.705,0,13.98,0z M19.992,17.769l-2.227,2.224c0,0-3.523-3.78-3.786-3.78c-0.259,0-3.783,3.78-3.783,3.78 l-2.228-2.224c0,0,3.784-3.472,3.784-3.781c0-0.314-3.784-3.787-3.784-3.787l2.228-2.229c0,0,3.553,3.782,3.783,3.782 c0.232,0,3.786-3.782,3.786-3.782l2.227,2.229c0,0-3.785,3.523-3.785,3.787C16.207,14.239,19.992,17.769,19.992,17.769z"></path> </g> <g id="Capa_1_104_"> </g> </g> </g></svg>
              `
              removeButton.addEventListener("click", () => {
                this.formData = this.formData.map(innerFormData => innerFormData.name===formData.name? {
                  ...innerFormData,
                  content: innerFormData.content.filter(content => content.id!==inputData.id)
                } : innerFormData)
                this.emptyQualificationForm()
                this.renderQualificationForm()
              })

              removeContainer.append(removeButton)
              inputContainer.append(input, removeContainer)
  
              fields.append(inputContainer)
            })
            const addRowContainer = domCreation.createFormContainer("d-flex my-3")

            const addRowButton = domCreation.createFormButton("form__button bg-primary text-white rounded-2 py-1 px-2", "Add Row")
            addRowButton.addEventListener("click", () => {
              this.formData = this.formData.map(innerFormData => formData.name===innerFormData.name? {
                ...innerFormData,
                content: [...innerFormData.content, {
                  value: "",
                    name: innerFormData.name + formData.content.length,
                    id: crypto.randomUUID()
                }]
              } : innerFormData)
              this.emptyQualificationForm()
              this.renderQualificationForm()
            })
            addRowContainer.append(addRowButton)
            fields.append(addRowContainer)
            fieldset.append(legend, fields)
            this.formInner.append(fieldset)
  
            return
          } 

          const container = domCreation.createFormContainer()
          const label = domCreation.createFormLabel(formData.heading, formData.name)

          const input = domCreation.createFormInput(formData.name, formData.content, formData.type)
          input.addEventListener("change", event => {
            this.formData = this.formData.map(innerFormData => innerFormData.name===formData.name? {
              ...innerFormData,
              content: event.target.value
            } : innerFormData)
          })

          container.append(label, input)
          this.formInner.append(container)
  
          return
        }
        case "select": {
          const container = domCreation.createFormContainer("row align-items-center px-5 mt-1")
          const label = domCreation.createFormLabel(formData.heading, formData.name)

          const select = domCreation.createFormSelect(formData.name, "input__text--default col-9 rounded-2 py-1 weight-medium")
          select.addEventListener("change", event => {
            this.formData = this.formData.map(innerFormData => innerFormData.name===formData.name? {
              ...innerFormData,
              content: event.target.value
            } : innerFormData)
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
          this.formInner.append(container)
  
          return
        }
        case "checkbox": {
          const fieldset = domCreation.createFormFieldset()
          const legend = domCreation.createFormLegend(formData.heading)
          const list = Object.assign(document.createElement("ul"), {
            classList: "px-0"
          })
  
          formData.fields.forEach(field => {
            const listItem = Object.assign(document.createElement("li"), {
              classList: "mt-1"
            })

            const input = domCreation.createFormInput(formData.name, field.value, "checkbox", "me-2 rounded-2")
            input.id = field.id
            input.checked = field.selected
            input.addEventListener("change", event => {
              this.formData = this.formData.map(innerFormData => innerFormData.name===formData.name? {
                ...innerFormData,
                fields: innerFormData.fields.map(innerField => event.target.checked && innerField.id===event.target.id? {
                  ...innerField,
                  selected: true
                } : innerField)
              } : innerFormData)
            })

            const label = domCreation.createFormLabel(field.value, field.id, "fs-6")

            listItem.append(input, label)
            list.append(listItem)
          })
  
          fieldset.append(legend, list)
          this.formInner.append(fieldset)
  
          return
        }
        case "file": {
          const container = domCreation.createFormContainer("row px-5 mt-2 align-items-center")
          const label = domCreation.createFormLabel(formData.heading, formData.name, "weight-black text-dark fs-6 col-4 px-0")
          
          const input = domCreation.createFormInput(formData.name, "", "file", "input__text--default col-8 fs-6 px-0 weight-medium px-2")
          input.addEventListener("change", event => {
            if ( !event.target.files[0] ) return

            this.formData = this.formData.map(innerFormData => formData.name===innerFormData.name? {
              ...innerFormData,
              content: event.target.files[0].name
            } : innerFormData)
          })

          container.append(label, input)
          this.formInner.append(container)
  
          return
        }
      }
    })
  }
}

const qualification = new Qualification()

// Schedule tab selection
class Schedule {
  showcase = [...scheduleShowcaseData]
  formData = [...scheduleFormData]
  oldFormData = [...scheduleFormData]
  tabContent = element("[data-id='scheduleTabContent']")
  tabsData = element("[data-target='tabsData3']")
  form = element("[data-target='schedule']")
  formInner = element("[data-target='scheduleFormInner']")
  inner = element("[data-target='scheduleFormInner']")
  edit = element("[data-target='editSchedule']")
  cancel = element("[data-target='formCancelSchedule']")

  constructor() {
    this.edit.addEventListener("click", () =>{
      this.tabContent.classList.add("editable")
      this.emptyScheduleForm()
      this.renderScheduleForm()
    })
    
    this.cancel.addEventListener("click", () => {
      this.tabContent.classList.remove("editable")
      this.formData = [...this.oldFormData]
    })
    
    this.form.addEventListener("submit", event => {
      event.preventDefault()
      this.tabContent.classList.remove("editable")
      this.sanitizeFormData()
      this.oldFormData = [...this.formData]

      this.showcase = []

      this.formData.forEach(formData => {
        if ( formData.type==="multiple" ) {
          formData.fields
            .forEach(field => {
              this.showcase.push({
                heading: field[0].content,
                content: field[1].content
              })
            })
          
          return
        }

        if ( formData.content ) {

          this.showcase.push({
            heading: formData.showCaseHeading,
            content: formData.content
          })
        }
      })
      
      this.emptyScheduleShowcase()
      this.renderScheduleShowcase()
    })

    this.renderScheduleShowcase()
  }

  sanitizeFormData() {
    this.formData = this.formData.map(formData => formData.type==="multiple"? {
      ...formData,
      fields: formData.fields.filter(field => !!field[0].content && !!field[1].content )
    } : formData)
  }

  emptyScheduleForm() {
    this.formInner.innerHTML = ""
  }

  createScheduleRow ( data, index ) {
    const fieldContainer = domCreation.createFormContainer("row ps-5 pe-3 mt-2 align-items-start")
    const selectContainer = domCreation.createFormContainer("col-6 row align-items-center")
    const selectData = data[0]
    const selectLabel = domCreation.createFormLabel(selectData.heading, selectData.name+index, "col-4 weight-black text-dark fs-6 px-0")
    
    const select = domCreation.createFormSelect(selectData.name+index, "input__text--default col-7 rounded-2 py-1 weight-medium")
    select.addEventListener("change", event => {
      this.formData = this.formData.map(formData => formData.type==="multiple" ? {
        ...formData,
        fields: formData.fields.map(field => (
          field[0].id===selectData.id?
          field.map((innerField, innerFieldIdx) => (
            innerFieldIdx===0? {
              ...innerField,
              content: event.target.value
            } : innerField
          )) 
          : field
        ))
      } : formData)
    })

    const dates = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    dates.forEach(day => {
      const option = Object.assign(document.createElement("option"), {
        value: day,
        textContent: day
      })
      option.selected = day===selectData.content

      select.append(option)
    })

    selectContainer.append(selectLabel, select)
    const timeData = data[1]
    const timeContainer = domCreation.createFormContainer("col-5 row align-items-center pe-0")
    const timeLabel = domCreation.createFormLabel(timeData.heading, timeData.name+index, "weight-black col-2 text-dark fs-6 px-0")
    const timeInput = domCreation.createFormInput(timeData.name+index, timeData.content, "text", "input__text--default fs-6 col-10 px-0 weight-medium px-2")
    timeInput.addEventListener("change", event => {
      this.formData = this.formData.map(formData => formData.type==="multiple" ? {
        ...formData,
        fields: formData.fields.map(field => (
          field[1].id===timeData.id?
          field.map((innerField, innerFieldIdx) => (
            innerFieldIdx===1? {
              ...innerField,
              content: event.target.value
            } : innerField
          )) 
          : field
        ))
      } : formData)
    })
    timeContainer.append(timeLabel, timeInput)

    const removeContainer = domCreation.createFormContainer("col-1 px-0")
    
    const removeButton = domCreation.createFormButton("bg-transparent rounded-circle d-block ms-auto")
    removeButton.innerHTML = `
    <span class="sr-only">Remove date</span>
    <svg fill="#ff3838" aria-hidden="true" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.965 27.965" xml:space="preserve" stroke="#ff3838"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c142_x"> <path d="M13.98,0C6.259,0,0,6.261,0,13.983c0,7.721,6.259,13.982,13.98,13.982c7.725,0,13.985-6.262,13.985-13.982 C27.965,6.261,21.705,0,13.98,0z M19.992,17.769l-2.227,2.224c0,0-3.523-3.78-3.786-3.78c-0.259,0-3.783,3.78-3.783,3.78 l-2.228-2.224c0,0,3.784-3.472,3.784-3.781c0-0.314-3.784-3.787-3.784-3.787l2.228-2.229c0,0,3.553,3.782,3.783,3.782 c0.232,0,3.786-3.782,3.786-3.782l2.227,2.229c0,0-3.785,3.523-3.785,3.787C16.207,14.239,19.992,17.769,19.992,17.769z"></path> </g> <g id="Capa_1_104_"> </g> </g> </g></svg>
    `
    removeButton.addEventListener("click", () => {
      this.formData = this.formData.map(formData => formData.type==="multiple"? {
        ...formData,
        fields: formData.fields.filter(field => field[0].id!==selectData.id)
      } : formData)

      this.emptyScheduleForm()
      this.renderScheduleForm()
    })

    removeContainer.append(removeButton)
    fieldContainer.append(selectContainer, timeContainer, removeContainer)

    return fieldContainer
  }

  renderScheduleForm () {
    this.formData.forEach((data, index) => {
      if ( data.type==="multiple" ) {
        data.fields.forEach((field, fieldIndex) => {
          const dateRow = this.createScheduleRow(field, fieldIndex)
          this.formInner.append(dateRow)
        })

        const addRowContainer = domCreation.createFormContainer("d-flex my-3 mx-4 ps-2")
    
        const addRowButton = Object.assign(document.createElement("button"), {
          type: "button",
          classList: "form__button bg-primary text-white rounded-2 py-1 px-2",
          textContent: "Add row"
        })
        addRowButton.addEventListener("click", () => {
          this.formData = this.formData.map(formData => formData.type==="multiple"? {
            ...formData,
            fields: [
              ...formData.fields,
              [
                {
                  heading: "Select day",
                  content: "",
                  name: "schedDate",
                  id: crypto.randomUUID(),
                  type: "select"
                },
                {
                  heading: "Time",
                  content: "",
                  name: "schedTime",
                  id: crypto.randomUUID(),
                  type: "select"      
                }
              ]
            ]
          } : formData)
          this.emptyScheduleForm()
          this.renderScheduleForm()
        })

        addRowContainer.append(addRowButton)
        this.formInner.append(addRowContainer)
      } else {
        const hoursContainer = domCreation.createFormContainer("row align-items-center px-4 mt-1 mx-2 me-4")
        const hoursLabel = domCreation.createFormLabel(data.heading, data.name, "col-7 weight-black text-dark fs-6 px-0")
        
        const hoursSelect = domCreation.createFormSelect(data.name )
        hoursSelect.addEventListener("change", event => {
          this.formData = this.formData.map(formData => formData.name===data.name? {
            ...formData,
            content: event.target.value
          } : formData)
        })
    
        const optionsData = [
          "Less than 5hrs",
          "5-10hrs",
          "10-20hrs",
          "More than 20hrs"
        ]
    
        optionsData.forEach(option => {
          const optionDom = Object.assign(document.createElement("option"), {
            value: option,
            textContent: option
          })
          optionDom.selected = data.content===option
    
          hoursSelect.append(optionDom)
        })
    
        hoursContainer.append(hoursLabel, hoursSelect)
        this.formInner.append(hoursContainer)
      }
    })
  }

  emptyScheduleShowcase() {
    this.tabsData.innerHTML = ""
  }

  renderScheduleShowcase() {
    this.showcase.forEach(hoursData => this.tabsData.append(domCreation.createShowcaseField(`${hoursData.heading}:`, hoursData.content)))
  }
}

const schedule = new Schedule()

// Get paid tab selection
class GetPaid {
  showcase = [...getPaidShowcaseData]
  formData = [...getPaidFormData]
  oldFormData = [...getPaidFormData]
  tabContent = element("[data-id='getPaidTabContent']")
  tabsData = element("[data-target='tabsData4']")
  form = element("[data-target='getPaid']")
  formInner = element("[data-target='getPaidInner']")
  edit = element("[data-target='editGetPaid']")
  cancel = element("[data-target='formCancelGetPaid']")

  constructor () {
    this.edit.addEventListener("click", () =>{
      this.tabContent.classList.add("editable")
      this.emptyGetPaidForm()
      this.renderGetPaidForm()
    })
    
    this.cancel.addEventListener("click", () => {
      this.tabContent.classList.remove("editable")
      this.formData = [...this.oldFormData]
    })

    this.form.addEventListener("submit", event => {
      event.preventDefault()
      this.sanitizeFormData()
      this.emptyGetPaidShowcase()
      this.showcase = this.formData.reduce((accu, curr) => {
        return accu.concat(curr.reduce((innerAccu, innerCurr) => ({
          ...innerAccu,
          [innerCurr.fieldKey]: innerCurr.content
        }), {}))
      }, [])
      this.oldFormData = [...this.formData]
      this.tabContent.classList.remove("editable")
      this.emptyGetPaidShowcase()
      this.renderGetPaidShowcase()
    })

    this.renderGetPaidShowcase()
  }

  sanitizeFormData() {
    this.formData = this.formData.filter(formData => formData.every(data => !!data.content))
  }

  emptyGetPaidForm () {
    this.formInner.innerHTML = ""
  }

  emptyGetPaidShowcase () {
    this.tabsData.innerHTML = ""
  }

  renderGetPaidForm () {
    this.emptyGetPaidForm()

    this.formData.forEach((formData, formDataIdx) => {
      const [bankName, bankNumber, bankType] = formData 
      const fieldsContainer = domCreation.createFormContainer("row px-5 mt-2 align-items-start")
      const bankNameContainer = domCreation.createFormContainer("col-4 px-0")
      const bankNameLabel = domCreation.createFormLabel(bankName.heading, bankName.name+formDataIdx, "weight-black text-dark fs-6 px-0")
      const bankNameInput = domCreation.createFormInput(bankName.name+formDataIdx, bankName.content, "text", "input__text--default fs-6 px-0 weight-medium px-2")
      bankNameInput.addEventListener("change", event => {
        this.formData = this.formData.map((data, dataIdx) => [
          ...data.map((innerData, innerDataIdx) => innerDataIdx===0 && formDataIdx===dataIdx? {
            ...innerData,
            content: event.target.value
          } : innerData )
        ])
      })

      bankNameContainer.append(bankNameLabel, bankNameInput)

      const bankNumberContainer = domCreation.createFormContainer("col-4 px-0")
      const bankNumberLabel = domCreation.createFormLabel(bankNumber.heading, bankNumber.name+formDataIdx, "weight-black text-dark fs-6 px-0")
      const bankNumberInput = domCreation.createFormInput(bankNumber.name+formDataIdx, bankNumber.content, "password", "input__text--default fs-6 px-0 weight-medium px-2")
      bankNumberInput.addEventListener("change", event => {
        this.formData = this.formData.map((data, dataIdx) => [
          ...data.map((innerData, innerDataIdx) => innerDataIdx===1 && formDataIdx===dataIdx? {
            ...innerData,
            content: event.target.value
          } : innerData )
        ])
      })

      bankNumberContainer.append(bankNumberLabel, bankNumberInput)

      const bankTypeContainer = domCreation.createFormContainer("col-3 px-0")
      const bankTypeLabel = domCreation.createFormLabel(bankType.heading, bankType.name+formDataIdx, "weight-black text-dark fs-6 px-0")
      const bankTypeSelect = domCreation.createFormSelect(bankType.name+formDataIdx, "input__text--default col-7 rounded-2 py-1 weight-medium d-block py-1 min-w-100")
      const bankOptions = ["", "Bank", "Card"]
      bankOptions.forEach(bankOption => {
        const option = Object.assign(document.createElement("option"), {
          value: bankOption,
          textContent: bankOption
        })
        option.selected = bankOption===bankType.content
        bankTypeSelect.append(option)
      })
      bankTypeSelect.addEventListener("change", event => {
        this.formData = this.formData.map((data, dataIdx) => [
          ...data.map((innerData, innerDataIdx) => innerDataIdx===2 && formDataIdx===dataIdx? {
            ...innerData,
            content: event.target.value
          } : innerData )
        ])
      })

      bankTypeContainer.append(bankTypeLabel, bankTypeSelect)

      const removeContainer = domCreation.createFormContainer("col-1 px-0 mt-4")
      const removeButton = domCreation.createFormButton("bg-transparent rounded-circle d-block ms-auto")
      removeButton.innerHTML = `
      <span class="sr-only">Remove row</span>
      <svg fill="#ff3838" aria-hidden="true" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.965 27.965" xml:space="preserve" stroke="#ff3838"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c142_x"> <path d="M13.98,0C6.259,0,0,6.261,0,13.983c0,7.721,6.259,13.982,13.98,13.982c7.725,0,13.985-6.262,13.985-13.982 C27.965,6.261,21.705,0,13.98,0z M19.992,17.769l-2.227,2.224c0,0-3.523-3.78-3.786-3.78c-0.259,0-3.783,3.78-3.783,3.78 l-2.228-2.224c0,0,3.784-3.472,3.784-3.781c0-0.314-3.784-3.787-3.784-3.787l2.228-2.229c0,0,3.553,3.782,3.783,3.782 c0.232,0,3.786-3.782,3.786-3.782l2.227,2.229c0,0-3.785,3.523-3.785,3.787C16.207,14.239,19.992,17.769,19.992,17.769z"></path> </g> <g id="Capa_1_104_"> </g> </g> </g></svg>
      `
      removeButton.addEventListener("click", () =>{
        this.formData = this.formData.filter((data, dataIdx) => formDataIdx!==dataIdx)
        this.emptyGetPaidForm()
        this.renderGetPaidForm()
      })

      removeContainer.append(removeButton)

      fieldsContainer.append(bankNameContainer, bankNumberContainer, bankTypeContainer, removeContainer)

      this.formInner.append(fieldsContainer)
    })

    const addBankContainer = domCreation.createFormContainer("px-3 ms-3 mt-3 align-items-start")
    const addBankButton = domCreation.createFormButton("form__button bg-primary text-white rounded-2 p-2 me-2", "Add Bank")
    addBankButton.addEventListener("click", () =>{
      this.formData = this.formData.concat([[
        {
          heading: "Bank name",
          fieldKey: "bank",
          content: "",
          name: "bankName",
          type: "text"
        },
        {
          heading: "Number",
          fieldKey: "number",
          content: "",
          name: "bankNumber",
          type: "password"
        },
        {
          heading: "Type",
          fieldKey: "type",
          content: "",
          name: "bankType",
          type: "select"
        }
      ]])
      this.emptyGetPaidForm()
      this.renderGetPaidForm()
    })
    addBankContainer.append(addBankButton)

    this.formInner.append(addBankContainer)
  }

  renderGetPaidShowcase () {
    this.showcase.forEach(data => {
      const fieldContainer = domCreation.createFormContainer("row px-5 mt-2")
      const heading = Object.assign(document.createElement("h2"), {
        classList: "weight-black text-dark fs-6 col-4 px-0",
        textContent: data.bank
      })
      const numberParagraph = Object.assign(document.createElement("p"), {
        classList: "col-4 fs-6 px-0 weight-medium",
        textContent: "****" + data.number.slice(3)
      })
      const typeParagraph = Object.assign(document.createElement("p"), {
        classList: "col-4 fs-6 px-0 weight-medium",
        textContent: data.type
      })
      fieldContainer.append(heading, numberParagraph, typeParagraph)
      this.tabsData.append(fieldContainer)
    })
  }
}

const getPaid = new GetPaid()