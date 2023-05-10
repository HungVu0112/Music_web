const userRouter = require('./user');
const artistRouter = require('./artist');
const playlistRouter = require('./playlist');

function route(app) {
    app.use('/', userRouter);
    app.use('/', artistRouter);
    app.use('/', playlistRouter);
}

module.exports = route;