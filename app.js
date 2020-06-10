/*
var port = 3000;

const http = require('http');

var server = http.createServer((req, res) => {
	console.log("// NEW REQUEST //");

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('schieb mich an!');
	res.end();
});

server.listen(port);
console.log('Server running at http://127.0.0.1:' + port + '/');
*/

const files = {
	"model": {
		"version": {
			"latestVersion": "1.6",
			"path": "uploads\\version1_6.bin",
			"fileName": "version1_6.bin"
		}
	}
}

const express = require('express');
const app = express();
const path = require('path');

app.get('/download', (req, res) => {
	const myUrl = new URL("https://tinick.de" + req.url);
	const model = myUrl.searchParams.get("model");
	const version = myUrl.searchParams.get("version");
	const currentSoftwareVersion = myUrl.searchParams.get("swVersion");

	if(model && version && currentSoftwareVersion) {
		if(files[model]) {
			if(files[model][version]) {
				if(currentSoftwareVersion != files[model][version]["latestVersion"]) {
					res.download(files[model][version]["path"], files[model][version]["fileName"]);

				} else {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write("you already have the latest version.");
					res.end();
				}

			} else {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write("the given version couldn't be found.");
				res.end();
			}

		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write("the given model couldn't be found.");
			res.end();
		}

	} else {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('param error');
		res.end();
	}
});
 
app.listen(3000,() => {
	console.log(`application is running at: http://localhost:3000`);
});