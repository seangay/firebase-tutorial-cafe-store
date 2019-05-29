const cafeList = document.querySelector('#cafe-list');

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

db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});