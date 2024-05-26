function handleResponse(response) {
    document.getElementById('responseArea').innerText = JSON.stringify(response, null, 2);
}

async function sendRequest(endpoint, method, body = null) {
    const url = `${API_URL}${endpoint}`;  // Construct URL using API_URL
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        handleResponse(data);
    } catch (error) {
        handleResponse(error);
    }
}

document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const published = document.getElementById('published').checked;
    sendRequest('/api/tutorials/', 'POST', { title, description, published });
});

function findAllTutorials() {
    sendRequest('/api/tutorials/', 'GET');
}

function findPublishedTutorials() {
    sendRequest('/api/tutorials/published', 'GET');
}

function findTutorialById() {
    const id = document.getElementById('searchId').value;
    sendRequest(`/api/tutorials/${id}`, 'GET');
}

function updateTutorial() {
    const id = document.getElementById('updateId').value;
    const title = document.getElementById('updateTitle').value;
    const description = document.getElementById('updateDescription').value;
    const published = document.getElementById('updatePublished').checked;
    sendRequest(`/api/tutorials/${id}`, 'PUT', { title, description, published });
}

function deleteTutorial() {
    const id = document.getElementById('deleteId').value;
    sendRequest(`/api/tutorials/${id}`, 'DELETE');
}

function deleteAllTutorials() {
    sendRequest('/api/tutorials/', 'DELETE');
}

