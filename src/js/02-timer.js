import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

function convertMs(milliseconds) {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
  const days = Math.floor(milliseconds / 1000 / 60 / 60 / 24);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function startCountdown() {
  const chosenDate = flatpickr.parseDate(document.querySelector('#datetime-picker').value);
  const now = new Date();
  const difference = chosenDate - now;
  if (difference <= 0) return;

  let remainingTime = difference;

  const timer = setInterval(() => {
    remainingTime -= 1000;

    if (remainingTime <= 0) {
      clearInterval(timer);
      remainingTime = 0;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);

  }, 1000);
}

function validateDate(selectedDates) {
  const chosenDate = selectedDates[0];
  const now = new Date();

  if (chosenDate < now) {
    Notiflix.Notify.warning("Please choose a date in the future");
    document.querySelector('[data-start]').disabled = true;
  } else {
    Notiflix.Notify.success('Valid date selected');
    document.querySelector('[data-start]').disabled = false;
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: validateDate,
};

flatpickr("#datetime-picker", options);

document.querySelector('[data-start]').addEventListener('click', startCountdown);


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
