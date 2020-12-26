import { addEntryToDb, getEntryFromDb, deleteEntry } from "./dataStorage.js";

const messageInputBox = document.querySelector('.message-input-box');
const sendMessageButton = document.querySelector('.send');
const messageCountDiv = document.querySelector('.message-count');
const divContainer = document.querySelector('.div-container');
const overlay = document.querySelector('.overlay');
const personOptionsButtons = document.querySelector('.person-options');
const firstPersonButton = document.querySelector('.person1');
const secondPersonButton = document.querySelector('.person2');
const messageForm = document.querySelector('.form');

document.body.style.backgroundColor = localStorage.getItem('theme') ||' #1212e957';
messageForm.style.backgroundColor = localStorage.getItem('formTheme') || '#6262cc';
const getMessageCount = localStorage.getItem('messageCount');

let messageCount = getMessageCount ? getMessageCount : 0;

function formEventListeners() {
  messageInputBox.addEventListener('keydown', () => {
    messageInputBox.style.height = "1px";
    messageInputBox.style.height = (3+messageInputBox.scrollHeight)+"px";
  })

  document.querySelector('.display').addEventListener('click', () => {
    overlay.style.display = 'block';
    document.querySelector('#theme').style.display = 'block';
  });

  sendMessageButton.addEventListener('click', () => {
    const messageInputBoxValue = messageInputBox.value.trim();
    if (messageInputBoxValue.length > 1) {
      overlay.style.display = 'block';
      personOptionsButtons.style.display = 'block';
      document.body.classList.add('overlay-open');
    } else {
      alert('please enter a valid figure.')
    }
  });

  document.querySelector('.cancel').addEventListener('click', () => {
    overlay.style.display = 'none';
    personOptionsButtons.style.display = 'none';
    document.body.classList.remove('overlay-open');
  })
}

function displayMessageCount() {
  messageCount++
  messageCountDiv.innerHTML = `message-count: ${messageCount}`;
}

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

      messageCount--;
      messageCountDiv.innerHTML = `message-count: ${messageCount}`;
      overlay.style.display = 'none';

      localStorage.setItem('messageCount', messageCount);

      divContainer.removeChild(itemDiv);

      if (messageCount < 1) {
        divContainer.style.display = 'none';
        messageCountDiv.innerHTML = '';
      }

      deleteEntry(messageItem)
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

const themeButtons = document.querySelectorAll('.theme');
for (let index = 0; index < themeButtons.length; index++) {
  const themeButton = themeButtons[index];
  const themeValue  = themeButton.innerText;
  themeButton.addEventListener('click', () => {
    switch(themeValue) {
      case 'default':
        document.body.style.backgroundColor = '#1212e957';
        messageForm.style.backgroundColor = '#6262cc';
        localStorage.setItem('theme', '#1212e957');
        localStorage.setItem('formTheme', '#6262cc');
        break;
      case 'grey':
        document.body.style.backgroundColor = '#7c7575e0';
        messageForm.style.backgroundColor = '#7c7575';
        localStorage.setItem('theme', '#7c7575e0');
        localStorage.setItem('formTheme', '#7c7575');
        break;
      case 'green':
        document.body.style.backgroundColor = '#2c6936d2';
        messageForm.style.backgroundColor = '#2c6936';
        localStorage.setItem('theme', '#2c6936d2');
        localStorage.setItem('formTheme', '#2c6936');
        break;
      case 'red':
        document.body.style.backgroundColor = '#973232f8';
        messageForm.style.backgroundColor = '#973232';
        localStorage.setItem('theme', '#973232f8');
        localStorage.setItem('formTheme', '#973232');
        break;
      case 'violet':
        document.body.style.backgroundColor = '#303061d8';
        messageForm.style.backgroundColor = '#303061';
        localStorage.setItem('theme', '#303061d8');
        localStorage.setItem('formTheme', '#303061');
        break;
    }
    overlay.style.display = 'none';
    document.querySelector('#theme').style.display = 'none';
  });
}

function chatEventListeners() {
  function addPersonOneChatToDom(event) {
    event.preventDefault();
    const itemId = 'id' + Date.parse(new Date()).toString();
    const messageInputBoxValue = messageInputBox.value.trim();
    const chatTime = new Date().toLocaleTimeString();
    const messageItem = `
      <div id="${itemId}" class="person-one content">
        <div class="arrow-left"></div>
        <div class="text">
          <span class="message-value">${messageInputBoxValue}</span><br>
          <small>${chatTime} &#x2713;</small>
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

    localStorage.setItem('messageCount', messageCount);

    const addItemToIndexDb = {
      itemId: itemId,
      itemClass: 'person-one',
      arrow: 'arrow-left',
      chatTime: chatTime,
      messageInputBoxValue: messageInputBoxValue
    };

    addEntryToDb(addItemToIndexDb);
  }
  firstPersonButton.addEventListener('click', addPersonOneChatToDom);

  function addPersonTwoChatToDom(event) {
    event.preventDefault();
    const itemId = 'id' + Date.parse(new Date()).toString();
    const messageInputBoxValue = messageInputBox.value.trim();
    const chatTime = new Date().toLocaleTimeString();
    const messageItem = `
      <div id="${itemId}" class="person-two content">
        <div class="arrow-right"></div>
        <div class="text">
          <span class="message-value">${messageInputBoxValue}</span><br>
          <small>${chatTime} &#x2713;</small>
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

    localStorage.setItem('messageCount', messageCount);

    const addItemToIndexDb = {
      itemId: itemId,
      itemClass: 'person-two',
      arrow: 'arrow-right',
      chatTime: chatTime,
      messageInputBoxValue: messageInputBoxValue
    };

    addEntryToDb(addItemToIndexDb);
  }
  secondPersonButton.addEventListener('click', addPersonTwoChatToDom);
}

async function displayItemFromDb () {
  const chatApp = await getEntryFromDb();
  const chatItems = chatApp.map((chatItem) => {
    JSON.stringify({
      itemId: chatItem.itemId,
      itemClass: chatItem.itemClass,
      arrow: chatItem.arrow,
      chatTime: chatItem.chatTime,
      messageInputBoxValue: chatItem.messageInputBoxValue
    })
    
    const { itemId, itemClass, arrow, chatTime, messageInputBoxValue } = chatItem;

    return `
      <div id="${itemId}" class="${itemClass} content">
        <div class="${arrow}"></div>
        <div class="text">
          <span class="message-value">${messageInputBoxValue}</span><br>
          <small>${chatTime} &#x2713;</small>
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
  })

  divContainer.style.display = 'block';
  divContainer.innerHTML = chatItems.join('');
  messageCountDiv.innerHTML = `message-count: ${messageCount}`;

  if (messageCount < 1) {
    divContainer.style.display = 'none';
    messageCountDiv.innerHTML = '';
  }

  displayDeleteModal();
  removeItem();
  closeDeleteModal();
}

export { chatEventListeners, formEventListeners, displayItemFromDb }
