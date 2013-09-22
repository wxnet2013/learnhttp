//max-age 响应
var http = require('http'), 
	IP = '127.0.0.1', 
	PORT = 1337;

function handler(req, res) {
	var content = 'html';
	
	//Content-Type:text/html; charset=utf-8
	var contentType =  'text/html; charset=utf-8';
	res.setHeader('Content-Type', contentType);
	
	//会话Cookie
	res.setHeader('Set-Cookie', '_session_=Ea2U9ib0_; domain=127.0.0.1; path=/');
	
	//持久化Cookie
	//res.setHeader('Set-Cookie', 'unick=wxnet2013; domain=127.0.0.1; path=/; expires=Mon, 11-Oct-2019 16:00:00 GMT');
	
	//限定为Http只读
	//Set-Cookie: key=value; domain=127.0.0.1; path=/; HttpOnly
	//res.setHeader('Set-Cookie', '_http=1; domain=127.0.0.1; path=/; HttpOnly');
	
	//限定域名 仅my.domain.com域名下生效
	//res.setHeader('Set-Cookie', '_path_test=11; domain=my.domain.com; path=/test');
	
	//限定目录 仅 127.0.0.1/test 路径匹配后，设置cookie
	//res.setHeader('Set-Cookie', '_path_test=11; domain=127.0.0.1; path=/test');
	
	//限定ssl
	//res.setHeader('Set-Cookie', '_secure=1; domain=127.0.0.1; path=/; Secure');
	
	//Content-Length: 14
	res.setHeader('Content-Length', content.length);
	res.end(content);
}

http.createServer(handler).listen(PORT,IP);
console.log('Server running at http://%s:%d/',IP,PORT);