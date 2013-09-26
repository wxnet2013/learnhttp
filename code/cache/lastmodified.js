//Last-Modified 响应
var http = require('http'), 
	IP = '127.0.0.1', 
	PORT = 1337;

function handler(req, res) {
	var content = 'alert(\'Last-Modified\');',
		contentType =  'application/x-javascript; charset=utf-8',
		lastModified = 'Tue, 17 Sep 2013 07:26:08 GMT',
		ifModifiedSince = 'If-Modified-Since'.toLowerCase();
		
	//Content-Type: application/x-javascript; charset=utf-8
	res.setHeader('Content-Type', contentType);
	res.setHeader('Last-Modified', lastModified);
	
	if(req.headers[ifModifiedSince] == lastModified){
		res.setHeader('Content-Length', 0);
		res.writeHead(304, "Not Modified");
		res.end();
	}else {
		//Content-Length: 14
		res.setHeader('Content-Length', content.length);
		res.end(content);
	}
}

http.createServer(handler).listen(PORT,IP);
console.log('Server running at http://%s:%d/',IP,PORT);