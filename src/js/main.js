import { createNumbersArray, shuffle } from './array-functions.js';
import Card from './card.js';
import AmazingCard from './amazing-card.js';
import { createTimer, startTimer } from './timer.js'
import { createNewGameBtn, createNewGameForm } from './new-game.js';
import endGame from './end-game.js';


// создаем и возвращаем список карточек
function createCardsList() {
  const list = document.createElement('ul');
  list.classList.add('cards');
  return list;
}

// Функция запуска приложения
function startGame() {
  const container = document.getElementById('memory-app');
  let count = 4;
  // задаем переменные и выводим на страницу
  const gameTitle = document.createElement('h1');
  const startNewGameBtn = createNewGameBtn('Сыграть снова');
  gameTitle.classList.add('game-title');
  gameTitle.innerHTML = 'Игра в пары';
  const cardsList = createCardsList();
  container.append(gameTitle);
  // объявляем таймер
  const timer = createTimer(60);
  // объявляем и добавляем форму на страницу
  const formObj = createNewGameForm();
  container.append(formObj.form);
  // задаем count
  formObj.input.addEventListener('input', () => {
    count = formObj.input.value;
    if (count === '') {
      formObj.btn.disabled = true;
    } else {
      formObj.btn.disabled = false;
    }
  });
   // Объявляем массив с карточками
   let cardsArr = [];
  // Проверяем и исправляем count, если нужно. Запускаем игру
  formObj.form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (((count >= 2) && (count <= 10) && (count % 2 === 0))) {
      count = formObj.input.value;
    } else {
      count = 4;
    }
    // стили для списка
    cardsList.style.cssText = `grid-template-columns: repeat(${count}, 1fr);`;
    // скрываем форму
    formObj.form.classList.add('hidden');
    // Запускаем таймер
    const timerStart = startTimer(timer, container);
    // обнуляем значение в input
    formObj.input.value = '';
    // и убираем доступ к кнопке
    formObj.btn.disabled = true;
    // добавляем в контейнер список для карточек и таймер
    container.append(cardsList);
    container.append(timer.timer);
    // получаем массив чисел и перемешиваем его
    const numbersArr = createNumbersArray(count);
    const shuffleNumbersArr = shuffle(numbersArr);

    // выводим на страницу
    for (const cardNumber of shuffleNumbersArr) {
      // создаем карточки и добавляем их на страницу и в массив
      const card = new AmazingCard(container, cardNumber, function flipCard(card) {
        // Основная логика игры
        card.open = true;
        // Здесь задаем массив с открытыми картами, у которых нет найденной пары
        let openCardArr = cardsArr.filter(card => card.open === true && card.success !== true);
        if(openCardArr.length === 2) {
          if(openCardArr[0].cardNumber === openCardArr[1].cardNumber) {
            openCardArr[0].success = true;
            openCardArr[1].success = true;
            // Если пара нашлась, создаем массив с перевернутыми картами и проверяем, равна ли его длина длине изначального массива
            let openArrSuccess = cardsArr.filter(card => card.open === true && card.success === true);
            if (openArrSuccess.length > 0 && openArrSuccess.length === cardsArr.length && timer.seconds !== 0) {
              clearInterval(timerStart.timerId);
              endGame(true, container);
            }
          } else {
            openCardArr[0].open = false;
            openCardArr[1].open = false;
            return;
          }
        }
        return;
      })
      cardsArr.push(card);
      cardsList.append(card.cardElement);
    }
  });
}

// запускаем приложение при загрузке
startGame();
