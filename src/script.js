import img from './data/image.png';
const data1 = require('./data/4x4.json');
const data2 = require('./data/32x32.json');
const canvas = document.getElementById('picture');
const ctx = canvas.getContext('2d');
const switherBox = document.querySelector('.canvas-switcher');

function renderImage(data, flag) {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  let width = data[0].length;
  let height = data.length;
  canvas.width = width;
  canvas.height = height;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (flag === 'hex') {
        ctx.fillStyle = `#${data[row][col]}`;
      } else if (flag === 'rgba') {
        data[row][col][3] = data[row][col][3] / 255;
        ctx.fillStyle = `rgba(${data[row][col]})`;
      }
      ctx.fillRect(col, row, 1, 1);
    }
  }
}
function loadImage() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = 256;
  canvas.height = 256;
  let pic = new Image();
  pic.src = img;
  pic.onload = function() {
    ctx.drawImage(
      pic,
      0,
      0,
      pic.width,
      pic.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  };
}
switherBox.addEventListener('click', function(evt) {
  const switcherItem = evt.target.closest('.canvas-switcher__item');
  if (switcherItem) {
    switch (switcherItem.firstChild.nextSibling.id) {
      case 'sun':
        renderImage(data1, 'hex');
        break;
      case 'codewars':
        renderImage(data2, 'rgba');
        break;
      case 'school':
        loadImage();
        break;
    }
  }
});
