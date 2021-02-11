var http = require('http');
var server = http.createServer(function (request, response) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World\n");
        response.end();
}).listen(2115,"127.0.0.1");
console.log('Server running at http://127.0.0.1:2115/');