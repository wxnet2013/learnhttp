//max-age 响应
var http = require('http'), 
	IP = '127.0.0.1', 
	PORT = 1337;

function handler(req, res) {
	var content = 'alert(\'haha\');';
	
	var contentType =  'application/x-javascript; charset=utf-8';
	//Content-Type: application/x-javascript; charset=utf-8
	res.setHeader('Content-Type', contentType);
	
	var maxAge =  60*60*24*365;
	//Cache-Control: max-age=31536000
	res.setHeader('Cache-Control', 'max-age=' + maxAge);
	
	//Content-Length: 14
	res.setHeader('Content-Length', content.length);
	res.end(content);
}

http.createServer(handler).listen(PORT,IP);
console.log('Server running at http://%s:%d/',IP,PORT);