(() => {
  // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива,
  // который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

  function createNumbersArray(count) {
    const arrPairNumbers = [];
    for (let i = 0; i < (count ** 2) / 2; i++) {
      arrPairNumbers.push((i + 1), (i + 1));
    }
    return arrPairNumbers;
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе
  // исходный массив и возвращает перемешанный массив. arr - массив чисел

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
      // поменять элементы местами
      // для этого используем синтаксис "деструктурирующее присваивание"
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // создаем и возвращаем кнопку "начать новую игру"
  function createNewGameBtn(text) {
    const newGameBtn = document.createElement('button');
    newGameBtn.classList.add('btn', 'btn-success', 'btn-lg', 'd-block', 'mb-3', 'ml-auto', 'mr-auto');
    newGameBtn.innerHTML = text;
    return newGameBtn;
  }

  // создаем и возвращаем форму для указания размера поля
  function createNewGameForm() {
    const form = document.createElement('form');
    const formTitle = document.createElement('h2');
    const input = document.createElement('input');
    const btnWrap = document.createElement('div');
    const btn = createNewGameBtn('Начать новую игру');
    const formText = document.createElement('p');

    // Добавляем классы css и текст для элементов формы
    form.classList.add('form', 'flex-column');
    formTitle.classList.add('form-label', 'mb-3');
    formTitle.innerHTML = ('Укажите размер поля');
    input.classList.add('form__input', 'form-control');
    input.placeholder = 'Введите цифру';
    formText.classList.add('form-text');
    formText.innerHTML = ('Введите четное число от 2 до 10 включительно. При неверном вводе будет установлено значение по умолчанию (4).');
    btnWrap.classList.add('input-group-append', 'mb-3');
    btn.disabled = true;

    // Размещаем элементы в html
    btnWrap.append(btn);
    form.append(formTitle);
    form.append(input);
    form.append(formText);
    form.append(btnWrap);

    // Возвращаем форму, инпут и кнопку, чтобы к ним был доступ
    return {
      form,
      formTitle,
      input,
      btn,
      formText,
    };
  }

  // создаем и возвращаем список карточек
  function createCardsList() {
    const list = document.createElement('ul');
    list.classList.add('cards');
    return list;
  }

  // создаем и возвращаем победный заголовок
  function createWinTitle() {
    const winTitle = document.createElement('h2');
    winTitle.innerHTML = 'Поздравляем! Вы победили!';
    winTitle.classList.add('win-title');
    return winTitle;
  }

  // создаем и возвращаем проигрышный заголовок
  function createLoseTitle() {
    const loseTitle = document.createElement('h2');
    loseTitle.innerHTML = 'К сожалению, вы проиграли :( Попробйте еще раз!';
    loseTitle.classList.add('lose-title');
    return loseTitle;
  }

  // создаем и возвращаем таймер
  function createTimer(time) {
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

  // Функция конец игры
  function endGame(isWin, container) {
    const startNewGameBtn = createNewGameBtn('Сыграть снова');
    let title;
    if (isWin) {
      title = createWinTitle();
    } else {
      title = createLoseTitle();
    }
    if (container) {
      container.append(title);
      container.append(startNewGameBtn);
      startNewGameBtn.addEventListener('click', () => {
        title.remove();
        startNewGameBtn.remove();
        document.querySelectorAll('li').forEach((item) => {
          item.remove();
        });
        document.querySelector('.timer').remove();
        document.querySelector('form').classList.remove('hidden');
        document.querySelector('form').scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    }
    title.scrollIntoView({ block: 'center', behavior: 'smooth' });
    return {
      title,
      startNewGameBtn,
    };
  }

  // Функция старта таймера
  function startTimer(timer, container) {
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

  // создаем и возвращаем карточку
  function createCardItem(number) {
    // создаем элементы карточки
    const card = document.createElement('li');
    const cardBtn = document.createElement('button');
    const cardNumber = document.createElement('span');
    // добавляем стили для элементов карточки
    card.classList.add('cards__item');
    cardBtn.classList.add('cards__btn');
    cardNumber.classList.add('cards__number');
    cardNumber.innerHTML = number;
    // Вкладываем элементы в карточку
    card.append(cardBtn);
    card.append(cardNumber);
    return {
      card,
      cardBtn,
      cardNumber,
    };
  }

  // function calcCardsHeight(card) {
  //     let cardItemWidth = card.offsetWidth;
  //     card.style.height = `${cardItemWidth * 1.1}px`;
  // }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами.
  // На основе этого массива вы можете создать DOM-элементы карточек.
  // У каждой карточки будет свой номер из массива произвольных чисел.
  // Вы также можете создать для этого специальную функцию. count - количество пар.

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
    const timer = createTimer(10);

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
    let cardsItemsArr = [];

    // Объявляем массив с перевернутыми карточками
    let flippedCardsArr = [];

    // Проверяем и исправляем count, если нужно. Запускаем игру
    formObj.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (((count >= 2) && (count <= 10) && (count % 2 === 0))) {
        count = formObj.input.value;
      } else {
        count = 4;
      }
      // получаем и добавляем обертку списка карточек ul на страницу
      formObj.form.classList.add('hidden');

      // Запускаем таймер
      const timerStart = startTimer(timer, container, cardsItemsArr);

      // обнуляем значение в input
      formObj.input.value = '';

      // и убираем доступ к кнопке
      formObj.btn.disabled = true;

      // добавляем в контейнер список для карточек и таймер
      container.append(cardsList);
      container.append(timer.timer);
      // стили для списка
      cardsList.style.cssText = `grid-template-columns: repeat(${count}, 1fr);`;

      // получаем массив чисел и перемешиваем его
      const numbersArr = createNumbersArray(count);
      const shuffleNumbersArr = shuffle(numbersArr);

      // Объявляем массив с карточками
      cardsItemsArr = [];

      // Объявляем массив с перевернутыми карточками
      flippedCardsArr = [];

      // выводим на страницу и добавляем цифру
      for (let i = 0; i < shuffleNumbersArr.length; i++) {
        // создаем карточки и добавляем их на страницу и в массив
        const cardItem = createCardItem(shuffleNumbersArr[i]);
        cardsList.append(cardItem.card);
        cardsItemsArr.push(cardItem);

        // Высчитываем и задаем высоту карточек
        // calcCardsHeight(cardItem.card);

        // Добавляем поведение при клике на карточку
        cardItem.cardBtn.addEventListener('click', () => {
          // добавляем класс
          cardItem.card.classList.add('flip');
          // добавляем в перевернутый массив
          flippedCardsArr.push(cardItem);
          if (flippedCardsArr.length > 1 && flippedCardsArr.length % 2 === 0) {
            const prevFlippedCard = flippedCardsArr[flippedCardsArr.length - 2];
            const lastFlippedCard = flippedCardsArr[flippedCardsArr.length - 1];
            if (lastFlippedCard.cardNumber.textContent !== prevFlippedCard.cardNumber.textContent) {
              flippedCardsArr.splice(flippedCardsArr.length - 2, 2);
              setTimeout(() => {
                prevFlippedCard.card.classList.remove('flip');
                lastFlippedCard.card.classList.remove('flip');
              }, 500);
            }
          }
          // В случае победы
          if (cardsItemsArr.length === flippedCardsArr.length && timer.seconds !== 0) {
            clearInterval(timerStart.timerId);
            endGame(true, container);
          }
        });
      }
    });
    return {
      gameTitle,
      formObj,
      startNewGameBtn,
    };
  }

  window.startGame = startGame;
})();

// window.addEventListener('resize', changeCardsHeight(document.querySelectorAll('cards__item')));
