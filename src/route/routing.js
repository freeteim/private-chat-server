const router = require('express').Router();

module.exports = function(route, io) {

    router.get('/create/namespace/:access_id', function(req, res) {
        var namespace_id = req.param.access_id;
        var namespace = io.of(namespace_id);
        namespace.on('connection', function(socket) {
            socket.on()
        })
    });

    return router;
}