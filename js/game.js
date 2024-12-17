'use strict';
const canvas = document.getElementById('chess');
const ctx = canvas.getContext('2d');
const ground = new Image();
ground.src = 'img/chess.jpg';
const dices0 = new Image();
dices0.src = 'img/dices.png';
const dices1 = new Image();
dices1.src = 'img/dices1.png';
const dices2 = new Image();
dices2.src = 'img/dices2.png';
const dices3 = new Image();
dices3.src = 'img/dices3.png';
const dices4 = new Image();
dices4.src = 'img/dices4.png';
const dices5 = new Image();
dices5.src = 'img/dices5.png';
const dices6 = new Image();
dices6.src = 'img/dices6.png';
const checkersBlack = new Image();
checkersBlack.src = 'img/checkersBlack.png';
const checkersWhite = new Image();
checkersWhite.src = 'img/checkersWhite.png';
const BOX = 80;
const ST_NUM_X = BOX / 2 - 10;
const ST_NUM_Y = BOX / 2;
const ST_X = BOX / 2 - 5;
const ST_Y = 3 * BOX - 5;
const ST_TEXT_X = 4 * BOX;
const ST_TEXT_Y = 1.3 * BOX;
const ST_WIN_X = ST_TEXT_X - BOX;
const ST_WIN_Y = ST_TEXT_Y * 2;
const dices = [dices0, dices1, dices2, dices3, dices4, dices5, dices6];
const play = [
  'White',
  'Black',
  'fishka_W',
  'fishka_B',
  'koordW',
  'koordB',
  'checkersWhite',
  'checkersBlack',
];
let step = 0;
let player = 0;
let testMove = 0;
let space = true;
let checker;
let koord;
let fishka;
let move;
let dir;
const fishka_B = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  6,
  6,
  6,
  6,
  false,
  false,
  false,
  false,
];
const fishka_W = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  6,
  6,
  6,
  6,
  false,
  false,
  false,
  false,
];
const koordB = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
  { x: 0, y: 4 },
  { x: 0, y: 5 },
  { x: 0, y: 6 },
  { x: 0, y: 7 },
  { x: 1, y: 7 },
  { x: 2, y: 7 },
  { x: 3, y: 7 },
  { x: 4, y: 7 },
  { x: 5, y: 7 },
  { x: 6, y: 7 },
  { x: 7, y: 7 },
  { x: 7, y: 6 },
  { x: 7, y: 5 },
  { x: 7, y: 4 },
  { x: 7, y: 3 },
  { x: 7, y: 2 },
  { x: 7, y: 1 },
  { x: 7, y: 0 },
  { x: 6, y: 0 },
  { x: 5, y: 0 },
  { x: 4, y: 0 },
  { x: 3, y: 0 },
  { x: 2, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
];
const koordW = [
  { x: 7, y: 7 },
  { x: 7, y: 6 },
  { x: 7, y: 5 },
  { x: 7, y: 4 },
  { x: 7, y: 3 },
  { x: 7, y: 2 },
  { x: 7, y: 1 },
  { x: 7, y: 0 },
  { x: 6, y: 0 },
  { x: 5, y: 0 },
  { x: 4, y: 0 },
  { x: 3, y: 0 },
  { x: 2, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
  { x: 0, y: 4 },
  { x: 0, y: 5 },
  { x: 0, y: 6 },
  { x: 0, y: 7 },
  { x: 1, y: 7 },
  { x: 2, y: 7 },
  { x: 3, y: 7 },
  { x: 4, y: 7 },
  { x: 5, y: 7 },
  { x: 6, y: 7 },
  { x: 7, y: 7 },
  { x: 6, y: 6 },
  { x: 5, y: 5 },
];
document.addEventListener('keydown', direction);
const valueKey = [32, 49, 50, 51, 52];
function direction(event) {
  for (let i = 0; i < valueKey.length; i++) {
    if (event.keyCode == valueKey[i]) dir = i;
  }
}
const next = () => {
  if (player === 0) player = 1;
  else player = 0;
};
const random = () => (step = Math.floor(Math.random() * 6) + 1);
const drive = () => {
  random();
  dir = -1;
};
const styleText = (color, font) => {
  ctx.fillStyle = color;
  ctx.font = font;
};
const playChange = (func) => {
  if (player === 0) func(fishka_W, fishka_B, dir);
  else func(fishka_B, fishka_W, dir);
};
const testBeat = (colorB) => {
  let beat;
  if (move <= 14) beat = move + 14;
  else if (move <= 28) beat = move - 14;
  else return;
  let beat2 = beat;
  if (beat === 28) beat2 = 0;
  for (let i = 1; i <= colorB[0]; i++) {
    if (beat === colorB[i] || beat2 === colorB[i]) {
      for (let j = i; j <= colorB[0]; j++) {
        colorB[j] = colorB[j + 1];
        colorB[j + 4] = colorB[j + 5];
        colorB[j + 8] = colorB[j + 9];
      }
      colorB[colorB[0]] = 0;
      colorB[colorB[0] + 4] = 6;
      colorB[colorB[0] + 8] = false;
      colorB[0]--;
    }
  }
};
const newFishka = (colorA, colorB, dirN) => {
  if (colorA[0] === 4) {
    testMove = 0;
    run(colorA, colorB, dirN);
    return;
  } else if (colorA[0] === 0) {
    for (let i = 1; i <= colorB[0]; i++) {
      if (colorB[i] === 14) {
        // testMove = 0;
        move = 0;
        testBeat(colorB);
      }
    }
    dir = -1;
    space = true;
    colorA[0]++;
    colorA[colorA[0] + 8] = true;
    delta(colorA, colorB);
    return;
  } else {
    let testDelta = 0;
    for (let i = 1; i <= colorA[0]; i++) {
      if (colorA[i + 4] >= step) testDelta++;
      if (colorA[i] === 0 || colorA[i] === 28) {
        testMove = 0;
        run(colorA, colorB, dirN);
        return;
      }
    }
    space = false;
    if (testDelta === 0 || dirN === colorA[0] + 1) {
      for (let i = 1; i <= colorB[0]; i++) {
        if (colorB[i] === 14) {
          move = 0;
          testBeat(colorB);
        }
      }
      dir = -1;
      space = true;
      colorA[0]++;
      colorA[colorA[0] + 8] = true;
      delta(colorA, colorB);
      return;
    }
    if (dirN > 0) {
      if (colorA[dirN + 8] === false) return;
      testMove = 0;
      run(colorA, colorB, dirN);
    }
  }
};
const delta = (colorA, colorB) => {
  let min = 0;
  let max = 32;
  if (colorA[colorA[0]] === 0) {
    max = 28;
    for (let i = 0; i < colorA[0]; i++) {
      if (colorA[i] > 28) min++;
    }
  }
  if (min === 3) {
    min = 0;
    max = 32;
  }
  for (let i = min + 2; i <= colorA[0]; i++) {
    colorA[i + 4] = colorA[i - 1] - colorA[i] - 1;
  }
  colorA[min + 5] = max - 1 - colorA[min + 1];
  if (min > 0) colorA[5] = 31 - colorA[1];
  if (min === 2) colorA[6] = colorA[1] - colorA[2] - 1;
  for (let j = 1; j <= colorA[0]; j++) {
    for (let i = 1; i <= colorB[0]; i++) {
      if (colorB[i] < 15) max = colorB[i] + 14 - colorA[j];
      else if (colorB[i] < 29) max = colorB[i] - 14 - colorA[j];
      if (max > 0 && max < colorA[j + 4]) colorA[j + 4] = max;
    }
  }
};
const run = (colorA, colorB, dirN = -1) => {
  delta(colorA, colorB);
  if (testMove === 0) {
    for (let i = 1; i <= colorA[0]; i++) {
      if (step <= colorA[i + 4]) {
        colorA[i + 8] = true;
        testMove++;
      } else colorA[i + 8] = false;
    }
  }
  if (testMove > 1) space = false;
  if (testMove === 0) next();
  if (testMove === 1) {
    for (let i = 1; i <= colorA[0]; i++) {
      if (colorA[i + 8] === true) {
        move = colorA[i] + step;
        testBeat(colorB);
        colorA[i] += step;
      }
    }
    testMove = 0;
    delta(colorA, colorB);
    space = true;
    next();
  }
  if (testMove > 1 && dirN > 0) {
    if (colorA[dirN + 8] === false) return;
    move = colorA[dirN] + step;
    testBeat(colorB);
    colorA[dirN] += step;
    testMove = 0;
    delta(colorA, colorB);
    space = true;
    next();
  }
};
const gameOver = () => {
  next();
  styleText('white', '100px Arial');
  ctx.fillText(play[player], ST_TEXT_X, ST_TEXT_Y);
  ctx.fillText('WINNER', ST_WIN_X, ST_WIN_Y);
  clearInterval(game);
};
function drawGame() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(dices[step], 30, 30);
  if (fishka_B[4] === 28 || fishka_W[4] === 28) gameOver();
  for (let i = 1; i <= fishka_W[0]; i++) {
    ctx.drawImage(checkersWhite, koordW[fishka_W[i]].x, koordW[fishka_W[i]].y);
    if (player === 0 && fishka_W[i + 8] === true && space === false) {
      styleText('Black', '20px Arial');
      ctx.fillText(
        i,
        koordW[fishka_W[i]].x + ST_NUM_X,
        koordW[fishka_W[i]].y + ST_NUM_Y
      );
    }
  }
  for (let i = 1; i <= fishka_B[0]; i++) {
    ctx.drawImage(checkersBlack, koordB[fishka_B[i]].x, koordB[fishka_B[i]].y);
    if (player === 1 && fishka_B[i + 8] === true && space === false) {
      styleText('white', '20px Arial');
      ctx.fillText(
        i,
        koordB[fishka_B[i]].x + ST_NUM_X,
        koordB[fishka_B[i]].y + ST_NUM_Y
      );
    }
  }
  if (fishka[0] === 0) {
    if (dir === 0) {
      drive();
      if (step !== 6) next();
      else playChange(newFishka);
    }
  }
  if (fishka[0] !== 0) {
    playChange(delta);
    if (dir === 0 && space === true) {
      drive();
      if (step !== 6) playChange(run);
      else playChange(newFishka);
    }
    if (dir > 0 && space === false) {
      if (step !== 6) playChange(run);
      else playChange(newFishka);
    }
  }
}
let game = setInterval(drawGame, 500);
