var http = require('http'), httpProxy = require('http-proxy');

// 新建一个代理 Proxy Server 对象
var proxy = httpProxy.createProxyServer({});

// 捕获异常
proxy.on('error', function (err, req, res) {
 res.writeHead(500, {
 'Content-Type': 'text/plain'
 });
 res.end('Something went wrong. And we are reporting a custom error message.');
});

// 另外新建一个 HTTP 80 端口的服务器，也就是常规 Node 创建 HTTP 服务器的方法。
// 在每次请求中，调用 proxy.web(req, res config) 方法进行请求分发Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = require('http').createServer(function(req, res) {
 // You can define here your custom logic to handle the request
 // and then proxy the request.
 var host = req.url;
 host = url.parse(host); host = host.host;
 
 console.log("host:" + req.headers.host);
 console.log("client ip:" + (req.headers['x-forwarded-for'] || req.connection.remoteAddress));
 
 proxy.web(req, res, { target: 'http://www.tezml.com' });
});

console.log("listening on port 80")
server.listen(800, '169.254.62.142');