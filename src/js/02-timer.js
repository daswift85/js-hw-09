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

  refs.inputEl.disabled = true;
  refs.startBtn.disabled = true;

  let timer = setInterval(() => {
    remainingTime -= 1000;
    if (remainingTime <= 0) {
      clearInterval(timer);
      remainingTime = 0;
      refs.inputEl.disabled = false;
      refs.startBtn.disabled = false;
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
    refs.inputEl.disabled = false;
    refs.startBtn.disabled = false;
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