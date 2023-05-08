const User = require('../model/User');
const Playlist = require('../model/Playlist');

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

    getUser(req, res, next) {
        User.findOne({ username: req.params.username })    
            .then(user => {
                res.json(user);
            })
            .catch(next);
    }

    createPlaylist(req, res, next) {
        User.findOne({ username: req.params.name })
            .then(user => {
                var count = user.playlists.length + 1;
                
                const name = `Playlist #${count}`;
                const image = "https://i.icanvas.com/list-square/instruments-JCA5.jpg";
                var songs = [];

                const playlist = new Playlist({
                    name: name,
                    image: image,
                    songs: songs
                })

                user.playlists.push(playlist);
                user.save();

                res.json(playlist);
            })
            .catch(next)
    }

    deletePlaylist(req, res, next) {
        User.findOne({ username: req.params.username })
            .then(user =>{
                user.playlists.splice(req.params.id, 1);
                user.save();
                res.json("Deleted!");
            })  
            .catch(next)
    }
}

module.exports = new UserController;