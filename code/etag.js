//ETag 响应
var http = require('http'), 
	IP = '127.0.0.1', 
	PORT = 1337;

function handler(req, res) {
	var content = 'alert(\'ETag\');',
		contentType =  'application/x-javascript; charset=utf-8',
		ETag = '5b-4be051d263600',
		ifNoneMatch = 'If-None-Match'.toLowerCase();
		
	//Content-Type: application/x-javascript; charset=utf-8
	res.setHeader('Content-Type', contentType);
	//ETag: "5b-4be051d263600"
	res.setHeader('ETag', ETag);
	
	if(req.headers[ifNoneMatch] == ETag){
		res.setHeader('Content-Length', 0);
		res.writeHead(304, "Not Modified");
		res.end();
	} else {
		//Content-Length: 14
		res.setHeader('Content-Length', content.length);
		res.end(content);
	}
}

http.createServer(handler).listen(PORT,IP);
console.log('Server running at http://%s:%d/',IP,PORT);