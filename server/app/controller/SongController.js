const Song = require('../model/Song');

class SongController{
    getSongsbyartistName(req, res, next) {
        const artistName = req.params.artistName.replace(/%20/g, " ");
        Song.find({ artist_name: artistName })
            .then(songs => { 
                res.json(songs);
            })
            .catch(next);
    }
}

module.exports = new SongController;