var http = require('http'), 
	IP = '127.0.0.1', 
	PORT = 1337;


function handler(req, res) {
	var content = 'alert(\'Cache\');',
		contentType =  'application/x-javascript; charset=utf-8',
		lastModified = 'Tue, 17 Sep 2013 07:26:08 GMT',//expires.toUTCString();
		ETag = '5b-4be051d263600',
		ifNoneMatch = 'If-None-Match'.toLowerCase(),
		ifModifiedSince = 'If-Modified-Since'.toLowerCase(),
		expires = new Date(),
		maxAge =  60*60*24*365;
		
	expires.setTime(expires.getTime() + maxAge * 1000);
	
	res.setHeader('Content-Type', contentType);
	res.setHeader('Last-Modified', lastModified);
	res.setHeader('ETag', ETag);
	res.setHeader('Cache-Control', 'max-age=' + maxAge); //秒
	res.setHeader('Expires', expires.toUTCString());
	
	if(req.headers[ifModifiedSince] == lastModified || req.headers[ifNoneMatch] == ETag){
		res.setHeader('Content-Length', 0);
		res.writeHead(304, "Not Modified");
		res.end();
	} else {
		res.setHeader('Content-Length', content.length);
		res.end(content);
	}
}

http.createServer(handler).listen(PORT,IP);
console.log('Server running at http://%s:%d/',IP,PORT);
