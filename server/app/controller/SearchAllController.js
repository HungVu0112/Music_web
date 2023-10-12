const Artist = require('../model/Artist');
const Playlist = require('../model/Playlist');
const Song = require('../model/Song');
const Album = require('../model/Album');

class SearchAllController{
    getAll(req, res, next) {
        const name = req.params.name.replace(/%20/g, " ");
        Promise.all([Artist.find({ name: { $regex : new RegExp(`${name}`, 'i') } }), 
                     Song.find({ name: { $regex : new RegExp(`${name}`, 'i') } }), 
                     Album.find({ name: { $regex : new RegExp(`${name}`, 'i') } })])
            .then( async ([artists, songs, albums]) => {
                if (artists.length || songs.length || albums.length) {
                    if (artists.length !== 0) {
                        artists = await Promise.all(artists.map(async artist => {
                            var albumCount = await Album.aggregate([
                                { $match: { artist_name : { $regex : new RegExp(`${artist.name}`, 'i') } } },
                                { $count: "albumCount" }
                            ]);

                            if (albumCount.length === 0) {
                                albumCount = [
                                    {
                                        albumCount : 0
                                    }
                                ]
                            }

                            const songCount = await Song.aggregate([
                                { $match: { artist_name: { $regex: new RegExp(`${artist.name}`, 'i') } } },
                                { $count: "songCount" }
                            ]);
                          
                            const songList = await Song.find({ artist_name : { $regex : new RegExp(`${artist.name}`, 'i') } });
                          
                            return {
                              info: artist,
                              songCount,
                              songList,
                              albumCount
                            };
                        }));
                    }
                    
                    res.json({
                        artists,
                        songs,
                        albums
                    })
                } else {
                    res.json({})
                }
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

