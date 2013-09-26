//Expires 响应头
var http = require('http');


function handler(req, res) {
	
	var content = 'alert(\'Expires\');';
	var contentType =  'application/x-javascript; charset=utf-8';
	//Content-Type: application/x-javascript; charset=utf-8
	res.setHeader('Content-Type', contentType);
	
	var expires = new Date();
	var maxAge =  60*60*24*365;
	expires.setTime(expires.getTime() + maxAge * 1000);
	
	//Expires: Thu, 18 Sep 2014 05:41:55 GMT
	res.setHeader('Expires', expires.toUTCString());
	
	//Content-Length: 14
	res.setHeader('Content-Length', content.length);
	res.end(content);	
}

http.createServer(handler).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');