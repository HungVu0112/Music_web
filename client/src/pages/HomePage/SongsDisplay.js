import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { setCurrentPlaying, setPlaylist } from "../../actions/actions";
import axios from 'axios';

function SongsDisplay() {
    const [data, setData] = useState({});
    const [songs, setSongs] = useState([]);
    let check = 0;
    const searchResult = useRef();
    const searchInput = useRef();
    const location = useLocation();
    const redirect = useNavigate();
    const dispatch = useDispatch();
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);

    const handlePlay = (index) => {
        const song = {...data.songs[index], index: index};
        const playlist = data.songs.map((song, index) => {
            return {...song, index: index};
        })

        dispatch(setCurrentPlaying(song));
        dispatch(setPlaylist(playlist));
    }

    const handleClickPlay = () => {
        const song = {...data.songs[0], index: 0};
        const playlist = data.songs.map((song, index) => {
            return {...song, index: index};
        })
        
        dispatch(setCurrentPlaying(song));
        dispatch(setPlaylist(playlist));
    }

    function onBlurHandler() {
        searchResult.current.style.display = "none";
      }
      
    function onFocusHandler() {
        searchResult.current.style.display = "block";
    }

    const handleInput = (e) => {
        const value = e.target.value;
        if (value !== "") {
            axios.get(`http://localhost:9000/user/playlist/searchSong/${value}&${data.name}&${user.username}`, songs)
                .then(res => {
                    setSongs(res.data);
                })
                .catch(err => {console.log(err)})

            searchResult.current.style.display = "block";

            // e.target.addEventListener("blur", onBlurHandler)
            // e.target.addEventListener("focus", onFocusHandler)
        } else {
            searchResult.current.style.display = "none";
        }
    }

    function handleAdd(e, songName) {
        axios.get(`http://localhost:9000/user/playlist/addSong/${songName}&${data.name}&${user.username}`)
            .then(res => {
                axios.get(`http://localhost:9000/user/playlist/searchSong/${songName}&${data.name}&${user.username}`, songs)
                .then(res => {
                    setSongs(res.data);
                })
                .catch(err => {console.log(err)})
            })
            .catch(err => {console.log(err)});
    }

    useEffect(() => {
        if (location.pathname === "/library/myPlaylist/create") {
            axios.get(`http://localhost:9000/user/playlist/create/${user.username}`, data)
                .then(res => {
                    redirect(`/library/myPlaylist/${res.data.name}`, { state: res.data });
                })
                .catch(err => { console.log(err); })
        } else {
            axios.get(`http://localhost:9000/user/playlist/${location.state.name}&${user.username}`, data)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => { console.log(err); })
        }
    }, [location.pathname, location.state, songs]);

    return (
       <div className="displayPage main-content">
            <div className="heading">
                <div className="image">
                    <img src={data ? data.image : ""} alt="img" />
                </div>
                <h1>{data ? data.name : "name"}</h1>
            </div>

            <div className="body">
                <div className="tool-bar">
                    <i className='bx bx-play play' onClick={handleClickPlay}></i>
                </div>

                <div className="list">
                    <div className="search-box">
                        <i className='bx bx-search-alt'></i>
                        <input type="text" placeholder="Search songs to add..." onChange={handleInput} ref={searchInput}/>
                    </div>

                    <div className="search-result scroll-bar" ref={searchResult}>
                        {songs.length === 0 ? <p className="error">Song doesn't exists</p> : (
                            songs.map((song, index) => {
                                return (
                                    <div key={index} className="song-result">
                                        <div className="song-info">
                                            <div className="song-img">
                                                <img src={song.image} alt="img"/>
                                            </div>

                                            <div className="song-desc">
                                                <h2>{song.name}</h2>
                                                <p>{song.artist_name}</p>
                                            </div>
                                        </div>

                                        {song.isAdded === "true" ? 
                                            <button disabled>Added</button>
                                        :   <button onClick={(e) => handleAdd(e, song.name)}>Add</button>    
                                    }
                                    </div>
                                )
                            })
                        )}
                    </div>

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
                            {data ? (
                                data.songs === undefined ? <tr></tr> : (
                                    data.songs.map((song, index) => {
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
                            )) : <tr></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
       </div> 
    )
}

export default SongsDisplay;