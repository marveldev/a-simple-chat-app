const textarea = document.querySelector('.textarea');
const sendButton = document.querySelector('.send-button');
const divContainer = document.querySelector('.div-container');
const boxOne = document.querySelector('.box1');
const navSection = document.querySelector('.nav-section');
const firstPersonButton = document.querySelector('.person1');
const secondPersonButton = document.querySelector('.person2');

let count = 1;

function appendComment() {
  const commentValue = `
    <small class="small">comments:${count}</small>
  `
  boxOne.innerHTML = commentValue;
}

function displayModal() {
  const textareaValue = textarea.value.trim();
  event.preventDefault();
  if (textareaValue.length > 1) {
    navSection.style.display = 'block';
    appendComment();
  } else {
    alert('please enter a valid figure.')
  }
}
sendButton.addEventListener('click', displayModal);

function addToDom() {
  event.preventDefault();
  const textareaValue = textarea.value.trim();
  const chatText = `
    <div class="text-container">
      <span>${textareaValue}</span><br>
      <small>${new Date().toLocaleTimeString()} &#x2713;</small>
    </div>
  `
  divContainer.style.display = 'block';
  boxOne.style.display = 'block';
  divContainer.innerHTML += chatText;
  textarea.value = '';
  navSection.style.display = 'none';
  count++
}

firstPersonButton.addEventListener('click', addToDom);

function addToDomTwo() {
  event.preventDefault();
  const textareaValue = textarea.value.trim();
    const chatText = `
      <div class="text-container content">
        <span>${textareaValue}</span><br>
        <small>${new Date().toLocaleTimeString()} &#x2713;</small>
      </div>
    `
    divContainer.style.display = 'block';
    boxOne.style.display = 'block';
    divContainer.innerHTML += chatText;
    textarea.value = '';
    navSection.style.display = 'none';
    count++
}

secondPersonButton.addEventListener('click', addToDomTwo);
