const userRouter = require('./user');
const artistRouter = require('./artist');

function route(app) {
    app.use('/', userRouter);
    app.use('/', artistRouter);
}

module.exports = route;