const User = require('../model/User');
const Playlist = require('../model/Playlist');
const Song = require('../model/Song');
const Artist = require('../model/Artist');
const Post = require('../model/Post');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

class UserController {
    changeInfo(req, res, next) {
        const username = req.params.username.replace(/%20/g, " ");
        User.findOne({ username: username })
            .then(user => {
                user.username = req.params.newusername;
                user.avatar = req.params.newavatar;
                user.save();
                res.json("succeed!"); 
            })
            .catch(next)
    }

    changeInfoPlaylist(req, res, next) {
        const username = req.params.username.replace(/%20/g, " ");
        const playlistName = req.params.name.replace(/%20/g, " ");
        const newName = req.params.newname.replace(/%20/g, " ");
        User.findOne({ username: username })
            .then(user => {
                user.playlists.forEach(playlist => {
                    if (playlist.name === playlistName) {
                        playlist.name = newName;
                        playlist.image = req.params.link;
                    }
                })
                user.save();
                res.json("succeed!"); 
            })
            .catch(next)
    }

    changePw(req, res, next) {
        const username = req.params.username.replace(/%20/g, " ");
        User.findOne({ username: username })
            .then(user => {
                user.password = req.params.newpassword;
                user.save();
                res.json("succeed!");
            })
            .catch(next);
    }

    getRecent(req, res, next) {
        const username = req.params.username.replace(/%20/g, " ");
        User.findOne({ username: username })
            .then(user => {
                res.json(user.recent);
            })
            .catch(next);
    }

    getFavourite(req, res, next) {
        const username = req.params.username.replace(/%20/g, " ");
        User.findOne({ username: username })
            .then(user => {
                res.json(user.favourite);
            })
            .catch(next);
    }

    checkLogin(req, res, next) {
        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password)
                        .then(check => {
                            if (check) {
                                res.json(user);
                            }
                            else {
                                res.json('not exists');
                            }
                        })
                        .catch(err => console.log(err))
                }
                else {
                    res.json('not exists');
                }
            })
            .catch(next)
    }

    checkSignup(req, res, next) {
        User.findOne({email: req.body.email})
          .then(user => {
                if (!user) {
                    req.body.avatar = 'img/user-default.png';
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
                    bcrypt.hash(req.body.password, saltRounds)
                        .then(hash => {
                            req.body.password = hash;
                            req.body.username = username;
                            const new_user = new User(req.body);
                            new_user.save();
                            res.json('OK');
                        })
                        .catch(err => console.log(err))
                }
                else {
                    res.json('exists');
                }
            })
          .catch(next)
    }

    getUser(req, res, next) {
        User.findOne({ _id: new ObjectId(req.params.id) })    
            .then(user => {
                res.json(user);
            })
            .catch(next);
    }

    getPlaylist(req, res, next) {
        const playlistName = req.params.name.replace(/%20/g, " ");
        const username = req.params.username.replace(/%20/g, " ");
        User.findOne({ username: username })
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
        User.findOne({ _id: new ObjectId(req.params.id) })
            .then(user => {
                var count = user.playlists.length + 1;
                
                const name = `Playlist ${count}`;
                const image = "https://i.icanvas.com/list-square/instruments-JCA5.jpg";
                var songs = [];
                var isShared = false;

                const playlist = new Playlist({
                    name,
                    image,
                    songs,
                    isShared
                })

                user.playlists.push(playlist);
                user.save();

                res.json(playlist);
            })
            .catch(next)
    }

    deletePlaylist(req, res, next) {
        User.findOne({ _id: new ObjectId(req.params.uid) })
            .then(user => {
                const _id = user.playlists[req.params.pid]._id.toString();
                const checkShared = user.playlists[req.params.pid].isShared;

                user.playlists.splice(req.params.pid, 1);
                user.save();
                
                // if (checkShared) {
                //     Post.deleteOne({ 'user.username': username, 'playlist._id': _id})
                //         .then(post => {
                //             res.json("ok");
                //         })
                //         .catch(err => { console.log(err); });
                // }

                res.json("ok");
            })  
            .catch(next)
    }

    searchSong(req, res, next) {
        const songName = req.params.name.replace(/%20/g, " ");
        const playlistName = req.params.playlistName.replace(/%20/g, " ");
        const username = req.params.username.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: username }), Song.find({ name: { $regex : new RegExp(`${songName}`, 'i') } }).lean()])
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
        const username = req.params.username.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: username }), Song.findOne({ name: songName })])
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
        const username = req.params.username.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: username }), Song.findOne({ name: songName })])
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
        const username = req.params.username.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: username }), Artist.findOne({ name: artistName })])
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
        const username = req.params.username.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: username }), Playlist.findOne({ name: playlistName })])
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
        const username = req.params.username.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: username }), Song.findOne({ name: songName })])
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
        const username = req.params.username.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: username }), Artist.findOne({ name: artistName })])
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
        const username = req.params.username.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: username }), Playlist.findOne({ name: playlistName })])
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
        const username = req.params.username.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: username }), Song.findOne({ name: songName })])
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
        const username = req.params.username.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: username }), Artist.findOne({ name: artistName })])
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
        const username = req.params.username.replace(/%20/g, " ");
        Promise.all([User.findOne({ username: username }), Playlist.findOne({ name: playlistName })])
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