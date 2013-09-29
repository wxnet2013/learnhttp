//Content-Type: application/x-www-form-urlencoded 
var http = require('http'),
fs = require('fs'),
CRLF = '\r\n',
boundary = (new Date).getTime(),
/*
------WebKitFormBoundaryBcQ7Wg0fDGTnhDK2
Content-Disposition: form-data; name="txt1"

txttxt
------WebKitFormBoundaryBcQ7Wg0fDGTnhDK2
Content-Disposition: form-data; name="file1"; filename="19205304-70b0a0bd8c474f13ba3f918e7b9d456f.jpg"
Content-Type: image/jpeg

------WebKitFormBoundaryBcQ7Wg0fDGTnhDK2--
*/
body = [
'--' + boundary + CRLF,
'Content-Disposition: form-data; name="txt"' + CRLF + CRLF,
'txtvalue' + CRLF,
'--' + boundary + CRLF,
'Content-Disposition: form-data; name="file1"; filename="1.jpg"' + CRLF,
'Content-Type: image/jpeg'  + CRLF + CRLF
].join(''),
//multipart/form-data
options = {
  hostname: '127.0.0.1',
  port: 1337,
  path: '/upload',
  method: 'POST',
  headers: {
	  'User-Agent': 'Mozilla/4.0',
	  //'Content-Length': body.length,
  	  'Content-Type': 'multipart/form-data; boundary=' + boundary
  }
};

//console.log(body);

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
req.write(body + CRLF);

//设置1M的缓冲区
var fileStream = fs.createReadStream('1.jpg',{bufferSize:1024 * 1024});
fileStream.pipe(req,{end:false});
fileStream.on('end',function(){
	req.end(CRLF + '--' + boundary + '--');
});

//req.end();