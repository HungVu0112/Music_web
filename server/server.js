const express = require('express');
const app = express();
const port = 9000;
const cors = require('cors');
const axios = require('axios');

const route = require('./routes');
const db = require('./config/db');

const Artist = require('./app/model/Artist');
const Song = require('./app/model/Song');
const Album = require('./app/model/Album');

// Connect to DB
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

// const options = {
//     method: 'GET',
//     url: 'https://shazam.p.rapidapi.com/albums/get-details',
//     params: {
//       id: '1239976329',
//       l: 'en-US'
//     },
//     headers: {
//       'X-RapidAPI-Key': '92b1390883mshf9fbb008528d064p12875djsnfc0882ae285f',
//       'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
//     }
//   };
// app.use('/addPlaylist', async (req, res) => {
//     try {
//         const response = await axios.request(options);
        
//         const songs = response.data.data[0].relationships.tracks.data.map(song => {
//             return new Object({
//                 name: song.attributes.name,
//                 sound: song.attributes.previews[0].url,
//             })
//         })

//         const newAlbum = new Album({
//             name: response.data.data[0].attributes.name,
//             image: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/9c/ba/98/9cba98ea-e091-1058-fb14-4631085f8066/886446548432.jpg/800x800bb.jpg",
//             artist: "SZA",
//             songs
//         })

//         newAlbum.save();
        
//         res.json("ok");

            
//     } catch (error) {
//             console.error(error);
//     }
// })



