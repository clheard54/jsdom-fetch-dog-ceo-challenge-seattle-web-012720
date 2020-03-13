document.addEventListener("DOMContentLoaded", function() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(response => response.json())
        .then(json => putImages(json))


    function putImages(json) {
        const imageContainer = document.getElementById("dog-image-container");
        json.message.forEach(url => {
            const image = document.createElement('img');
            image.src = url;
            imageContainer.appendChild(image);
        })
    }

    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(json => addBreed(json));
        
    const breedList = document.getElementById("dog-breeds");

    function addBreed(json) {
        let breedsObj = json.message
        for (const breed in breedsObj) {
            if (breedsObj[breed].length == 0) {
                createBreedLi(breed)
            } else { 
                breedsObj[breed].forEach(element => {
                    createBreedLi(element + " " + breed)
                })
            }
        }
    }

    function createBreedLi(breedName) {
        const li = document.createElement('li');
            li.textContent = breedName;
            li.addEventListener("click", function() {
                li.style = "color:purple"
            })
            breedList.appendChild(li);
    }


    const select = document.getElementById("breed-dropdown")
    select.addEventListener("change", event => {
        document.querySelectorAll('li').forEach(name => {
            name.style = "display: list-item"})
        let letter = event.target.value
        document.querySelectorAll('li').forEach(name => {
            if (letter == '') {
                name.style = "display: list-item";
            }
            else if (name.innerText[0] != letter) {
                name.style = "display: none"
            }
        })
    })

})