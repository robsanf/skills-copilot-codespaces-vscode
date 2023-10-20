// Create web server
// Run: node comments.js
// Run: http://localhost:3000/comments
// Run: http://localhost:3000/comments?postId=1

// Load modules
const http = require('http');
const url = require('url');
const fs = require('fs');

// Create web server
http.createServer(function (request, response) {
    // Get the query string
    const query = url.parse(request.url, true).query;
    const postId = query.postId;
    console.log(postId);

    // Read the JSON file
    fs.readFile('comments.json', function (err, data) {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('404 Not Found');
        }
        else {
            // Parse the JSON file
            const comments = JSON.parse(data);
            console.log(comments);

            // Get the comments for the given post id
            let postComments = [];
            if (postId) {
                postComments = comments.filter(c => c.postId == postId);
            }
            else {
                postComments = comments;
            }

            // Return the comments as JSON
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(postComments));
        }
    });
}).listen(3000);

console.log('Server running at http://localhost:3000/comments');