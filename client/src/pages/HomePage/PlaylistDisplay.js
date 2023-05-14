import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { setCurrentPlaying, setPlaylist } from '../../actions/actions';
import axios from 'axios';


function PlaylistDisplay() {
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const [newUser, setNewUser] = useState(user);
    const [check, setCheck] = useState(0);
    const location = useLocation();
    const data = location.state;
    const dispatch = useDispatch();
    const playlist = data.songs.map((song, index) => {
        return {...song, index: index};
    })

    const handlePlay = (index) => {
        const song = {...data.songs[index], index: index};
        dispatch(setCurrentPlaying(song));
        dispatch(setPlaylist(playlist));
    }

    const handleClickPlay = () => {
        const song = {...data.songs[0], index: 0};
        dispatch(setCurrentPlaying(song));
        dispatch(setPlaylist(playlist));
    }

    const handleAddFv = () => {
        axios.get(`http://localhost:9000/user/favourite/playlists/${user.username}&${data.name}`)
            .then(res => {
                setCheck(n => n + 1)
            })
            .catch(err => {console.log(err);});
    }

    const handleDislike = () => {
        axios.get(`http://localhost:9000/user/favourite/playlists/delete/${user.username}&${data.name}`)
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

    return (
        <div className="playlistPage main-content">
            <div className="heading">
                <div className="image">
                    <img src={data.image} alt="img" />
                </div>
                <h1>{data.name}</h1>
            </div>

            <div className="body">
                <div className="tool-bar">
                    <i className='bx bx-play play' onClick={handleClickPlay}></i>
                    
                    {newUser.favourite.playlists.filter(playlist => {
                        if (playlist.name === data.name) {
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
                                        width: "45%",
                                        textAlign: "left",    
                                    }}
                                >
                                    Name
                                </th>
                                <th 
                                    scope="col" 
                                    style={{ 
                                        width: "40%",
                                        textAlign: "left",    
                                    }}
                                >
                                    Artist
                                </th>
                                <th scope="col"><i className='bx bx-time'></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlist.map((song, index) => {
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
                                            <td>{song.artist_name}</td>
                                            <td style={{ textAlign: "center" }}>2:30</td>
                                        </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PlaylistDisplay;