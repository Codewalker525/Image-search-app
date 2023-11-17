const accessKey = "gdbaTs82Ly3MmHSqPehHU3aHBxeca0XYgbpab5-qFOE" //stores API key.

const formEl = document.querySelector("form");    //variable for form search section.
const inputEl = document.getElementById("search-input");    //variable for input section.
const searchResults = document.querySelector(".search-results");    //variable for image containers.
const showMore = document.getElementById("show-more-button");    //variable for show more button.

let inputData= "";    //stores user search input.
let page = 1;    //default page.

// async fuction fetches url for specific images searched.
async function searchImages() {
    inputData = inputEl.value;    
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;   //dynamic url that searches for image.

    const response = await fetch(url);    //fetches images based on query.
    const data = await response.json();    //converts response to json format.

    const results = data.results;     //results stored in results variable.

    if (page === 1){
        searchResults.innerHTML = "";  //gives default images on page 1.
    }

    //search results are mapped out.
    results.map((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++
    if(page > 1){
        showMore.style.display ='block';    //If page number is more that 1, "show more" buttons is displayed.
    }
}

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () =>{    //calls function without event.
    searchImages();
})