const Playlist = require('../model/Playlist');

class PlaylistController{
    getAll(req, res, next) {
        Playlist.find()
            .then(playlists => {
                res.json(playlists);
            })
            .catch(next);
    }

    getPlaylist(req, res, next) {
        const playlistName = req.params.name.replace(/%20/g, " ");
        Playlist.findOne({ name: playlistName })
            .then(playlist => {
                res.json(playlist);
            })
            .catch(next);
    }
}

module.exports = new PlaylistController;