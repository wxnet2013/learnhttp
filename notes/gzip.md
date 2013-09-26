# HTTP压缩
##
## 代码

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

