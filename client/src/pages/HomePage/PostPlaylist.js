import { useLocation } from 'react-router-dom';
import { setCurrentPlaying, setPlaylist } from '../../actions/actions';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import axios from 'axios';

function PostPlaylist() {
    const location = useLocation();
    const data = location.state;
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const [newUser, setNewUser] = useState(user);
    const [check, setCheck] = useState(0);
    const dispatch = useDispatch();
    const playlist = data.songs.map((song, index) => {
        return {...song, index: index};
    })

    const handlePlay = (index) => {
        axios.get(`http://localhost:9000/user/recent/songs/${data.songs[index].name}&${user.username}`)
            .then(res => {
                const song = {...data.songs[index], index: index};
                dispatch(setCurrentPlaying(song));
                dispatch(setPlaylist(playlist));
            })
            .catch(err => {console.log(err)});
    }

    const handleClickPlay = () => {
        axios.get(`http://localhost:9000/user/recent/songs/${data.songs[0].name}&${user.username}`)
            .then(res => {
                const song = {...data.songs[0], index: 0};
                dispatch(setCurrentPlaying(song));
                dispatch(setPlaylist(playlist));
            })
            .catch(err => {console.log(err)});
    }

    const handleAddFv = () => {
        axios.get(`http://localhost:9000/addPostPlaylist/${data.userID}&${data._id}&${user._id}`)
            .then(res => {
                setCheck(n => n + 1)
            })
            .catch(err => {console.log(err);});
    }

    const handleDislike = () => {
        axios.get(`http://localhost:9000/deletePostPlaylist/${data.userID}&${data._id}&${user._id}`)
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

    console.log(data.playlist)

    return (
        <div className="postPlaylistPage main-content">
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
                                            <td style={{ textAlign: "center" }}>{song.time}</td>
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

export default PostPlaylist