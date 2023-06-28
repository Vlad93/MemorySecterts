// создаем и возвращаем кнопку "начать новую игру"
export function createNewGameBtn(text) {
  const newGameBtn = document.createElement('button');
  newGameBtn.classList.add('btn', 'btn-success', 'btn-lg', 'd-block', 'mb-3', 'ml-auto', 'mr-auto');
  newGameBtn.innerHTML = text;
  return newGameBtn;
}

// создаем и возвращаем форму для указания размера поля
export function createNewGameForm() {
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
