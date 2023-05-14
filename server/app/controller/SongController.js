const Song = require('../model/Song');
const Artist = require('../model/Artist');
const CircularJSON = require('circular-json');

class SongController{
    getSongsbyartistName(req, res, next) {
        const artistName = req.params.artistName.replace(/%20/g, " ");
        Song.find({ artist_name: artistName })
            .then(songs => { 
                res.json(songs);
            })
            .catch(next);
    }

    getTops(req, res, next) {
        Promise.all([Song.find().sort({ like: -1 }).limit(4), Song.aggregate([
            { $group: {
              _id: "$artist_name",
              totalLikes: { $sum: "$like" }
            }},
            { $sort: { totalLikes: -1 } }
          ])])
          .then(([songs, artists]) => {
            const artistArr = artists.map(artist => {
                return Artist.findOne({ name: artist._id }).lean().exec()
                    .then(artistObj => {
                        return CircularJSON.parse(CircularJSON.stringify(artistObj));
                    });
            });
        
            Promise.all(artistArr)
                .then(result => {
                    res.json(result.concat(songs));
                })
                .catch(next);
          })
          .catch(next);
    }
}

module.exports = new SongController;