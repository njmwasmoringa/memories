
let memoriesImage;
const apiHost = "http://localhost:3000";

function onMemoriesFormSubmit(evt) {
    evt.preventDefault();

    /* const form = event.target;
    const memoriesText = form.memoriesText.value;
    const image = form.memoriesImage.value; */

    const memoriesText = document.getElementById('memoriesText').value;
    // image url memoriesImage

    const fetchParameters = {
        method: 'POST',
        body: JSON.stringify({
            memoriesText,
            memoriesImage
        }),
        headers:{
            "Content-Type": "application/json"
        }
    }

    fetch( `${apiHost}/memories`, fetchParameters ).then( (response)=>{
        getAndLoadMemories();
    } );

    debugger

}

function getImage(evt) {
    const file = evt.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = e => {
        memoriesImage = e.target.result;
    }
    fileReader.readAsDataURL(file);
}

function getAndLoadMemories(){

    // Clear the status before the request
    document.getElementById("status").innerHTML = ``;

    // Request for the memories
    fetch( `${apiHost}/memories` )
    .then( resp=>{
        if(resp.status != 200){
            throw new Error( resp.statusText );
        }
        return resp.json();
    } )
    .then( memories=>{
        
        const memoriesHtmlContent = memories
        .sort((a, b)=>b.id - a.id)
        .map( cardHtml ).join('');

        document.getElementById('postedMemories').innerHTML = memoriesHtmlContent;
    } )
    .catch( error=>{
        document.getElementById("status").innerHTML = `Error: ${error.message}`;
    } );
}

function cardHtml( memory ){
    return `
    <div class="card mb-3">
        <img src="${memory.memoriesImage}" class="card-img-top" alt="...">
        <div class="card-body">
        <p class="card-text">${memory.memoriesText}</p>
        </div>
    </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {

    const memoriesForm = document.querySelector('#memoriesForm');
    memoriesForm.addEventListener('submit', onMemoriesFormSubmit);
    document.getElementById('image').addEventListener('change', getImage);

    getAndLoadMemories();
});