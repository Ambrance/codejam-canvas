import img from './data/image.png';
const data1 = require('./data/4x4.json');
const data2 = require('./data/32x32.json');
const canvas = document.getElementById('picture');
const ctx = canvas.getContext('2d');
const switherBox = document.querySelector('.canvas-switcher');

function renderImage(data, flag) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.imageRendering = 'pixelated';
  let flattenedRGBAValues;
  const flatten = (x, y) => x.concat(y);

  const hexToRGBA = hexStr => [
    parseInt(hexStr.substr(0, 2), 16),
    parseInt(hexStr.substr(2, 2), 16),
    parseInt(hexStr.substr(4, 2), 16),
    255,
  ];
  if (flag === 'hex') {
    flattenedRGBAValues = data
      .reduce(flatten)
      .map(hexToRGBA)
      .reduce(flatten);
  } else if (flag === 'rgba') {
    flattenedRGBAValues = data.reduce(flatten).reduce(flatten);
  }
  canvas.width = canvas.height = data.length;
  const imgData = new ImageData(
    Uint8ClampedArray.from(flattenedRGBAValues),
    data.length,
    data.length,
  );
  ctx.putImageData(imgData, 0, 0);
}
function loadImage() {
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
