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

document.body.style.backgroundColor = localStorage.getItem('theme');
if (window.innerWidth <= 425) {
  messageForm.style.backgroundColor = localStorage.getItem('formTheme');
}

const getMessageCount = localStorage.getItem('messageCount');
let messageCount = getMessageCount ? getMessageCount : 0;

function formEventListeners() {
  messageInputBox.addEventListener('keydown', () => {
    messageInputBox.style.height = "1px";
    messageInputBox.style.height = (3+messageInputBox.scrollHeight)+"px";
  })

  document.querySelector('.display').addEventListener('click', () => {
    overlay.style.display = 'block';
    document.querySelector('#themeModal').style.display = 'block';
    document.body.classList.add('overlay-open');
  });

  const themeButtons = document.querySelectorAll('.theme');
  for (let index = 0; index < themeButtons.length; index++) {
    const themeButton = themeButtons[index];
    const themeValue  = themeButton.innerText;
    themeButton.addEventListener('click', () => {
      switch(themeValue) {
        case 'default':
          document.body.style.backgroundColor = '#1212e957';
          if (window.innerWidth <= 425) {
            messageForm.style.backgroundColor = '#1212e9';
            localStorage.setItem('formTheme', '#1212e9');
          }
          localStorage.setItem('theme', '#1212e957');
          break;
        case 'grey':
          document.body.style.backgroundColor = '#7c7575e0';
          if (window.innerWidth <= 425) {
            messageForm.style.backgroundColor = '#7c7575';
            localStorage.setItem('formTheme', '#7c7575');
          }
          localStorage.setItem('theme', '#7c7575e0');
          break;
        case 'green':
          document.body.style.backgroundColor = '#2c6936d2';
          if (window.innerWidth <= 425) {
            messageForm.style.backgroundColor = '#2c6936';
            localStorage.setItem('formTheme', '#2c6936');
          }
          localStorage.setItem('theme', '#2c6936d2');
          break;
        case 'red':
          document.body.style.backgroundColor = '#973232f8';
          if (window.innerWidth <= 425) {
            messageForm.style.backgroundColor = '#973232';
            localStorage.setItem('formTheme', '#973232');
          }
          localStorage.setItem('theme', '#973232f8');
          break;
        case 'violet':
          document.body.style.backgroundColor = '#303061d8';
          if (window.innerWidth <= 425) {
            messageForm.style.backgroundColor = '#303061';
            localStorage.setItem('formTheme', '#303061');
          }
          localStorage.setItem('theme', '#303061d8');
          break;
      }
      overlay.style.display = 'none';
      document.querySelector('#themeModal').style.display = 'none';
      document.body.classList.remove('overlay-open');
    });
  }

  document.querySelector('#closeModalButton').addEventListener('click', () => {
    overlay.style.display = 'none';
    document.querySelector('#themeModal').style.display = 'none';
    document.body.classList.remove('overlay-open');
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.querySelector('#themeModal').style.display = 'none';
    personOptionsButtons.style.display = 'none';
    document.body.classList.remove('overlay-open');
    const deleteModals = document.querySelectorAll('.delete-modal');
    for (let index = 0; index < deleteModals.length; index++) {
      const deleteModal = deleteModals[index];
      deleteModal.style.display = 'none';
    }
  })

  sendMessageButton.addEventListener('click', () => {
    const messageInputBoxValue = messageInputBox.value.trim();
    if (messageInputBoxValue.length > 1) {
      overlay.style.display = 'block';
      personOptionsButtons.style.display = 'block';
      document.body.classList.add('overlay-open');
    } else {
      const message =  document.querySelector('.message');
      message.style.display = 'block';
      setTimeout(() => {
        message.style.display = 'none';
      }, 5000);

      const messageButton = document.querySelector('.message-button');
      messageButton.addEventListener('click', () => {
        message.style.display = 'none';
      })
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

function removeChatItem() {
  const deleteButtons = document.querySelectorAll('.delete');
  for (let index = 0; index < deleteButtons.length; index++) {
    const deleteButton = deleteButtons[index];
    deleteButton.addEventListener('click', () => {
      const messageItem = deleteButton.title;
      const itemDiv = document.querySelector(`#${messageItem}`);
      const chatItem = document.querySelector(`div[property=${messageItem}]`);
      chatItem.style.display = 'none';
      const restoreChat = chatItem.nextElementSibling;
      restoreChat.style.display = 'block';

      const deleteModal = deleteButton.parentElement;
      deleteModal.style.display = 'none';
      overlay.style.display = 'none';

      const timeOut = setTimeout(() => {
        divContainer.removeChild(itemDiv);
        deleteEntry(messageItem);
        messageCount--;
        messageCountDiv.innerHTML = `message-count: ${messageCount}`;
        localStorage.setItem('messageCount', messageCount);

        if (messageCount < 1) {
          divContainer.style.display = 'none';
          messageCountDiv.innerHTML = '';
        }
      }, 5000);

      const restoreChats = document.querySelectorAll('.restore-chat');
      for (let index = 0; index < restoreChats.length; index++) {
        const restoreChat = restoreChats[index];
        restoreChat.addEventListener('click', () => {
          restoreChat.previousElementSibling.style.display = 'block';
          restoreChat.style.display = 'none';
          clearTimeout(timeOut);
        })
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

function chatEventListeners() {
  function addPersonOneChatToDom(event) {
    event.preventDefault();
    const itemId = 'id' + Date.parse(new Date()).toString();
    const messageInputBoxValue = messageInputBox.value.trim();
    const chatTime = new Date().toLocaleTimeString();
    const messageItem = `
      <div id="${itemId}" class="person-one content">
        <div class="arrow-left"></div>
        <div class="text" property="${itemId}">
          <span class="message-value">${messageInputBoxValue}</span><br>
          <small>${chatTime} &#x2713;</small>
          <button class="open-modal-button" title=${itemId}><i class="fa fa-trash"></i></button>
        </div>
        <p class="restore-chat">Tap to restore chat in 5secs</p>
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
    document.body.classList.remove('overlay-open');
    displayMessageCount();
    displayDeleteModal();
    removeChatItem();
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
        <div class="text" property="${itemId}">
          <span class="message-value">${messageInputBoxValue}</span><br>
          <small>${chatTime} &#x2713;</small>
          <button class="open-modal-button" title=${itemId}>
            <i class="fa fa-trash"></i>
          </button>
        </div>
        <p class="restore-chat">Tap to restore chat in 5secs</p>
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
    document.body.classList.remove('overlay-open');
    displayMessageCount();
    displayDeleteModal();
    removeChatItem();
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
    const { itemId, itemClass, arrow, chatTime, messageInputBoxValue } = chatItem;
    return `
      <div id="${itemId}" class="${itemClass} content">
        <div class="${arrow}"></div>
        <div class="text" property="${itemId}">
          <span class="message-value">${messageInputBoxValue}</span><br>
          <small>${chatTime} &#x2713;</small>
          <button class="open-modal-button" title=${itemId}>
            <i class="fa fa-trash"></i>
          </button>
        </div>
        <p class="restore-chat">Tap to restore chat in 5secs</p>
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
  removeChatItem();
  closeDeleteModal();
}

export { chatEventListeners, formEventListeners, displayItemFromDb }
