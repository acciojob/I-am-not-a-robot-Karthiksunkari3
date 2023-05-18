//your code here
const imageUrls = ['url1.jpg', 'url2.jpg', 'url3.jpg', 'url4.jpg', 'url5.jpg'];
const imageContainer = document.getElementById('imageContainer');
const images = Array.from(imageContainer.getElementsByClassName('img'));
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');

let selectedImages = [];

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function assignImages() {
  const shuffledUrls = shuffle(imageUrls.concat(imageUrls[Math.floor(Math.random() * imageUrls.length)]));

  images.forEach((img, index) => {
    img.src = shuffledUrls[index];
    img.addEventListener('click', handleClick);
  });
}

function handleClick() {
  if (selectedImages.length < 2 && !selectedImages.includes(this)) {
    selectedImages.push(this);
    this.classList.add('selected');

    if (selectedImages.length === 2) {
      resetButton.style.display = 'inline-block';
      verifyButton.style.display = 'inline-block';
    }
  }
}

function reset() {
  selectedImages.forEach(img => {
    img.classList.remove('selected');
  });
  selectedImages = [];
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  para.textContent = '';
}

function verify() {
  if (selectedImages.length === 2) {
    if (selectedImages[0].src === selectedImages[1].src) {
      para.textContent = 'You are a human. Congratulations!';
    } else {
      para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
  }
  verifyButton.style.display = 'none';
}

resetButton.addEventListener('click', reset);
verifyButton.addEventListener('click', verify);

// Initialize the table on page load
window.addEventListener('load', assignImages);
