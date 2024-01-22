import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");

const button = document.querySelector("button[data-start]");
const input = document.querySelector("#datetime-picker");

button.addEventListener('click', onButtonClick);

let selectedTime = null;
let allTime = null;
let timerId;

button.disabled = true;

flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentTime = new Date();
        if (selectedDates[0] < currentTime) {
            Notify.failure("Please choose a date in the future");
        } else {
            button.disabled = false;
            selectedTime = selectedDates[0];
        }
      },
});


function onButtonClick(e) {
    timerId = setInterval(() => {
        const currentTime = new Date();
        allTime =  selectedTime - currentTime;
        const time = convertMs(selectedTime - currentTime);
        murkupTimer(time)
    }, 1000)
}

function murkupTimer(time) {
    if (allTime < 0) {
        clearInterval(timerId);
        return;
    }

    daysEl.textContent = time.days;
    hoursEl.textContent = time.hours;
    minutesEl.textContent = time.minutes;
    secondsEl.textContent = time.seconds;
}


function addLeadingZero(value){
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
