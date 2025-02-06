document.getElementById('requestForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const method = document.getElementById('method').value;
    const headersInput = document.getElementById('headers').value;
    const requestBodyInput = document.getElementById('requestBody').value;
    const contentType = document.getElementById('contentType').value;
    const acceptType = document.getElementById('acceptType').value;
    console.log(url, method, headersInput, requestBodyInput, contentType, acceptType)

    let headers = {
        'Content-Type': contentType,
        'Accept': acceptType,
    };

    if (headersInput) {
        try {
            const customHeaders = JSON.parse(headersInput);
            headers = { ...headers, ...customHeaders };
        } catch (error) {
            alert('Invalid JSON in Custom Headers');
            return;
        }
    }

    let body = null;
    if ((method === 'POST' || method === 'PUT') && requestBodyInput) {
        try {
            body = JSON.parse(requestBodyInput);
        } catch (error) {
            alert('Invalid JSON in Request Body');
            return;
        }
    }

    fetch(url, {
        method: method,
        headers: headers,
        body: method === 'GET' ? null : JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseContainer').style.display = 'block';
        document.getElementById('responseData').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        document.getElementById('responseContainer').style.display = 'block';
        document.getElementById('responseData').textContent = `Error: ${error.message}`;
    });
});
