const Artist = require('../model/Artist');

class ArtistController{
    index(req,res,next){
        Artist.find()
        .then(artist => {
            res.json(artist);
        })
        .catch(next) 
    }

    getArtist(req, res, next) {
        const artistName = req.params.name.replace(/%20/g, " ");
        Artist.findOne({name: artistName})
            .then(artist => {
                res.json(artist);
            })
            .catch(next);
    }
}

module.exports = new ArtistController;