const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const finalMessage = document.getElementById('finalMessage');
const finalScore = document.getElementById('finalScore');
const startBtn = document.getElementById('startBtn');
const bompSound = new Audio('./assets/bomp.mp3');

let score = 0;
let timeLeft = 30;
let gameInterval;
let popInterval;

function randomHole() {
  return holes[Math.floor(Math.random() * holes.length)];
}

function showFace() {
  const hole = randomHole();
  const img = hole.querySelector('.face');
  img.classList.add('show');

 img.onclick = () => {
  if (!img.classList.contains('clicked')) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    img.classList.add('clicked');
    bompSound.currentTime = 0; 
    bompSound.play();

    showBompText(img.parentElement); 
  }
};

  setTimeout(() => {
    img.classList.remove('show', 'clicked');
    img.onclick = null;
  }, 800);
}

function startGame() {
  document.getElementById('end-popup').classList.add('hidden');

  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = 'Score: 0';
  timerDisplay.textContent = 'Time: 30';
  finalMessage.classList.remove('show');

  startBtn.textContent = 'Playing...';
  startBtn.disabled = true;

  let countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      clearInterval(popInterval);
      hideAllFaces();
      showEndPopup();
    }
  }, 1000);

  popInterval = setInterval(showFace, 700);
}


function endGame() {
  clearInterval(gameInterval);
  clearInterval(popInterval);
  finalMessage.classList.add('show');
  finalScore.textContent = score;
}

startBtn.addEventListener('click', startGame);

function showBompText(container) {
  const text = document.createElement('div');
  text.textContent = '💥 Bomp!';
  text.style.position = 'absolute';
  text.style.color = 'yellow';
  text.style.fontWeight = 'bold';
  text.style.fontSize = '14px';
  text.style.top = '50%';
  text.style.left = '50%';
  text.style.transform = 'translate(-50%, -50%)';
  text.style.pointerEvents = 'none';
  text.style.animation = 'fadeOut 0.6s ease-out';

  container.appendChild(text);

  setTimeout(() => {
    text.remove();
  }, 600);
}
function showEndPopup() {
  document.getElementById('final-score').textContent = `You scored ${score} point${score !== 1 ? 's' : ''}.`;
  document.getElementById('end-popup').classList.remove('hidden');
  startBtn.textContent = 'Start Game';
  startBtn.disabled = false;
}
function hideAllFaces() {
  const faces = document.querySelectorAll('.face');
  faces.forEach(face => {
    face.classList.remove('show', 'clicked');
    face.onclick = null;
  });
}

