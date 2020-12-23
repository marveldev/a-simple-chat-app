const messageInputBox = document.querySelector('.message-input-box');
const sendMessageButton = document.querySelector('.send');
const divContainer = document.querySelector('.div-container');
const overlay = document.querySelector('.overlay');
const personOptionsButtons = document.querySelector('.person-options');
const firstPersonButton = document.querySelector('.person1');
const secondPersonButton = document.querySelector('.person2');

let messageCount = 0;

document.body.style.backgroundColor = localStorage.getItem('theme');

// const dataStore = JSON.parse(localStorage.getItem('dataStore'));
// console.log(dataStore);

const getItemFromLocalStorage = (dataStore) => {
  console.log(dataStore);
  const messageItem = `
    <div id="${dataStore.itemId}" class="person-one content">
      <div class="arrow-left"></div>
      <div class="text">
        <span class="message-value">${dataStore.messageInputBoxValue}</span><br>
        <small>${new Date().toLocaleTimeString()} &#x2713;</small>
        <button class="open-modal-button" title=${dataStore.itemId}><i class="fa fa-trash"></i></button>
      </div>
      <div class="delete-modal ${dataStore.itemId}">
        <h2>Delete chat?</h2>
        <button class="close button">Cancel</button>
        <button class="delete button" title=${dataStore.itemId}>Delete</button>
      </div>
    </div>
  `
  console.log(messageItem);

  divContainer.style.display = 'block';
  divContainer.innerHTML = messageItem;
  displayDeleteModal();
  removeItem();
  closeDeleteModal();
}

getItemFromLocalStorage(JSON.parse(localStorage.getItem('dataStore')));

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
    overlay.style.display = 'block';
    personOptionsButtons.style.display = 'block';
  } else {
    alert('please enter a valid figure.')
  }
});

document.querySelector('.cancel').addEventListener('click', () => {
  overlay.style.display = 'none';
  personOptionsButtons.style.display = 'none';
})

function displayDeleteModal() {
  const openModalButtons = document.querySelectorAll('.open-modal-button');
  for (let index = 0; index < openModalButtons.length; index++) {
    const openModalButton = openModalButtons[index];
    openModalButton.addEventListener('click', () => {
      const messageItem = openModalButton.title;
      const deleteModal = document.querySelector(`.${messageItem}`);
      overlay.style.display = 'block';
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
      const itemDiv = document.querySelector(`#${messageItem}`);
      divContainer.removeChild(itemDiv);
      overlay.style.display = 'none';
      messageCount--;
      const messageCountDiv = document.querySelector('.message-count');
      messageCountDiv.innerHTML = `message-count: ${messageCount}`;
      if (messageCount < 1) {
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
      overlay.style.display = 'none';
    })
  }
}

document.querySelector('.theme').addEventListener('click', () => {
  overlay.style.display = 'block';
  document.querySelector('#theme').style.display = 'block';
});

function changeBackground(element) {
  const value = element.innerText;
  switch(value) {
    case 'default':
      document.body.style.backgroundColor = '#1212e957';
      localStorage.setItem('theme', '#1212e957');
      break;
    case 'grey':
      document.body.style.backgroundColor = '#7c7575e0';
      localStorage.setItem('theme', '#7c7575e0');
      break;
    case 'green':
      document.body.style.backgroundColor = '#2c6936d2';
      localStorage.setItem('theme', '#2c6936d2');
      break;
    case 'red':
      document.body.style.backgroundColor = '#973232f8';
      localStorage.setItem('theme', '#973232f8');
      break;
    case 'blue':
      document.body.style.backgroundColor = '#303061d8';
      localStorage.setItem('theme', '#303061d8');
      break;
  }
  overlay.style.display = 'none';
  document.querySelector('#theme').style.display = 'none';
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
  overlay.style.display = 'none';
  personOptionsButtons.style.display = 'none';
  displayMessageCount();
  displayDeleteModal();
  removeItem();
  closeDeleteModal();

  const addEntryToLocalStorage = {
    itemId: itemId,
    messageInputBoxValue: messageInputBoxValue
  };

  localStorage.setItem('dataStore', JSON.stringify(addEntryToLocalStorage))
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
  overlay.style.display = 'none';
  personOptionsButtons.style.display = 'none';
  displayMessageCount();
  displayDeleteModal();
  removeItem();
  closeDeleteModal();

  const addEntryToLocalStorage = {
    itemId: itemId,
    messageInputBoxValue: messageInputBoxValue
  };

  localStorage.setItem('dataStore', JSON.stringify(addEntryToLocalStorage))
}

secondPersonButton.addEventListener('click', addPersonTwoChatToDom);
