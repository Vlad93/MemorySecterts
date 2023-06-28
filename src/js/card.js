export default class Card {
  constructor(container, cardNumber, flip) {
    this.cardNumber = cardNumber;
    this.cardNumberElement = this.createCardNumberElement(cardNumber);
    this.cardElement = this.createElement(container);
    this.flip = flip;
  }
  // метод для создания элемента карточки
  createElement(container) {
    const card = document.createElement('li');
    const cardBtn = document.createElement('button');
    // добавляем стили для элементов карточки
    card.classList.add('cards__item');
    cardBtn.classList.add('cards__btn');
     // Вкладываем элементы в карточку
    card.append(cardBtn);
    card.append(this.cardNumberElement);
    container.append(card);
    cardBtn.addEventListener('click',() => {
      this.flip(this); // Передаём в колбэк-функцию экземпляр класса.
    })
    return card;
  }
  // метод для создания элемента номера карточки
  createCardNumberElement(value) {
    const cardNumber = document.createElement('span');
    cardNumber.classList.add('cards__number');
    cardNumber.innerHTML = value;
    return cardNumber;
  }
  // сеттер и геттер номера карточки
  set cardNumber(value) {
    this._cardNumber = value;
  }
  get cardNumber() {
    return this._cardNumber;
  }
  // сеттер и геттер значения open
  set open(value) {
    if(value === true) {
      this.cardElement.classList.add('flip');
    } else {
      setTimeout(() => {
        this.cardElement.classList.remove('flip');
      }, 500);
    }
    this._open = value;
  }
  get open() {
    return this._open;
  }
  // сеттер и геттер для отметки найденной пары
  set success(value) {
    if(value) {
      this.cardElement.classList.add('success');
    } else {
      this.cardElement.classList.remove('success');
    }
    this._success = value;
  }
  get success() {
    return this._success;
  }
}
