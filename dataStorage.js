const request = indexedDB.open('chatApp', 2);

request.onsuccess = () => {
  const database = request.result;
  const transaction = database.transaction(['chatApp'], 'readwrite')
  const store = transaction.objectStore('chatApp');
  store.add({text: 'This is a sample Text', userPhoto: 'This is a sample image'})
}

request.onupgradeneeded = () => {
  const database = request.result;
  database.createObjectStore('chatApp', { keyPath: 'itemId' });
}

request.onerror = () => {
  console.log('request unsuccessful');
}

const addEntryToDb = (entry) => {
  const database = request.result;
  const transaction = database.transaction(['chatApp'], 'readwrite');
  const store = transaction.objectStore('chatApp')
  store.add(entry);

  transaction.oncomplete = () => {
    console.log('sucess');
  }

  transaction.onerror = () => {
    console.log(`error adding to chatApp`)
  }
}

const getEntryFromDb = () => {
  const data = new Promise((resolve, reject) => {
    const database = request.result
    const transaction = database.transaction(['chatApp']);
    const store = transaction.objectStore('chatApp')
    const getData = store.getAll();

    getData.onsuccess = () => {
      resolve(getData.result)
    }

    getData.onerror = () => {
      console.log(`error adding to 'item'`)
      reject(getData.error);
    }
  })
  return Promise.resolve(data);
}

const deleteEntry = (entryId) => {
  const database = request.result;
  const transaction = database.transaction(['chatApp'], 'readwrite');
  const store = transaction.objectStore('chatApp');
  store.delete(entryId)
}

export { request, addEntryToDb, getEntryFromDb, deleteEntry };
