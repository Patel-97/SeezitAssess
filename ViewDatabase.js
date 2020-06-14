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
