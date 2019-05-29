const cafeList = document.querySelector('#cafe-list');
const addForm = document.querySelector('#add-cafe-form');

//create element and render cafe
function renderCafe(doc) {
    let li = document.createElement('li');
    li.setAttribute('data-id', doc.id);

    let name = document.createElement('span');
    name.textContent = doc.data().name;
    li.appendChild(name);

    let city = document.createElement('span');
    city.textContent = doc.data().city;
    li.appendChild(city);

    cafeList.append(li);
}

// Getting data
db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});

//save data
addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    db.collection('cafes').add({
        name: addForm.name.value, 
        city: addForm.city.value,
    });
    addForm.name.value = '';
    addForm.city.value = '';
});