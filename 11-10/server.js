/*import http from 'http';
import fs from 'fs';

function requestReceived(request, response) {
    console.log('Request received');

    if (request.url === '/') {
        // load index.html from public
        // send the data as a response
        let fileData = fs.readFileSync('./public/index.html');
        let responseConfig = {
            ContentType: 'text/html'
        }

        response.writeHead(200, responseConfig);
        response.end(fileData);
    }

}

let server = http.createServer(requestReceived);

server.listen(3000);
*/
import express from 'express';
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/mike', (req, res) => {
    res.send('Hello from Mike!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})