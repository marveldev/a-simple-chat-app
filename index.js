const textarea = document.querySelector('.textarea');
const sendButton = document.querySelector('.send-button');
const divContainer = document.querySelector('.div-container');
const navSection = document.querySelector('.nav-section');
const firstPersonButton = document.querySelector('.person1');
const secondPersonButton = document.querySelector('.person2');

function displayPersons() {
  const textareaValue = textarea.value.trim();
  event.preventDefault();
  if (textareaValue.length > 1) {
    navSection.style.display = 'block';
  } else {
    alert('please enter a valid figure.')
  }
}
 
sendButton.addEventListener('click', displayPersons);

function addToDom() {
  event.preventDefault();
  const textareaValue = textarea.value.trim();
  const chatText = `
    <div>
      <span class="text-container">
        ${textareaValue}<br>
        <small>${new Date().toLocaleTimeString()} &#x2713;</small>
      </span>
    </div>
  `
  divContainer.style.display = 'block';
  divContainer.innerHTML += chatText;
  textarea.value = '';
  navSection.style.display = 'none';
}

firstPersonButton.addEventListener('click', addToDom);

function addToDomTwo() {
  event.preventDefault();
  const textareaValue = textarea.value.trim();
    const chatText = `
      <div style="direction:rtl">
        <span class="span-container">${textareaValue}</span><br>
      </div>
      <small>${new Date().toLocaleTimeString()} &#x2713;</small>
    `
    divContainer.style.display = 'block';
    divContainer.innerHTML += chatText;
    textarea.value = '';
    navSection.style.display = 'none';
}

secondPersonButton.addEventListener('click', addToDomTwo);
