const textarea = document.querySelector('.textarea');
const sendButton = document.querySelector('.send-button');
const divContainer = document.querySelector('.div-container');
const boxOne = document.querySelector('.box1');
const navSection = document.querySelector('.nav-section');
const firstPersonButton = document.querySelector('.person1');
const secondPersonButton = document.querySelector('.person2');
const body = document.querySelector('body');
const toggleOnButton = document.querySelector('.fa-toggle-on');


let count = 1;

function appendComment() {
  const commentValue = `
    <small class="small">comments:${count}</small>
  `
  boxOne.innerHTML = commentValue;
}

function removeItem() {
  const deleteIcons = document.querySelectorAll('.fa-trash');
  for (let index = 0; index < deleteIcons.length; index++) {
    const element = deleteIcons[index];
    element.addEventListener('click', () => {
      const item = element.parentElement;
      divContainer.removeChild(item);
    })
  }
}

toggleOnButton.addEventListener('click', () => {
  if (body.style.backgroundColor == 'violet') {
    body.style.backgroundColor = 'grey';
  } else if(body.style.backgroundColor == 'grey') {
    body.style.backgroundColor = '#e93212d2';
  } else if(body.style.backgroundColor == '#e93212d2') {
    body.style.backgroundColor = '#1212e957';
  } else {
    body.style.backgroundColor = 'violet';
  }
})

function displayModal() {
  const textareaValue = textarea.value.trim();
  event.preventDefault();
  if (textareaValue.length > 1) {
    navSection.style.display = 'block';
    appendComment();
    count++
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
      <i class="fa fa-trash"></i>
    </div>
  `
  divContainer.style.display = 'block';
  divContainer.innerHTML += chatText;
  textarea.value = '';
  navSection.style.display = 'none';
  removeItem();
} 

firstPersonButton.addEventListener('click', addToDom);

function addToDomTwo() {
  event.preventDefault();
  const textareaValue = textarea.value.trim();
  const chatText = `
    <div class="text-container content">
      <span>${textareaValue}</span><br>
      <small>${new Date().toLocaleTimeString()} &#x2713;</small>
      <i class="fa fa-trash"></i>
    </div>
  `
  divContainer.style.display = 'block';
  divContainer.innerHTML += chatText;
  textarea.value = '';
  navSection.style.display = 'none';
  removeItem();
}

secondPersonButton.addEventListener('click', addToDomTwo);
