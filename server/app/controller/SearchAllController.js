const Artist = require('../model/Artist');
const Playlist = require('../model/Playlist');
const Song = require('../model/Song');

class SearchAllController{
    getAll(req, res, next) {
        const name = req.params.name.replace(/%20/g, " ");
        Promise.all([Artist.find({ name: { $regex : new RegExp(`${name}`, 'i') } }), 
                     Song.find({ name: { $regex : new RegExp(`${name}`, 'i') } }), 
                     Playlist.find({ name: { $regex : new RegExp(`${name}`, 'i') } })])
            .then(([artists, songs, playlists]) => {
                res.json(artists.concat(songs.concat(playlists)));
            })
            .catch(next);
    }

    getArtists(req, res, next) {
        const name = req.params.name.replace(/%20/g, ' ');
        Artist.find({ name: { $regex : new RegExp(`${name}`, 'i') } })
            .then(artists => {
                res.json(artists);
            })
            .catch(next);
    }
}

module.exports = new SearchAllController;

