const User = require('../model/User');
const Playlist = require('../model/Playlist');
const Song = require('../model/Song');
const Artist = require('../model/Artist');

class UserController {
    changeInfo(req, res, next) {
        User.findOne({ username: req.params.username })
            .then(user => {
                user.username = req.params.newusername;
                user.avatar = req.params.newavatar;
                user.save();
                res.json("succeed!"); 
            })
            .catch(next)
    }

    changeInfoPlaylist(req, res, next) {
        User.findOne({ username: req.params.username })
            .then(user => {
                user.playlists.forEach(playlist => {
                    if (playlist.name === req.params.name) {
                        playlist.name = req.params.newname;
                        playlist.image = req.params.link;
                    }
                })
                user.save();
                res.json("succeed!"); 
            })
            .catch(next)
    }

    changePw(req, res, next) {
        User.findOne({ username: req.params.username })
            .then(user => {
                user.password = req.params.newpassword;
                user.save();
                res.json("succeed!");
            })
            .catch(next);
    }

    getRecent(req, res, next) {
        User.findOne({ username: req.params.username })
            .then(user => {
                res.json(user.recent);
            })
            .catch(next);
    }

    getFavourite(req, res, next) {
        User.findOne({ username: req.params.username })
            .then(user => {
                res.json(user.favourite);
            })
            .catch(next);
    }

    checkLogin(req, res, next) {
        User.findOne(req.body)
            .then(user => {
                if (user) {
                    res.json(user);
                }
                else {
                    res.json('not exists');
                }
            })
            .catch(next)
    }

    checkSignup(req, res, next) {
        User.findOne(req.body)
          .then(user => {
                if (!user) {
                    req.body.avatar = 'https://i0.wp.com/310ai.com/wp-content/uploads/2022/10/face.jpg?fit=1024%2C1024&ssl=1';
                    req.body.recent = {
                        songs: [],
                        artists: [],
                        playlists: [],
                    };
                    req.body.favourite = {
                        songs: [],
                        artists: [],
                        playlists: [],
                    };
                    const new_user = new User(req.body);
                    new_user.save();
                    res.json('OK');
                }
                else {
                    res.json('exists');
                }
            })
          .catch(next)
    }

    getUser(req, res, next) {
        User.findOne({ username: req.params.username })    
            .then(user => {
                res.json(user);
            })
            .catch(next);
    }

    getPlaylist(req, res, next) {
        const playlistName = req.params.name.replace(/%20/g, " ");
        User.findOne({ username: req.params.username })
            .then(user => {
                user.playlists.map(playlist => {
                    if (playlist.name === playlistName) {
                        res.json(playlist);
                    }
                })
            })
            .catch(next);
    }

    createPlaylist(req, res, next) {
        User.findOne({ username: req.params.name })
            .then(user => {
                var count = user.playlists.length + 1;
                
                const name = `Playlist ${count}`;
                const image = "https://i.icanvas.com/list-square/instruments-JCA5.jpg";
                var songs = [];

                const playlist = new Playlist({
                    name: name,
                    image: image,
                    songs: songs
                })

                user.playlists.push(playlist);
                user.save();

                res.json(playlist);
            })
            .catch(next)
    }

    deletePlaylist(req, res, next) {
        User.findOne({ username: req.params.username })
            .then(user =>{
                user.playlists.splice(req.params.id, 1);
                user.save();
                res.json("Deleted!");
            })  
            .catch(next)
    }

