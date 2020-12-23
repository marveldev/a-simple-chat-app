import { request } from './dataStorage.js';
import { chatEventListeners, displayItemFromDb, formEventListeners } from './events.js';

request.onsuccess = () => {
  console.log('ok');
  chatEventListeners();
  formEventListeners();
  displayItemFromDb();
}
