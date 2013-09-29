//Content-Type: application/x-www-form-urlencoded 

var http = require('http'),
//application/x-www-form-urlencoded
body = encodeURI('a=1&b=2&c=中文'),
options = {
  hostname: '127.0.0.1',
  port: 1337,
  path: '/upload',
  method: 'POST',
  headers: {
	  'User-Agent': 'Mozilla/4.0',
	  'Content-Length': body.length,
  	  'Content-Type': 'application/x-www-form-urlencoded'
  }
};

function onResponse(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
}

function onError(e){
	console.log('problem with request: ' + e.message);
}

var req = http.request(options, onResponse);
req.on('error', onError);

// write data to request body
req.write(body + '\r\n');
req.end();