'use strict';

const searchURL = 'https://api.gbif.org/v1/species/search?q=';


const api_keyPlantNet = '2a10K49jJByXOk1hHs7VjQII8';
const plantNetURL = 'https://my-api.plantnet.org/v2/identify/'

// https://my-api.plantnet.org/v2/identify/all?

// https://my-api.plantnet.org/v2/identify/all?images={url}&organs={flower, leaf, etc}&include-related-images={true or false}&lang=en&api-key=2a10K49jJByXOk1hHs7VjQII8 



function displayResults(responseJson) {
    console.log(responseJson);
    let html = '';
    // responseJson.results.forEach((elem) => {
    //     console.log(elem);
    //     html += `<li><h3>${elem.canonicalName}</h3>
    //     <p>${elem.scientificName}</p>
    //     <p>${elem.kingdom}</p>`
    // });

    // responseJson.results.forEach((elem) => {
    //     console.log(elem);
    //     html += `<li><h3>${elem.canonicalName}</h3>
    //     <p>Genus: ${elem.genus}</p>
    //     <p>Kingdom: ${elem.kingdom}</p>`
    // });

    responseJson.results.forEach((elem) => {
        elem.vernacularNames.forEach((name) => {
            console.log(name);
            console.log(elem.genus);
            html += `<li><h3>${name.vernacularName}</h3>
            <p>${elem.canonicalName}</p>`
        });
        
    });
    
        $('#results-list').html(html);
        $('#results').removeClass('hidden');
    
};

function getPlants(query) {
    const urlSearch = searchURL + query;
    
console.log(urlSearch);

    fetch(urlSearch)
    .then(response => {
        console.log('response',response);
        if (response.ok) { 
            return response.json();
        }
        throw new Error(JSON.stringify(response));
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
        const err_str = `Something went wrong: ${JSON.stringify(error)}`;
        $('#js-error-message').text(err_str);

    });

};


function watchForm() {
    
        $('#js-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getPlants(searchTerm);
        });
    
}

function getPageEvent() {
    
        $('#plants').click(event => {
            event.preventDefault();
            getPlants();
        })

}


$(watchForm);
$(getPageEvent());