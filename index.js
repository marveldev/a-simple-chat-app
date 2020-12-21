const messageInputBox = document.querySelector('.message-input-box');
const sendMessageButton = document.querySelector('.send');
const divContainer = document.querySelector('.div-container');
const personOptionsModal = document.querySelector('.person-options-modal');
const firstPersonButton = document.querySelector('.person1');
const secondPersonButton = document.querySelector('.person2');

const textInput = document.querySelector('.message-input-box');
textInput.addEventListener('keydown', () => {
  textInput.style.height = "1px";
  textInput.style.height = (3+textInput.scrollHeight)+"px";
})

let messageCount = 0;

document.querySelector('.cancel').addEventListener('click', () => {
  personOptionsModal.style.display = 'none';
})

function displayMessageCount() {
  messageCount++
  const messageCountDiv = document.querySelector('.message-count');
  messageCountDiv.innerHTML = `message-count: ${messageCount}`;
}

function removeItem() {
  const deleteButtons = document.querySelectorAll('.delete');
  for (let index = 0; index < deleteButtons.length; index++) {
    const deleteButton = deleteButtons[index];
    deleteButton.addEventListener('click', () => {
      const messageItem = deleteButton.title;
      const itemDiv = document.querySelector(`#${messageItem}`)
      divContainer.removeChild(itemDiv);
      messageCount--;
      const messageCountDiv = document.querySelector('.message-count');
      messageCountDiv.innerHTML = `message-count: ${messageCount}`;
    })
  }
}

function displayDeleteModal() {
  const deleteButtons = document.querySelectorAll('.delete-button');
  for (let index = 0; index < deleteButtons.length; index++) {
    const deleteButton = deleteButtons[index];
    deleteButton.addEventListener('click', () => {
      const messageItem = deleteButton.title;
      const deleteModal = document.querySelector(`.${messageItem}`)
      deleteModal.style.display = 'block';
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

function addPersonOneChatToDom(event) {
  event.preventDefault();
  const itemId = 'id' + Math.random().toString(36).substring(7);
  const messageInputBoxValue = messageInputBox.value.trim();
  const messageItem = `
    <div id="${itemId}" class="person-one content">
      <div class="arrow-left"></div>
      <div class="text">
        <span>${messageInputBoxValue}</span><br>
        <small>${new Date().toLocaleTimeString()} &#x2713;</small>
        <button class="delete-button" title=${itemId}><i class="fa fa-trash"></i></button>
      </div>
      <div class="delete-modal ${itemId}">
        <h3>Delete chat?</h3>
        <p>This can't be undone and it will be removed from your permanently.</p>
        <button class="close button">Cancel</button>
        <button class="delete button" title=${itemId}>Delete</button>
      </div>
    </div>
  `
  divContainer.style.display = 'block';
  divContainer.innerHTML += messageItem;
  messageInputBox.value = '';
  personOptionsModal.style.display = 'none';
  displayMessageCount()
  displayDeleteModal()
  removeItem();
} 

firstPersonButton.addEventListener('click', addPersonOneChatToDom);

function addPersonTwoChatToDom(event) {
  event.preventDefault();
  const messageInputBoxValue = messageInputBox.value.trim();
  const messageItem = `
    <div class="person-two content">
      <div class="arrow-right"></div>
      <div class="text">
        <span>${messageInputBoxValue}</span><br>
        <small>${new Date().toLocaleTimeString()} &#x2713;</small>
        <button class="delete-button"><i class="fa fa-trash"></i></button>
      </div>
      <div class="delete-modal">
        <h3>Delete chat?</h3>
        <p>This can't be undone and it will be removed from your permanently.</p>
        <button class="close button">Cancel</button>
        <button class="delete button">Delete</button>
      </div>
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
