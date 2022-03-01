// search button 
const PhoneSearchButton = document.getElementById('search-button');
// input serach  field
const inputSearch = document.getElementById('serach-input');
PhoneSearchButton.addEventListener('click', () => {
    // get input serach Name
    const searchName = inputSearch.value;
    inputSearch.value = '';
    if (!searchName) {
        alert('wrong input')
    } else {

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchName}`;
        fetch(url)
            .then(res => res.json())
            .then(data => mobileDisplayResult(data.data))
            .catch(error => console.log(error));
    }

})

const mobileDisplayResult = data => {
    const serachTweentyPhone = data.slice(0, 20)

    serachTweentyPhone.forEach(data => {

        console.log(data)
    })
}