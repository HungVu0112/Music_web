const Artist = require('../model/Artist');

class ArtistController{
    index(req,res,next){
        Artist.find()
        .then(artist => {
            res.json(artist);
        })
        .catch(next) 
    }
}

module.exports = new ArtistController;