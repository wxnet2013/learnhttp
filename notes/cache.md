# HTTP缓存
## 浏览器端缓存
### Expires
HTTP/1.0中定义
Expires: Tue, 17 Sep 2013 15:55:58 GMT
FireFox下，按刷新按钮会请求服务器，地址栏按回车不会请求
	
	function handler(req, res) {
		var content = 'alert(\'haha\');';
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
### Cache-Control
Cache-Control: max-age=30
FireFox下，按刷新按钮会直接请求服务器，地址栏按回车不会请求，30秒后按回车会请求服务器。


### 总结
Cache-Control的max-age优先级高于Expires，max-age会覆盖Expires的值。
Cache-Control的max-age优先级高于Expires(至少对于Apache是这样的），这意味着如果max-age和expires中的数字不一样时，采取max-age值。如果使用了header定义了Cache-Control: max-age，则完全不需要加上Expries，因为根本没用。例如：你在浏览A页面时，A页面加载了一个名为B的JS文件，该JS文件的Response Header中有Cache-Control: max-age=600，如果你再访问任何其他用到B文件的页面时，600秒内浏览器完全不会向服务器发送请求，直接使用Cache中的内容。600秒以后，Cache失效。想每一次都发送请求，则max-age设为负数。

### 参考资料
<http://hi.baidu.com/fengyun409/item/7b7d381a9c28000ce65c36ee>


## 服务端处理缓存
### Last-Modified
Last-Modified: Tue, 02 Jul 2013 02:58:26 GMT
### ETag
ETag: "d213bdbb34ace1:0"
### HTTP规范
- <http://www.w3.org/Protocols/HTTP/1.0/spec.html#Expires>
- <http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html#sec13>

### code
	



