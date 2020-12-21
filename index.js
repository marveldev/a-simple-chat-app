const messageInputBox = document.querySelector('.message-input-box');
const sendMessageButton = document.querySelector('.send');
const divContainer = document.querySelector('.div-container');
const personOptionsModal = document.querySelector('.person-options-modal');
const firstPersonButton = document.querySelector('.person1');
const secondPersonButton = document.querySelector('.person2');

let messageCount = 0;

messageInputBox.addEventListener('keydown', () => {
  messageInputBox.style.height = "1px";
  messageInputBox.style.height = (3+messageInputBox.scrollHeight)+"px";
})

function displayMessageCount() {
  messageCount++
  const messageCountDiv = document.querySelector('.message-count');
  messageCountDiv.innerHTML = `message-count: ${messageCount}`;
}

sendMessageButton.addEventListener('click', () => {
  const messageInputBoxValue = messageInputBox.value.trim();
  if (messageInputBoxValue.length > 1) {
    personOptionsModal.style.display = 'block';
  } else {
    alert('please enter a valid figure.')
  }
});

document.querySelector('.cancel').addEventListener('click', () => {
  personOptionsModal.style.display = 'none';
})

function displayDeleteModal() {
  const openModalButtons = document.querySelectorAll('.open-modal-button');
  for (let index = 0; index < openModalButtons.length; index++) {
    const openModalButton = openModalButtons[index];
    openModalButton.addEventListener('click', () => {
      const messageItem = openModalButton.title;
      const deleteModal = document.querySelector(`.${messageItem}`)
      deleteModal.style.display = 'block';
    })
  }
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
      if (messageCount <= 1) {
        divContainer.style.display = 'none';
        messageCountDiv.innerHTML = '';
      }
    })
  }
}

function closeDeleteModal() {
  const closeButtons = document.querySelectorAll('.close');
  for (let index = 0; index < closeButtons.length; index++) {
    const closeButton = closeButtons[index];
    closeButton.addEventListener('click', () => {
      const deleteModal = closeButton.parentElement;
      deleteModal.style.display = 'none';
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

function addPersonOneChatToDom(event) {
  event.preventDefault();
  const itemId = 'id' + Math.random().toString(36).substring(7);
  const messageInputBoxValue = messageInputBox.value.trim();
  const messageItem = `
    <div id="${itemId}" class="person-one content">
      <div class="arrow-left"></div>
      <div class="text">
        <span class="message-value">${messageInputBoxValue}</span><br>
        <small>${new Date().toLocaleTimeString()} &#x2713;</small>
        <button class="open-modal-button" title=${itemId}><i class="fa fa-trash"></i></button>
      </div>
      <div class="delete-modal ${itemId}">
        <h2>Delete chat?</h2>
        <button class="close button">Cancel</button>
        <button class="delete button" title=${itemId}>Delete</button>
      </div>
    </div>
  `
  divContainer.style.display = 'block';
  divContainer.innerHTML += messageItem;
  messageInputBox.value = '';
  messageInputBox.style.height = '';
  personOptionsModal.style.display = 'none';
  displayMessageCount();
  displayDeleteModal();
  removeItem();
  closeDeleteModal();
} 

firstPersonButton.addEventListener('click', addPersonOneChatToDom);

function addPersonTwoChatToDom(event) {
  event.preventDefault();
  const itemId = 'id' + Math.random().toString(36).substring(7);
  const messageInputBoxValue = messageInputBox.value.trim();
  const messageItem = `
    <div id="${itemId}" class="person-two content">
      <div class="arrow-right"></div>
      <div class="text">
        <span class="message-value">${messageInputBoxValue}</span><br>
        <small>${new Date().toLocaleTimeString()} &#x2713;</small>
        <button class="open-modal-button" title=${itemId}>
          <i class="fa fa-trash"></i>
        </button>
      </div>
      <div class="delete-modal ${itemId}">
        <h2>Delete chat?</h2>
        <button class="close button">Cancel</button>
        <button class="delete button" title=${itemId}>Delete</button>
      </div>
    </div>
  `
  divContainer.style.display = 'block';
  divContainer.innerHTML += messageItem;
  messageInputBox.value = '';
  messageInputBox.style.height = '';
  personOptionsModal.style.display = 'none';
  displayMessageCount();
  displayDeleteModal();
  removeItem();
  closeDeleteModal();
}

secondPersonButton.addEventListener('click', addPersonTwoChatToDom);
