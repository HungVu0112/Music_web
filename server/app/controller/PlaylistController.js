const Playlist = require('../model/Playlist');

class PlaylistController{
    getAll(req, res, next) {
        Playlist.find()
            .then(playlists => {
                res.json(playlists);
            })
            .catch(next);
    }
}

module.exports = new PlaylistController;