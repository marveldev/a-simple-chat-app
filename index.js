const messageInputBox = document.querySelector('.message-input-box');
const sendMessageButton = document.querySelector('.send-button');
const divContainer = document.querySelector('.div-container');
const personOptionsModal = document.querySelector('.person-options-modal');
const firstPersonButton = document.querySelector('.person1');
const secondPersonButton = document.querySelector('.person2');
const closeModalButton= document.querySelector('.cancel');

let messageCount = 0;

closeModalButton.addEventListener('click', () => {
  event.preventDefault();
  personOptionsModal.style.display = 'none';
})

function displayMessageCount() {
  messageCount++
  const messageCountDiv = document.querySelector('.message-count');
  messageCountDiv.innerHTML = `message-count: ${messageCount}`;
}

function removeItem() {
  const deleteIcons = document.querySelectorAll('.fa-trash');
  for (let index = 0; index < deleteIcons.length; index++) {
    const deleteIcon = deleteIcons[index];
    deleteIcon.addEventListener('click', () => {
      const messageItem = deleteIcon.parentElement;
      divContainer.removeChild(messageItem);
      messageCount--;
      const messageCountDiv = document.querySelector('.message-count');
      messageCountDiv.innerHTML = `message-count: ${messageCount}`;
    })
  }
}

function changeBackground() {
  const colorOptions = document.querySelector('.color-options');
  switch(colorOptions.value) {
    case 'grey':
      document.body.style.backgroundColor = 'grey';
      break;
    case 'violet':
      document.body.style.backgroundColor = '#b904b9';
      break;
    case 'default':
      document.body.style.backgroundColor = '#1212e957';
      break;
    case 'red':
      document.body.style.backgroundColor = '#b80707da';
      break;
    case 'blue':
      document.body.style.backgroundColor = '#0101c0c7';
      break;
  }
}

function displayPersonOptionModal() {
  const messageInputBoxValue = messageInputBox.value.trim();
  event.preventDefault();
  if (messageInputBoxValue.length > 1) {
    personOptionsModal.style.display = 'block';
  } else {
    alert('please enter a valid figure.')
  }
}

sendMessageButton.addEventListener('click', displayPersonOptionModal);

function addPersonOneChatToDom() {
  event.preventDefault();
  const messageInputBoxValue = messageInputBox.value.trim();
  const messageItem = `
    <div class="text-container">
      <span>${messageInputBoxValue}</span><br>
      <small>${new Date().toLocaleTimeString()} &#x2713;</small>
      <i class="fa fa-trash"></i>
    </div>
  `
  divContainer.style.display = 'block';
  divContainer.innerHTML += messageItem;
  messageInputBox.value = '';
  personOptionsModal.style.display = 'none';
  displayMessageCount()
  removeItem();
} 

firstPersonButton.addEventListener('click', addPersonOneChatToDom);

function addPersonTwoChatToDom() {
  event.preventDefault();
  const messageInputBoxValue = messageInputBox.value.trim();
  const messageItem = `
    <div class="text-container content">
      <span>${messageInputBoxValue}</span><br>
      <small>${new Date().toLocaleTimeString()} &#x2713;</small>
      <i class="fa fa-trash"></i>
    </div>
  `
  divContainer.style.display = 'block';
  divContainer.innerHTML += messageItem;
  messageInputBox.value = '';
  personOptionsModal.style.display = 'none';
  displayMessageCount()
  removeItem();
}

secondPersonButton.addEventListener('click', addPersonTwoChatToDom);
