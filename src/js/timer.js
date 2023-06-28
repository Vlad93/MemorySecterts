import endGame from "./end-game.js";

// создаем и возвращаем таймер
export function createTimer(time) {
  const timer = document.createElement('div');
  const timerIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const timerProgressFrame = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  const timerProgress = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  const timeWrap = document.createElement('div');
  const timeEl = document.createElement('span');

  timer.classList.add('timer');
  timerIcon.classList.add('timer__icon');
  timerIcon.setAttributeNS(null, 'viewBox', '0 0 200 200');

  timerProgressFrame.classList.add('timer__progress-frame');
  timerProgressFrame.setAttributeNS(null, 'cx', '100');
  timerProgressFrame.setAttributeNS(null, 'cy', '100');
  timerProgressFrame.setAttributeNS(null, 'r', '96');

  timerProgress.classList.add('timer__progress');
  timerProgress.setAttributeNS(null, 'cx', '100');
  timerProgress.setAttributeNS(null, 'cy', '100');
  timerProgress.setAttributeNS(null, 'r', '96');

  timeWrap.classList.add('timer__time-wrap');
  timeEl.classList.add('timer__time');

  timerIcon.append(timerProgressFrame);
  timerIcon.append(timerProgress);
  timeWrap.append(timeEl);
  timer.append(timerIcon);
  timer.append(timeWrap);

  return {
    timer,
    timerProgressFrame,
    timerProgress,
    timeEl,
    time,
  };
}


// Функция старта таймера
export function startTimer(timer, container) {
  const circumference = 2 * Math.PI * timer.timerProgress.getAttribute('r');
  timer.timerProgress.style.strokeDasharray = circumference;
  timer.timeEl.innerHTML = timer.time;
  timer.timerProgress.style.strokeDashoffset = circumference * 0;
  const max = timer.time;
  let seconds = max;
  let percent;
  const timerId = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      clearInterval(timerId);
      document.querySelectorAll('.cards__btn').forEach((btn) => {
        btn.disabled = true;
      });
      endGame(false, container);
    }
    percent = (seconds / max) * 100;
    timer.timerProgress.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    timer.timeEl.textContent = seconds.toString().padStart(2, '0');
  }, 1000);
  return {
    seconds,
    timerId,
  };
}
