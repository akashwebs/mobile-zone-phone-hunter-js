// search button 
const PhoneSearchButton = document.getElementById('search-button');
// input serach  field
const inputSearch = document.getElementById('serach-input');
// error massge get id
const errroMessge = document.getElementById('error-messege');

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
    // serach result show funciton 
const mobileDisplayResult = data => {
    const serachTweentyPhone = data.slice(0, 20)
        // result search container
    const ResultContainer = document.getElementById('mobile-result-container');
    ResultContainer.textContent = ''

    if (serachTweentyPhone.length == 0) {
        errroMessge.innerText = "No result found, please try again!!";
    } else {
        serachTweentyPhone.forEach(data => {
            errroMessge.innerText = ''
            console.log(data)
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card">
                    <img src="${data.image}" class="w-50 pt-4 pb-3 mx-auto card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.phone_name}</h5>
                        <span class="badge bg-success">${data.brand}</span>
                    </div>
                <div class="px-3 pb-3">
                    <button onclick='phoneDetails("${data.slug}")' class="btn btn-primary px-4">Details</button>
                </div>
            </div>
            `
            ResultContainer.appendChild(div);
        })
    }
}

const phoneDetails = data => {
        const url = `https://openapi.programming-hero.com/api/phone/${data}`
        fetch(url)
            .then(res => res.json())
            .then(data => seeDetails(data.data))
    }
    // see details 
const seeDetails = data => {
    console.log(data)
}