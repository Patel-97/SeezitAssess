let db;
var form=document.querySelector("form");
window.onload = function(){
	let request = window.indexedDB.open('notes_db', 1);

  request.onerror = function() {
  console.log('Database failed to open');
};

// onsuccess handler signifies that the database opened successfully
  request.onsuccess = function() {
  console.log('Database opened successfully');

  // Store the opened database object in the db variable. This is used a lot below
  db = request.result;


};

request.onupgradeneeded = function(e) {
  // Grab a reference to the opened database
  let db = e.target.result;

  // Create an objectStore to store our notes in (basically like a single table)
  // including a auto-incrementing key
  let objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement:true });

  // Define what data items the objectStore will contain
  objectStore.createIndex('Address', 'Address', { unique: true });
  objectStore.createIndex('Street_address', 'Street_address', { unique: false });
  objectStore.createIndex('Route', 'Route', { unique: false });
  objectStore.createIndex('City', 'City', { unique: false });
  objectStore.createIndex('State', 'State', { unique: false });
  objectStore.createIndex('Zip', 'Zip', { unique: false });
  objectStore.createIndex('Country', 'Country', { unique: false });



  console.log('Database setup complete');

};

form.onsubmit = addData;

function addData(e) {
  // prevent default - we don't want the form to submit in the conventional way
  e.preventDefault();

  // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
  let newItem = { title: titleInput.value, body: bodyInput.value };

  // open a read/write db transaction, ready for adding the data
  let transaction = db.transaction(['notes_os'], 'readwrite');

  // call an object store that's already been added to the database
  let objectStore = transaction.objectStore('notes_os');

  // Make a request to add our newItem object to the object store
  let request = objectStore.add(newItem);
  request.onsuccess = function() {
    // Clear the form, ready for adding the next entry
    titleInput.value = '';
    bodyInput.value = '';
  };

  // Report on the success of the transaction completing, when everything is done
  transaction.oncomplete = function() {
    console.log('Transaction completed: database modification finished.');

    // update the display of data to show the newly added item, by running displayData() again.
    displayData();
  };

  transaction.onerror = function() {
    console.log('Transaction not opened due to error');
  };
}


function displayData() {
  
    // Open our object store and then get a cursor - which iterates through all the
  // different data items in the store
  let objectStore = db.transaction('notes_os').objectStore('notes_os');
  objectStore.openCursor().onsuccess = function(e) {
    // Get a reference to the cursor
    let cursor = e.target.result;

    // If there is still another data item to iterate through, keep running this code
    if(cursor) {
      // Create a list item, h3, and p to put each data item inside when displaying it
      // structure the HTML fragment, and append it inside the list
      const listItem = document.createElement('li');
      const h3 = document.createElement('h3');
      const para1 = document.createElement('p');
      const para2 = document.createElement('p');
      const para3 = document.createElement('p');
      const para4 = document.createElement('p');
      const para5 = document.createElement('p');
      const para6 = document.createElement('p');


      listItem.appendChild(h3);
      listItem.appendChild(para);
      list.appendChild(listItem);

      // Put the data from the cursor inside the h3 and para
      h3.textContent = cursor.value.Address;
      para1.textContent = cursor.value.Street_address;
      para2.textContent = cursor.value.Route;
      para3.textContent = cursor.value.City;
      para4.textContent = cursor.value.State;
      para5.textContent = cursor.value.Zip;
      para6.textContent = cursor.value.Country;
      
      


      // Store the ID of the data item inside an attribute on the listItem, so we know
      // which item it corresponds to. This will be useful later when we want to delete items
      listItem.setAttribute('data-note-id', cursor.value.id);

      // Create a button and place it inside 

      // Iterate to the next item in the cursor
      cursor.continue();
    } else {
      // Again, if list item is empty, display a 'No notes stored' message
      if(!list.firstChild) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No notes stored.';
        list.appendChild(listItem);
      }
      // if there are no more cursor items to iterate through, say so
      console.log('Notes all displayed');
    }
  };
}

}