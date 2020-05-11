var server_properties = {
    port: 3300
};

var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app);

var io = require('socket.io').listen(server);

app.use(express.static('front'));

app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

app.get('/', (req, res) => {
    var path = __dirname + '/front/index.html';
    res.sendFile(path);
});

io.on('connection', (so) => {
    console.log('a user connected');
    so.on('join_room', function(message) {
        so.join(message._access_id);
        message['_status'] = 'joined';
        io.emit('join_room', message);
    });
    so.on('send', function(message) {
        io.to(message._access_id).emit('receive', message);
    });
    so.on('disconnect', function() {
        console.log('disconnect');
    })
});

server.listen(server_properties.port, function () {
    console.log(`server port: ${server_properties.port}`);
});