// search button 
const PhoneSearchButton = document.getElementById('search-button');
// input serach  field
const inputSearch = document.getElementById('serach-input');
// error massge get id
const errroMessge = document.getElementById('error-messege');
// prduct details container
const detailsContainer = document.getElementById('product-details');

// -----------------fetch api with serach button---------------------
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
    // --------------all prodcut serach reslut ------------------
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
    // -----------single product Details---------------------
const phoneDetails = data => {
        const url = `https://openapi.programming-hero.com/api/phone/${data}`
        fetch(url)
            .then(res => res.json())
            .then(data => seeDetails(data.data))
    }
    // see product details 
const seeDetails = data => {
    // console.log(data)
    detailsContainer.textContent = '';
    // detailsContainer
    const div = document.createElement('div');
    div.className = 'card' + ' ' + 'border-0';
    // ---------------------main fetaures and img---------------------------
    div.innerHTML = `
    <img src="${data.image}" class="w-50 pt-4 pb-3 mx-auto card-img-top" alt="...">
    <div class="card-body">
        <h3 class='my-3'>${data.name}</h3>
        <p class='mb-3 fw-bold'> ${data.releaseDate ? data.releaseDate : 'Release Date Not Found' } </p>
        <table id="main-fetures" class="table table-striped border">
            <tr>
                <th class="fs-5" colspan="2">Main Features</th>

            </tr>
            <tr>
                <th>Chip Set</th>
                <td>${data.mainFeatures.chipSet}</td>
            </tr>
            <tr>
                <th>display Size</th>
                <td>${data.mainFeatures.displaySize}</td>
            </tr>
            <tr>
                <th>Memory</th>
                <td>${data.mainFeatures.memory}</td>
            </tr>
            <tr>
                <th>Storage</th>
                <td>${data.mainFeatures.storage}</td>
            </tr>
            <tr>
                <th>Brand</th>
                <td>${data.brand}</td>
            </tr>
           
        </table>

        
    </div>

    `
    detailsContainer.appendChild(div);

    // get  product sensor info form api
    const sensorDetails = data.mainFeatures.sensors;

    // ----------------------sensor itmes---------------------------
    const sensorUl = document.createElement('ul');
    sensorUl.className = 'list-group' + ' ' + ' mb-4 px-3';
    const sensTitle = document.createElement('h3');
    sensTitle.innerHTML = `<strong> Sensor Details </strong>`;
    sensorUl.appendChild(sensTitle);
    sensorDetails.forEach(sens => {

        const sensorLi = document.createElement('li');
        sensorLi.className = 'list-group-item';
        sensorLi.innerHTML = `
            ${sens}
        `
        sensorUl.appendChild(sensorLi);

    })

    detailsContainer.appendChild(sensorUl);


    detailsContainer.classList.add('border')
}