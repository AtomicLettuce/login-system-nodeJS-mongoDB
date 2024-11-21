async function build_album() {
    const posts = await (await fetch('/posts')).json();

    const container = document.getElementById('container');
    // Get all posts from ser and display them on the page
    if (posts) {
        posts.forEach(post => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col';

            // Create the card container div
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card shadow-sm';

            // Create the image element
            const img = document.createElement('img');
            img.src = post.image; // Set the image source
            img.style.width = '100%';
            img.style.height = '225px';
            img.style.objectFit = 'cover';

            // Create the card body div
            const cardBodyDiv = document.createElement('div');
            cardBodyDiv.className = 'card-body';

            // Create the paragraph for the card text
            const cardTextP = document.createElement('p');
            cardTextP.className = 'card-text';
            cardTextP.textContent = post.description;

            // Create the flex container div
            const flexDiv = document.createElement('div');
            flexDiv.className = 'd-flex justify-content-between align-items-center';
            flexDiv.id = post._id;

            const title = document.createElement('h1');
            title.textContent = post.title;

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'btn btn-sm btn-outline-secondary';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', deletePost);

            // Append button group to the flex container
            flexDiv.appendChild(title);
            flexDiv.appendChild(deleteButton);

            // Append card text and flex container to the card body
            cardBodyDiv.appendChild(cardTextP);
            cardBodyDiv.appendChild(flexDiv);

            // Append image and card body to the card container
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBodyDiv);

            // Append card container to the outermost div
            colDiv.appendChild(cardDiv);

            container.appendChild(colDiv);
        });
    }

}

async function deletePost(event) {
    let id = (event.target).parentElement.id

    // Send delete petition to serverside
    await fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
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

    window.location.reload()

}


document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    var formData = new FormData(document.querySelector('#uploadForm'));

    await fetch('/publish', {
        method: 'POST',
        body: formData
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

    window.location.reload()

})




build_album();