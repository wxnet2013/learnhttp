// server example
// Running a gzip operation on every request is quite expensive.
// It would be much more efficient to cache the compressed buffer.
var zlib = require('zlib'),
	http = require('http'), 
	fs = require('fs'),
	IP = '127.0.0.1', 
	PORT = 1337;

function handler(req, res) {
    var raw = fs.createReadStream('index.html');
    var acceptEncoding = req.headers['accept-encoding'];
    if (!acceptEncoding) {
      acceptEncoding = '';
    }
    res.setHeader('Content-Type', 'text/html');
	
    // Note: this is not a conformant accept-encoding parser.
    // See http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
    if (acceptEncoding.match(/\bgzip\b/)) {
        res.writeHead(200, { 'content-encoding': 'gzip' });
        raw.pipe(zlib.createGzip()).pipe(res);
    } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.writeHead(200, { 'content-encoding': 'deflate' });
        raw.pipe(zlib.createDeflate()).pipe(res);
    } else {
      res.writeHead(200, {});
      raw.pipe(res);
    }
}

http.createServer(handler).listen(PORT,IP);
console.log('Server running at http://%s:%d/',IP,PORT);
