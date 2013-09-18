var http = require('http');


function handler(req, res) {
	
	var content = 'html code';
	var contentType =  'text/plain';
	res.setHeader('Content-Type', contentType);
	
	var lastModified = 'Tue, 17 Sep 2013 07:26:08 GMT'; //expires.toUTCString();
	var ifModifiedSince = 'If-Modified-Since'.toLowerCase();
	res.setHeader('Last-Modified', lastModified);
	
	var expires = new Date();
	var maxAge =  60*60*24*365;
	expires.setTime(expires.getTime() + maxAge * 1000);
	
	res.setHeader('Cache-Control', 'max-age=' + maxAge); //maxAge 秒
	res.setHeader('Expires', expires.toUTCString());
	
	
	if(req.headers['if-modified-since'] == lastModified){
		res.setHeader('Content-Length', 0);
		res.writeHead(304, "Not Modified");
		res.end();
	}else {
		res.setHeader('Content-Length', content.length);
		res.end(content);
	}
	
}


http.createServer(handler).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');