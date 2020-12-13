'use strict';

const gbifSearchURL = 'https://api.gbif.org/v1/species/search?q=';

const api_keyPlantNet = '2a10K49jJByXOk1hHs7VjQII8';
const plantNetURL = 'https://my-api.plantnet.org/v2/identify/';

const api_keyPlantId = 'F5OR9OEGqaLht0poNjD1QxKP2ep4Rp6cTAKeb6nswYPT68nJNd';
const plantIdURL ='https://api.plant.id/v2/identify';

// https://my-api.plantnet.org/v2/identify/all?
// https://my-api.plantnet.org/v2/identify/all?images={url}&organs={flower, leaf, etc}&include-related-images={true or false}&lang=en&api-key=2a10K49jJByXOk1hHs7VjQII8 




document.querySelector('button').onclick = function sendIdentification() {
    const files = [...document.querySelector('input[type=file]').files];
    const promises = files.map((file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const res = event.target.result;
            console.log(res);
            resolve(res);
        }
        reader.readAsDataURL(file)
    })
    })
    
    Promise.all(promises).then((base64files) => {
    console.log(base64files)
            
    const data = {
        api_key: api_keyPlantId,
        images: base64files,
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: ["common_names",
                        "url",
                        "name_authority",
                        "wiki_description",
                        "taxonomy",
                        "synonyms"]
    };

    fetch(plantIdURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => {
    console.error('Error:', error);
    });
    console.log('Success', data);
})
};
        
        
        
        
//         {
//                 if (response.ok) { 
//                     return response.json();
//                 }
//                 throw new Error(JSON.stringify(response));
//             })
//             .then(data => displayResults(data))
//             .catch(error => {
//                 const err_str = `Something went wrong: ${JSON.stringify(error)}`;
//                 $('#js-error-message').text(err_str);
//             });


// })
// };




/***************************/
// Success: 
// {id: 8077901, custom_id: null, meta_data: {…}, uploaded_datetime: 1607878505.084601, finished_datetime: 1607878506.840775, …}
// countable: true
// custom_id: null
// fail_cause: null
// feedback: null
// finished_datetime: 1607878506.840775
// id: 8077901
// images: Array(1)
// 0:
// file_name: "c2f66e30946c46cab797b0ea04a01b1d.jpg"
// url: "https://plant.id/media/images/c2f66e30946c46cab797b0ea04a01b1d.jpg"
// __proto__: Object
// length: 1
// __proto__: Array(0)
// meta_data:
// date: "2020-12-13"
// datetime: "2020-12-13"
// latitude: null
// longitude: null
// __proto__: Object
// modifiers: Array(2)
// 0: "crops_fast"
// 1: "similar_images"
// length: 2
// __proto__: Array(0)
// secret: "MENG0eC8dQp9Bxh"
// suggestions: Array(6)
// 0: {id: 59730556, plant_name: "Chrysanthemum", plant_details: {…}, probability: 0.4657141962809841, confirmed: false, …}
// 1: {id: 59730557, plant_name: "Chrysanthemum morifolium", plant_details: {…}, probability: 0.17636030648688472, confirmed: false, …}
// 2: {id: 59730558, plant_name: "Bellis perennis", plant_details: {…}, probability: 0.14409756792400016, confirmed: false, …}
// 3: {id: 59730559, plant_name: "Leucanthemum", plant_details: {…}, probability: 0.034258537677079245, confirmed: false, …}
// 4: {id: 59730560, plant_name: "Leucanthemum vulgare", plant_details: {…}, probability: 0.02020526511118199, confirmed: false, …}
// 5: {id: 59730561, plant_name: "Leucanthemum x superbum", plant_details: {…}, probability: 0.0156699018061354, confirmed: false, …}
// length: 6
// __proto__: Array(0)
// uploaded_datetime: 1607878505.084601
// __proto__: Object
/****************************/

function displayResults(data) {
    let html = '';
//     // responseJson.results.forEach((elem) => {
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

    data.forEach((elem) => {
        console.log(data.images.url);
        elem.suggestions.forEach((suggestions) => {
            console.log(suggestions.plant_name);
            console.log(suggestions.plant_details);
            // console.log(name);
            // console.log(elem.genus);
            html += `<li><p>${elem.images.url}</p>
            <p>${suggestions.plant_details}</p>
            <p>${suggestions.plant_name}</p></li>`
        });
    });
    
        $('#results-list').html(html);
        $('#results').removeClass('hidden');
    
};

// function getPlants(query) {
//     const urlSearch = gbifSearchURL + query;
    
// console.log(urlSearch);

//     fetch(urlSearch)
//     .then(response => {
//         console.log('response',response);
//         if (response.ok) { 
//             return response.json();
//         }
//         throw new Error(JSON.stringify(response));
//     })
//     .then(responseJson => displayResults(responseJson))
//     .catch(error => {
//         const err_str = `Something went wrong: ${JSON.stringify(error)}`;
//         $('#js-error-message').text(err_str);
//     });

// };

// function watchForm() {
//         $('#js-form').submit(event => {
//         event.preventDefault();
//         const searchTerm = $('#js-search-term').val();
//         getPlants(searchTerm);
//         });
    
// }

// function getPageEvent() {
//         $('#plants').click(event => {
//             event.preventDefault();
//             getPlants();
//         })

// }


// $(watchForm);
// $(getPageEvent());