import { request } from './dataStorage.js';
import { addEntryToDb, formEventListeners } from './events.js';

request.onsuccess = () => {
  console.log('ok');
  addEntryToDb();
  formEventListeners();
  // addItemToDom();
  // getItemFromDb();
}
