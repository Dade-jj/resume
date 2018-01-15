var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var routes = {
	'/a': function(req,res){
		res.end(JSON.stringify(req.query));
	},

	'/b': function(req,res){
		res.end('match /b');
	},

	'/a/c': function(req,res){
		res.end('match /a/c');
	},

	'/search': function(req,res){
		res.end('username='+req.body.username+',password='+req.body.password);
	},

	'/getWeather': function(req,res){
		var pathObj = url.parse(req.url,true);
		res.end(JSON.stringify(pathObj.query));
	}
}

function routePath(req,res){
	var pathObj = url.parse(req.url,true);
	var handleFn = routes[pathObj.pathname]
	if(handleFn){
		req.query = pathObj.query;
		var body = '';
		req.on('data',function(chunk){
			body += chunk;
		}).on('end',function(){
			req.body = parseBody(body)
			handleFn(req,res);
		});
	}else {
		staticRoot(path.resolve(__dirname,'static'),req,res)
	}	
}

function staticRoot(staticPath,req,res){
	var pathObj = url.parse(req.url,true);
	var filePath = path.join(staticPath, pathObj.pathname);
	fs.readFile(filePath,'binary',function(err,content){
		if(err){
			res.writeHead(404,'haha Not Found');
			res.write('not found');
			return res.end();
		}

		res.writeHead(200,'OK');
		res.write(content, 'binary');
		res.end();
	});
}

function parseBody(body){
	var obj = {}
	body.split('&').forEach(function(str){
		obj[str.split('=')[0]] = str.split('=')[1]
	})
	return obj;
} 

var server = http.createServer(function(req,res){
	routePath(req,res);
});
server.listen(8000);
