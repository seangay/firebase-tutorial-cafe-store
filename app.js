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

    let deleteButton = document.createElement('div');
    deleteButton.textContent = 'x';
    li.appendChild(deleteButton);
    deleteButton.addEventListener('click', (evt) => {
        evt.stopPropagation();
        let id = evt.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })

    cafeList.append(li);
}

// Getting data - https://firebase.google.com/docs/firestore/query-data/get-data
db.collection('cafes').where('city', '==', 'marioland').orderBy('name', 'desc').get().then((snapshot) => {
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