async function build_album() {
    const response = await fetch('/posts');




}


document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(document.querySelector('#uploadForm'));

    fetch('/publish', {
        method: 'POST',
        body: formData,
    }).then(response => {
        if (response.ok) {
            console.log('Data sent successfully!');
        } else {
            console.error('Failed to send data:', response.statusText);
        }
    })
        .catch(error => {
            console.error('Error sending data:', error);
        });



})




// build_album();