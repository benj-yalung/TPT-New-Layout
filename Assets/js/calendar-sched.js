window.addEventListener('load', (event) => {


const calendar = document.getElementById('calendar');
const eventForm = document.getElementById('eventForm');
const addEventButton = document.getElementById('addEventButton');
const eventName = document.getElementById('eventName');
const eventDate = document.getElementById('eventDate');
const eventTime = document.getElementById('eventTime');
const eventDescription = document.getElementById('eventDescription');

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();


    function displayCalendar(month, year) {
        calendar.innerHTML = '';
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        
        for (let i = 0; i < firstDay; i++) {
          const day = document.createElement('div');
          calendar.appendChild(day);
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
          const day = document.createElement('div');
          day.textContent = i;
          day.addEventListener('click', () => {
            eventForm.style.display = 'block';
            eventDate.value = year + '-' + (month + 1).toString().padStart(2, '0') + '-' + i.toString().padStart(2, '0');
          });
          calendar.appendChild(day);
        }
      }


    displayCalendar(currentMonth, currentYear);

    addEventButton.addEventListener('click', () => {
    const event = {
        name: eventName.value,
        date: eventDate.value,
        time: eventTime.value,
        description: eventDescription.value
    };
    const eventData = JSON.stringify(event);
    localStorage.setItem(event.date, eventData);
    eventForm.style.display = 'none';
    eventName.value = '';
    eventDate.value = '';
    eventTime.value = '';
    eventDescription.value = '';
    });

    document.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
        eventForm.style.display = 'none';
    }
    });


});