var http = require('http'), 
	formidable = require('formidable'),
	util = require('util'),
	fs = require('fs'),
	IP = '127.0.0.1', 
	PORT = 1337;
	

function handlerPost(req,postData){
	var headers = req.headers,
		contentType = headers['content-type'],
		reBoundary = /boundary=([^=]*)/,
		reData = /\r\nContent\-Disposition: form\-data; name="([^=":\-]*)"(?:; filename="([^=":\-]*)"\r\nContent\-Type: ([^:]*))?\r\n\r\n([\s\S]*)\r\n/
		m = null,
		boundary = '',
		list = null;
		//\r\nContent-Disposition: form-data; name="txt"\r\n\r\ntxtvalue\r\n
	m = contentType.match(reBoundary);
	
	if(m && (boundary = m[1])){
		list = postData.split('--'+boundary);
		//console.log(list);
		list.forEach(function(v){
			//console.log(v.match(reData));
			var m = v.match(reData);
			if(m && m[3] && m[3].indexOf('image/') == 0){
				//console.log(m[4]);
				//TODO 
				/*
				
				var out = fs.createWriteStream('out.jpg');
				out.write(Buffer(m[4],m[4].length));
				out.end();
				*/
				
				/*
				var dataBuffer = new Buffer(m[4]);
				fs.writeFile("out.jpg", dataBuffer, function(err) {
				    
				});
				*/
			} //m[4] ==> value
		});
	}
}

function handler(req, res) {
	if (req.method == 'POST') {
		
		var form = new formidable.IncomingForm();

		form.parse(req, function(err, fields, files) {
		   res.writeHead(200, {'content-type': 'text/plain'});
		   res.write('received upload:\n\n');
		   res.end(util.inspect({fields: fields, files: files}));
		});
		
		/*
		var body = '';
	    req.on('data', function (data) {
	    	body += data;
	    });
	    req.on('end', function () {
			//console.log(req);
			//console.log(body);
			//handlerPost(req,body);
				
		//res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
		//res.end();
	    });
		*/
	}
}

http.createServer(handler).listen(PORT,IP);
console.log('Server running at http://%s:%d/',IP,PORT);
