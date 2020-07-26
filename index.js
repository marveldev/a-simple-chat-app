const textarea = document.querySelector('.textarea');
const sendButton = document.querySelector('.send-button');
const divContainer = document.querySelector('.div-container');

function addToDom() {
  event.preventDefault();
  const textareaValue = textarea.value.trim();
  if (textareaValue.length > 1) {
    const chatText = `
      <span class="text-container">${textareaValue}</span>
    `
    divContainer.style.display = 'block'
    divContainer.innerHTML += chatText;
    textarea.value = '';
  } else {
    alert('please enter a valid figure.')
  }
}

sendButton.addEventListener('click', addToDom);


