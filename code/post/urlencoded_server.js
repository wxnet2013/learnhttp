var http = require('http'), 
	fs = require('fs'),
	IP = '127.0.0.1', 
	PORT = 1337;

function handler(req, res) {
	if (req.method == 'POST') {
		var body = '';
	    req.on('data', function (data) {
	    	body += data;
	    });
	    req.on('end', function () {
			console.log(decodeURI(body));
			res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
			res.end();
	    });
	}
}

http.createServer(handler).listen(PORT,IP);
console.log('Server running at http://%s:%d/',IP,PORT);
