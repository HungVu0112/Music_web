const User = require('../model/User');

class UserController {
    checkLogin(req, res, next) {
        User.findOne(req.body)
            .then(user => {
                if (user) {
                    res.json(user);
                }
                else {
                    res.json('not exists');
                }
            })
            .catch(next)
    }

    checkSignup(req, res, next) {
        User.findOne(req.body)
          .then(user => {
                if (!user) {
                    req.body.avatar = 'https://i0.wp.com/310ai.com/wp-content/uploads/2022/10/face.jpg?fit=1024%2C1024&ssl=1';
                    req.body.recent_play = [];
                    const new_user = new User(req.body);
                    new_user.save();
                    res.json('OK');
                }
                else {
                    res.json('exists');
                }
            })
          .catch(next)
    }
}

module.exports = new UserController;