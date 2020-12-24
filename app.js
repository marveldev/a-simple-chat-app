import { request } from './dataStorage.js';
import { chatEventListeners, displayItemFromDb, formEventListeners }
from './events.js';

request.onsuccess = () => {
  chatEventListeners();
  formEventListeners();
  displayItemFromDb();
}
