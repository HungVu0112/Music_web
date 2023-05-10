const userRouter = require('./user');
const artistRouter = require('./artist');
const playlistRouter = require('./playlist');
const songRouter = require('./song');

function route(app) {
    app.use('/', userRouter);
    app.use('/', artistRouter);
    app.use('/', playlistRouter);
    app.use('/', songRouter);
}

module.exports = route;