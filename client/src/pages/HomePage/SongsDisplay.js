import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { setCurrentPlaying, setPlaylist } from "../../actions/actions";
import ChangePlaylistInfo from '../../Validation/ChangePlaylistInfo';
import axios from 'axios';

function SongsDisplay() {
    const [songs, setSongs] = useState([]);
    const [reRender, setRerender] = useState(0);
    const searchResult = useRef();
    const searchInput = useRef();
    const form = useRef();
    const close = useRef();
    const shareBox = useRef();
    const location = useLocation();
    const redirect = useNavigate();
    const dispatch = useDispatch();
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const [data, setData] = useState({});
    const [info, setInfo] = useState({
        name: '',
        image: '',
    });
    const [shareData, setShareData] = useState({
        description: '',
        tags: '',
    })
    const [isShared, setIsShared] = useState(false);
    const [err, setErr] = useState({});

    const handlePlay = (index) => {
        axios.get(`http://localhost:9000/user/recent/songs/${data.songs[index].name}&${user.username}`)
            .then(res => {
                const song = {...data.songs[index], index: index};
                const playlist = data.songs.map((song, index) => {
                    return {...song, index: index};
                })

                dispatch(setCurrentPlaying(song));
                dispatch(setPlaylist(playlist));
            })
            .catch(err => {console.log(err)});
    }

    const handleClickPlay = () => {
        axios.get(`http://localhost:9000/user/recent/songs/${data.songs[0].name}&${user.username}`)
            .then(res => {
                const song = {...data.songs[0], index: 0};
                const playlist = data.songs.map((song, index) => {
                    return {...song, index: index};
                })
                
                dispatch(setCurrentPlaying(song));
                dispatch(setPlaylist(playlist));
            })
            .catch(err => {console.log(err)});
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

    const handleOpen = () => {
        form.current.style.display = "block";
    }

    const handleClose = () => {
        form.current.style.display = "none";
    }

    const handleCloseBox = () => {
        shareBox.current.style.display = "none";
    }

    const handleOpenBox = () => {
        shareBox.current.style.display = "block";
    }

    const handleInput2 = (e) => {
        setInfo(prev => ({...prev, [e.target.name] : e.target.value}));
    }

    const handleSubmit = () => {
        if (err.name === '' && err.image === '') {
            const UrlString = encodeURIComponent(info.image);
            axios.get(`http://localhost:9000/user/playlist/change/${user.username}&${data.name}&${info.name}&${UrlString}`)
                .then(res => {
                    form.current.style.display = "none";
                    setRerender(n => n + 1);
                })
        }
    }

    const handleShare = (e) => {
        e.preventDefault();

        axios.post('http://localhost:9000/createPost', {
            ...shareData,
            email: user.email,
            playlist: data
        })
            .then(res => {
                shareBox.current.style.display = "none";
                setRerender(n => n + 1);
            })
            .catch(err => {
                console.log(err);
            })    
    }

    const handleDeleteShare = () => {
        axios.get(`http://localhost:9000/deletePost/${user._id}&${data._id}`)
            .then(res => {
                setRerender(n => n + 1);
            })
            .catch(err => { console.log(err); })
    }

    const handleShareInput = (e) => {
        setShareData(prev => ({...prev, [e.target.name] : e.target.value}));
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

    useEffect(() => {
        axios.get(`http://localhost:9000/user/playlist/${data.name}&${user.username}`, data)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => { console.log(err); })
    },[reRender])

    useEffect(() => {
        setErr(ChangePlaylistInfo(info));
    }, [info])

    console.log("check")

    return (
        <>
       <div className="displayPage main-content">
            <div className="heading">
                <div className="image" onClick={handleOpen}>
                    <img src={data ? data.image : ""} alt="img" />
                    <i class='bx bx-edit'></i>
                </div>
                <h1>{data ? data.name : "name"}</h1>
            </div>

            <div className="body">
                <div className="tool-bar">
                    <i className='bx bx-play play' onClick={handleClickPlay}></i>
                    {data.isShared ? (
                        <i class='bx bxs-star share' onClick={handleDeleteShare}></i>
                    ) : (
                        <i className='bx bxs-share share' onClick={handleOpenBox}></i>
                    )}
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
                                                <td style={{ textAlign: "center" }}>{song.time}</td>
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

       <div className="info-form" ref={form}>
                <div className="close-btn" ref={close} onClick={handleClose}>
                    <i className='bx bxs-tag-x'></i>
                </div>

                <div className="head">
                    <h1>CHANGE INFO</h1>
                </div>

                <div className="body">
                    <div className="avatar">
                        <div className="image">
                            <img src={data.image} alt="img"/>
                        </div>
                        <input type="text" value={info.image} name="image" placeholder="Type your image link..." onChange={handleInput2} autoComplete="off"/>
                        {err.name && <p style={{color : "red"}}>* {err.name}</p>}
                    </div>

                    <div className="username">
                        <div className="header">
                            <label htmlFor="name">Name</label>
                            <i className='bx bx-edit-alt'></i>
                        </div>

                        <input type="text" id="name" value={info.name} name="name" placeholder="Type your username..." onChange={handleInput2} autoComplete="off"/>
                        {err.image && <p style={{color : "red"}}>* {err.image}</p>}
                    </div>
                </div>
                
                <div className="submit-btn">
                    <button onClick={handleSubmit}>Save</button>
                </div>
        </div>

        <form className='share-box' ref={shareBox} method='POST'>
            <div className="close-btn" ref={close} onClick={handleCloseBox}>
                <i className='bx bxs-tag-x'></i>
            </div>

            <div className='title'>
                <h1>SHARE</h1>
            </div>

            <div className='box-body'>
                <div className='desc'>
                    Description <i className='bx bxs-edit-alt' />
                    <textarea onChange={handleShareInput} name='description' className='scroll-bar' placeholder='Description ...'></textarea>
                </div>

                <div className='tag'>
                    Tags <i className='bx bxs-purchase-tag'></i>
                    <textarea onChange={handleShareInput} name='tags' className='scroll-bar' type='text' placeholder='#chill #pop ...'/>
                </div>

                <div className='demo-display'>
                    <img src={data.image} alt="img"/>
                    <h1>{data.name}</h1>
                </div>
            </div>
            
            <div className='footer'>
                <p onClick={handleCloseBox}>Cancel</p>
                <button onClick={handleShare} type='submit'>Share</button>
            </div>
        </form>
    </> 
    )
}

export default SongsDisplay;