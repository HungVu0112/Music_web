const Artist = require('../model/Artist');
const Playlist = require('../model/Playlist');
const Song = require('../model/Song');
const Album = require('../model/Album');

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
        Artist.find({ name: { $regex : new RegExp(`${req.params.name}`, 'i') } })
            .then(artists => {
                res.json(artists);
            })
            .catch(next);
    }

    getAlbums(req, res, next) {
        Album.find({
            $or: [
                { name: { $regex : new RegExp(`${req.params.name}`, 'i') } },
                { artist_name: { $regex : new RegExp(`${req.params.name}`, 'i') } },
            ]
        })
            .then(albums => {
                res.json(albums);
            })
            .catch(next)
    }
}

module.exports = new SearchAllController;

