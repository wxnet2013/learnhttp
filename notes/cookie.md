#HTTP Cookie
## Cookie分类
按Cookie生命周期划分：会话Cookie、持久化Cookie expires

	//会话Cookie
	res.setHeader('Set-Cookie', '_session_=Ea2U9ib0_; domain=.domain.com; path=/');
	
	//持久化Cookie
	res.setHeader('Set-Cookie', 'unick=wxnet2013; domain=.domain.com; path=/; expires=Mon, 11-Oct-2019 16:00:00 GMT');
	
按Cookie限制划分：限定子域名还是主域名 domain、限定目录 path、是否仅HTTP协议可读 HttpOnly、是否仅ssl传输 Secure。

	//限定域名为子域名
	res.setHeader('Set-Cookie', '_subdomain=1; domain=my.domain.com; path=/');
	
	//限定http协议只读
	res.setHeader('Set-Cookie', '_http=1; domain=.domain.com; path=/; HttpOnly');

	//限定目录 仅127.0.0.1/test 路径匹配后，设置cookie
	res.setHeader('Set-Cookie', '_path_test=1; domain=.domain.com; path=/test');

	//限定ssl
	res.setHeader('Set-Cookie', '_secure=1; domain=.domain.com; path=/; Secure');

## 响应头
Cookie规则

	Set-Cookie: key=value; domain=.domain.com; expires=Mon, 11-Oct-2019 16:00:00 GMT; path=/; Secure; HttpOnly

## 请求头
Cookie规则

	Cookie:k1=v1;k2=v2;k3=v3|v3.1|v3.2


## cookie的限制
不同浏览器对cookie个数及字节数都有限制。
<http://support.microsoft.com/kb/941495>
<http://www.planabc.net/2008/05/22/browser_cookie_restrictions/>
