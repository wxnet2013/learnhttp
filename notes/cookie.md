#HTTP Cookie
## Cookie分类
按生命周期划分：会话Cookie、持久化Cookie
按cookie限制划分：http协议可读、是否要求ssl传输、限定子域名还是主域名、限定目录。

## 响应头
Cookie规则

	Set-Cookie: key=value; domain=.domain.com; expires=Mon, 11-Oct-2019 16:00:00 GMT; path=/;secure;HttpOnly

## 请求头
Cookie规则

	Cookie:k1=v1;k2=v2;k3=v3|v3.1|v3.2


## cookie的限制
不同浏览器对cookie个数及字节数都有限制。
<http://support.microsoft.com/kb/941495>
<http://www.planabc.net/2008/05/22/browser_cookie_restrictions/>
