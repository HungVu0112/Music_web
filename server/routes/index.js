const userRouter = require('./user');
const artistRouter = require('./artist');
const aboutusRouter = require('./aboutus');
const playlistRouter = require('./playlist');
const songRouter = require('./song');
const searchRouter = require('./searchAll');
const postRouter = require('./post');
const albumRouter = require('./album');

function route(app) {
    app.use('/', userRouter);
    app.use('/', artistRouter);
    app.use('/', aboutusRouter);
    app.use('/', playlistRouter);
    app.use('/', songRouter);
    app.use('/', searchRouter);
    app.use('/', postRouter);
    app.use('/', albumRouter);
}

module.exports = route;