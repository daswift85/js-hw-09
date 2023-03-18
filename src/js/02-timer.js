import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function startCountdown(chosenDate, refs) {
  let remainingTime = chosenDate - new Date();
  if (remainingTime <= 0) return;

  let timer = setInterval(() => {
    remainingTime -= 1000;
    if (remainingTime <= 0) {
      clearInterval(timer);
      remainingTime = 0;
    }
    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);

  }, 1000);

  refs.resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    refs.days.textContent = '00';
    refs.hours.textContent = '00';
    refs.minutes.textContent = '00';
    refs.seconds.textContent = '00';
    refs.inputEl._flatpickr.setDate(new Date());
  });
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function(selectedDates) {
    const chosenDate = selectedDates[0];
    const now = new Date();
    if (chosenDate < now) {
      Notiflix.Notify.warning("Please choose a date in the future");
      refs.startBtn.disabled = true;
    } else {
      Notiflix.Notify.success('Valid date selected');
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', () => startCountdown(chosenDate, refs));
    }
  },
};

const refs = {
  startBtn: document.querySelector('[data-start]'),
  resetBtn: document.querySelector('[data-reset]'),
  inputEl: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

flatpickr(refs.inputEl, options);




// import flatpickr from 'flatpickr';
// import Notiflix from 'notiflix';

// const startDatePicker = flatpickr('#start-date', {
//     enableTime: true,
//     dateFormat: 'Y-m-d H:i',
//     minDate: 'today',
//     minuteIncrement: 1,
//     onClose: function(selectedDates, dateStr, instance) {
//         const selectedDate = selectedDates[0];

//         if (selectedDate < new Date()) {
//             Notiflix.Notify.warning('Please choose a date in the future');
//             document.querySelector('#start-button').disabled = true;
//         } else {
//             Notiflix.Notify.success('Valid date selected');
//             document.querySelector('#start-button').disabled = false;
//         }
//     },
// });

// document.querySelector('#start-button').addEventListener('click', function() {
//     const selectedDate = startDatePicker.selectedDates[0];
//     const countdownTimer = setInterval(function() {
//         const now = new Date().getTime();
//         const distance = selectedDate.getTime() - now;
//         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//               document.querySelector('[data-days]').textContent = days;
//       document.querySelector('[data-hours]').textContent = hours;
//       document.querySelector('[data-minutes]').textContent = minutes;
//       document.querySelector('[data-seconds]').textContent = seconds;

//         document.querySelector('#countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s `;
//         if (distance < 0) {
//             clearInterval(countdownTimer);
//             document.querySelector('#countdown').innerHTML = 'EXPIRED';
//         }
//     }, 1000);
// });
