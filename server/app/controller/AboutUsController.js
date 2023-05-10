const AboutUs = require('../model/AboutUs');

class AboutUsController{
    index(req,res,next){
        AboutUs.find()
        .then(aboutus => {
            res.json(aboutus);
        })
        .catch(next) 
    }
}

module.exports = new AboutUsController;