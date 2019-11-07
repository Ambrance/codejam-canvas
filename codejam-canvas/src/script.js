import img from './data/image.png';
const data1 = require('./data/4x4.json');
const data2 = require('./data/32x32.json');
const canvas = document.getElementById('picture');
const ctx = canvas.getContext('2d');
const switherBox = document.querySelector('.canvas-switcher');

function renderImage(data) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.imageRendering = 'pixelated';
  const colorArr = convertImageData(data);
  canvas.width = canvas.height = data.length;
  const imgData = new ImageData(
    Uint8ClampedArray.from(colorArr),
    data.length,
    data.length,
  );
  ctx.putImageData(imgData, 0, 0);
}

function convertImageData(data) {
  let flattenedRGBAValues;
  let regex = new RegExp('^(?:[A-Fa-f0-9]{3}){1,2}$');
  const flatten = (x, y) => x.concat(y);
  const hexToRGBA = hexStr => [
    parseInt(hexStr.substr(0, 2), 16),
    parseInt(hexStr.substr(2, 2), 16),
    parseInt(hexStr.substr(4, 2), 16),
    255,
  ];
  if (regex.test(data[0][0])) {
    flattenedRGBAValues = data
      .reduce(flatten)
      .map(hexToRGBA)
      .reduce(flatten);
  } else {
    flattenedRGBAValues = data.reduce(flatten).reduce(flatten);
  }
  return flattenedRGBAValues;
}

function drawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.imageRendering = 'auto';
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
        renderImage(data1);
        break;
      case 'codewars':
        renderImage(data2);
        break;
      case 'school':
        drawImage();
        break;
    }
  }
});
