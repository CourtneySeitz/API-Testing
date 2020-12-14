'use strict';

const gbifSearchURL = 'https://api.gbif.org/v1/species/search?q=';

const api_keyPlantNet = '2a10K49jJByXOk1hHs7VjQII8';
const plantNetURL = 'https://my-api.plantnet.org/v2/identify/';
// https://my-api.plantnet.org/v2/identify/all?
// https://my-api.plantnet.org/v2/identify/all?images={url}&organs={flower, leaf, etc}&include-related-images={true or false}&lang=en&api-key=2a10K49jJByXOk1hHs7VjQII8 

const api_keyPlantId = 'F5OR9OEGqaLht0poNjD1QxKP2ep4Rp6cTAKeb6nswYPT68nJNd';
const plantIdURL ='https://api.plant.id/v2/identify';


/*JS for Plant.id API*/
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

    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('Success:', data);
        let html = '';
        data.suggestions.forEach((elem) => {
            html += `<il><p>ID: ${elem.id}</p>
            <p>${elem.plant_name}</p></il>`
        // let elem = document.querySelector("#results");
        // elem.classList.remove(".hidden");
    })
        document.querySelector('#results-list').innerHTML = html;
    })
    .catch(function (error) {
    document.querySelector('#js-error-message').innerHTML = error;
    });
})
}



