import { createNewGameBtn } from './new-game.js';

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

// Функция конец игры
export default function endGame(isWin, container, startGame) {
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
    title.scrollIntoView({ block: 'center', behavior: 'smooth' });
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
  return {
    title,
    startNewGameBtn,
  };
}
