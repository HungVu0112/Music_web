import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPlaying, setPlaylist } from "../../actions/actions";
import axios from 'axios';

function ArtistDisplay() {
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const [newUser, setNewUser] = useState(user);
    const [check, setCheck] = useState(0);
    const location = useLocation();
    const [songs, setSongs] = useState();
    const artist = location.state;
    const dispatch = useDispatch();

    const handlePlay = (index) => {
        axios.get(`http://localhost:9000/user/recent/songs/${songs[index].name}&${user.username}`)
            .then(res => {
                dispatch(setCurrentPlaying(songs[index]));
                dispatch(setPlaylist(songs));
            })
            .catch(err => {console.log(err)});
    }

    const handleClickPlay = () => {
        axios.get(`http://localhost:9000/user/recent/songs/${songs[0].name}&${user.username}`)
            .then(res => {
                dispatch(setCurrentPlaying(songs[0]));
                dispatch(setPlaylist(songs));
            })
            .catch(err => {console.log(err)});
    }

    const handleAddFv = () => {
        axios.get(`http://localhost:9000/user/favourite/artists/${artist.name}&${user.username}`)
            .then(res => {
                setCheck(n => n + 1)
            })
            .catch(err => {console.log(err);});
    }

    const handleDislike = () => {
        axios.get(`http://localhost:9000/user/favourite/artists/delete/${artist.name}&${user.username}`)
            .then(res => {
                setCheck(n => n + 1)
            })
            .catch(err => {console.log(err);});
    }

    useEffect(() => {
        axios.get(`http://localhost:9000/user/${user.username}`)
            .then(res => {
                setNewUser(res.data);
            })
    }, [check])

    useEffect(() => {
        axios.get(`http://localhost:9000/songs/${location.state.name}`, songs)
            .then(res => {
                const playlist = res.data.map((song, index) => {
                    return {...song, index: index}
                })
                setSongs(playlist);
            })
            .catch(err => {console.log(err);})
    }, [location.state]);

    console.log("checkrender")

    return (
        <div className="artistPage main-content" >
            <div className="heading">
                <div className="image">
                    <img src={artist.image} alt="img" />
                </div>
                <h1>{artist.name}</h1>
            </div>
            
            <div className="body">
                <div className="tool-bar">
                    <i className='bx bx-play play' onClick={handleClickPlay}></i>
                    
                    {newUser.favourite.artists.filter(item => {
                        if (item.name === artist.name) {
                            return true;
                        } else {
                            return false;
                        }
                    }).length === 0 ? (
                        <i className='bx bxs-heart like' onClick={handleAddFv}></i>
                    ) : (
                        <i className='bx bxs-heart like' onClick={handleDislike} style={{color: "red"}}></i>
                    )}
                </div>

                <div className="list">
                <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "5%" }} >#</th>
                                <th 
                                    scope="col" 
                                    style={{ 
                                        width: "85%",
                                        textAlign: "left",    
                                    }}
                                >
                                    Name
                                </th>
                                <th scope="col"><i className='bx bx-time'></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs === undefined ? <tr></tr> : (
                                    songs.map((song, index) => {
                                        return (
                                            <tr key={index} onClick={() => handlePlay(index)}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    <div className="song-info">
                                                        <div className="song-img">
                                                            <img src={song.image} alt="img"/>
                                                        </div>

                                                        <p>{song.name}</p>
                                                    </div>
                                                </td>
                                                <td style={{ textAlign: "center" }}>{song.time}</td>
                                            </tr>
                                        )
                                    }
                                )
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ArtistDisplay;