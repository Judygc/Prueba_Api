var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var chalk = require('chalk');
var proxy = require('http-proxy-middleware');
var port = 3000;
var app = express();
var compiler = webpack(config);


var options = {
        target: 'http://proyectos.azulae.net/api/v1/', // target host
        changeOrigin: true,               // needed for virtual hosted sites
        ws: true,                         // proxy websockets
        pathRewrite: {
            '^/api/old-path' : '/api/new-path',     // rewrite path
            '^/api/remove/path' : '/path'           // remove base path
        },
        router: {
            // when request.headers.host == 'dev.localhost:3000',
            // override target 'http://www.example.org' to 'http://localhost:8000'
            'dev.localhost:3000' : 'http://localhost:8000'
        }
    };
  var optionsPath = {
        target: 'http://proyectos.azulae.net/api/v1/projects/', // target host
        changeOrigin: true,               // needed for virtual hosted sites
        ws: true,                         // proxy websockets
        pathRewrite: {
            '^/(.*)$/tasks' : '/$1/tasks',     // rewrite path
              // remove base path
        },
        router: {
            // when request.headers.host == 'dev.localhost:3000',
            // override target 'http://www.example.org' to 'http://localhost:8000'
            'dev.localhost:3000' : 'http://localhost:8000'
        }
    };

var exampleProxy = proxy(options);
var exampleProxy2 = proxy(optionsPath);

app.use('/issue-token', exampleProxy);
app.use('/projects', exampleProxy);
app.use('/projects/**/tasks', exampleProxy);
app.use('/projects/**/tasks/**', exampleProxy);


app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './app/index.html'));
});

app.listen(port, function onAppListening(err) {
    if (err) {
        console.error(err);

    } else {

        console.log(chalk.green('server started at http://localhost:'+port));
    }
});