    searchSong(req, res, next) {
        const songName = req.params.name.replace(/%20/g, " ");
        const playlistName = req.params.playlistName.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: req.params.username }), Song.find({ name: { $regex : new RegExp(`${songName}`, 'i') } }).lean()])
            .then(([user, songs]) => {
                if (songs) {
                    const newSongs = songs.map((song) => {
                        return {...song, isAdded: "false"};
                    })

                    user.playlists.map((playlist) => {
                        if (playlist.name === playlistName) {
                            newSongs.map((song) => {
                                if (playlist.songs.find(isAddedSong => isAddedSong.name === song.name)) {
                                    song.isAdded = "true";
                                }
                            })
                        }
                    })

                    res.json(newSongs);
                } else {
                    res.json(["hung"]);
                }
            })
            .catch(next)  
    }

    addSong(req, res, next) {
        const songName = req.params.name.replace(/%20/g, " ");
        const playlistName = req.params.playlistName.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: req.params.username }), Song.findOne({ name: songName })])
            .then(([user, song]) => {
                user.playlists.map((playlist) => {
                    if (playlist.name === playlistName) {
                        playlist.songs.push(song);
                    }
                })

                user.save();
                res.json("added");
            })
            .catch(next)
    }

    addFVSong(req, res, next) {
        const songName = req.params.name.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: req.params.username }), Song.findOne({ name: songName })])
            .then(([user, song]) => {
                if (song) {
                    user.favourite.songs.push(song);
                    user.save();
                    ++song.like;
                    song.save();
                    res.json(song.like);
                } else {
                    res.json("Failed");
                }
            })
            .catch(next);
    }

    addFVArtist(req, res, next) {
        const artistName = req.params.name.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: req.params.username }), Artist.findOne({ name: artistName })])
            .then(([user, artist]) => {
                if (artist) {
                    user.favourite.artists.push(artist);
                    user.save();
                    res.json("Added");
                } else {
                    res.json("Failed");
                }
            })
            .catch(next);
    }

    addFVPlaylist(req, res, next) {
        const playlistName = req.params.name.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: req.params.username }), Playlist.findOne({ name: playlistName })])
            .then(([user, playlist]) => {
                if (playlist) {
                    user.favourite.playlists.push(playlist);
                    user.save();
                    res.json("Added");
                } else {
                    res.json("Failed");
                }
            })
            .catch(next);
    }

    deleteFVSong(req, res, next) {
        const songName = req.params.name.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: req.params.username }), Song.findOne({ name: songName })])
            .then(([user, song]) => {
                if (song) {
                    user.favourite.songs = user.favourite.songs.filter(item => {
                        if (item.name === song.name) {
                            return false;
                        } else {
                            return true;
                        }
                    });
                    user.save();
                    --song.like;
                    song.save();
                    res.json("Deleted");
                } else {
                    res.json("Failed");
                }
            })
            .catch(next);
    }

    deleteFVArtist(req, res, next) {
        const artistName = req.params.name.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: req.params.username }), Artist.findOne({ name: artistName })])
            .then(([user, artist]) => {
                if (artist) {
                    user.favourite.artists = user.favourite.artists.filter(item => {
                        if (item.name === artist.name) {
                            return false;
                        } else {
                            return true;
                        }
                    });
                    user.save();
                    res.json("Deleted");
                } else {
                    res.json("Failed");
                }
            })
            .catch(next);
    }

    deleteFVPlaylist(req, res, next) {
        const playlistName = req.params.name.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: req.params.username }), Playlist.findOne({ name: playlistName })])
            .then(([user, playlist]) => {
                if (playlist) {
                    user.favourite.playlists = user.favourite.playlists.filter(item => {
                        if (item.name === playlist.name) {
                            return false;
                        } else {
                            return true;
                        }
                    });
                    user.save();
                    res.json("Deleted");
                } else {
                    res.json("Failed");
                }
            })
            .catch(next);
    }

    recentSongs(req, res, next) {
        const songName = req.params.name.replace(/%20/g, " ");
       
        Promise.all([User.findOne({ username: req.params.username }), Song.findOne({ name: songName })])
            .then(([user, song]) => {
                if (song) {
                    user.recent.songs.forEach((item, index) => {
                        if (item.name === song.name) {
                            user.recent.songs.splice(index, 1);
                        }
                    })

                    user.recent.songs.push(song);
                    user.save();
                    res.json("Added");
                } else {
                    res.json("Failed");
                }
            })
            .catch(next);
    }

    recentArtists(req, res, next) {
        const artistName = req.params.name.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: req.params.username }), Artist.findOne({ name: artistName })])
            .then(([user, artist]) => {
                if (artist) {
                    user.recent.artists.forEach((item, index) => {
                        if (item.name === artist.name) {
                            user.recent.artists.splice(index, 1);
                        }
                    })
                    
                    user.recent.artists.push(artist);
                    user.save();
                    res.json("Added");
                } else {
                    res.json("Failed");
                }
            })
            .catch(next);
    }

    recentPlaylists(req, res, next) {
        const playlistName = req.params.name.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: req.params.username }), Playlist.findOne({ name: playlistName })])
            .then(([user, playlist]) => {
                if (playlist) {
                    user.recent.playlists.forEach((item, index) => {
                        if (item.name === playlist.name) {
                            user.recent.playlists.splice(index, 1);
                        }
                    })
                    
                    user.recent.playlists.push(playlist);
                    user.save();
                    res.json("Added");
                } else {
                    res.json("Failed");
                }
            })
            .catch(next);
    }
}

module.exports = new UserController;