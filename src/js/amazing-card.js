import Card from './card.js';


export default class AmazingCard extends Card {
  // метод для создания элемента номера карточки
  createCardNumberElement(value) {
    const src = `./src/img/${value}.jpg`;
    const img = document.createElement('img');
    img.classList.add('cards__img', 'img-fluid', 'img-thumbnail', 'mx-auto', 'd-block');
    img.src = src;
    // const cardNumber = super.createCardNumberElement(value);
    img.onerror = function() {
      const error = new Error(`При загрузке изображения '${src}' произошла ошибка`);
      console.log(error);
      // здесь дефолтное изображение
      img.src = './src/img/default.png';
    }
    return img;
  }
}
