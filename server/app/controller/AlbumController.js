const Album = require('../model/Album');

class AlbumController {
    getAlbums(req, res, next) {
        Album.find()
            .then(albums => {
                res.json(albums);
            })
            .catch(next);
    }
}

module.exports = new AlbumController;