
let memoriesImage;
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

    fetch( "http://localhost:3000/memories", fetchParameters ).then( (response)=>{
        console.log(response);
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

document.addEventListener("DOMContentLoaded", () => {

    const memoriesForm = document.querySelector('#memoriesForm');
    memoriesForm.addEventListener('submit', onMemoriesFormSubmit);

});