//max-age 响应
var http = require('http'), 
	IP = '127.0.0.1', 
	PORT = 1337;

function handler(req, res) {
	var content = 'html';
	
	//Content-Type:text/html; charset=utf-8
	var contentType =  'text/html; charset=utf-8';
	res.setHeader('Content-Type', contentType);
	
	
	//Set-Cookie: key=value; domain=.domain.com; expires=Mon, 11-Oct-2019 16:00:00 GMT; path=/; HttpOnly
	res.setHeader('Set-Cookie', '.DottextCookie=11; path=/; HttpOnly');
	
	//限定目录 仅 127.0.0.1/test 路径下可读
	//res.setHeader('Set-Cookie', '.DottextCookie=11; path=/test; HttpOnly');
	
	
	//Content-Length: 14
	res.setHeader('Content-Length', content.length);
	res.end(content);
}

http.createServer(handler).listen(PORT,IP);
console.log('Server running at http://%s:%d/',IP,PORT);