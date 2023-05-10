const Playlist = require('../model/Playlist');

class PlaylistController{
    index(req,res,next){
        Playlist.find()
            .then(playlist => {
                res.json(playlist);
            })
            .catch(next) 
    }

}

module.exports = new PlaylistController;