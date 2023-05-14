import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPlaying } from '../actions/actions';
import axios from 'axios';
import ControlsButton from './ControlsButton';
import Slider from "@material-ui/core/Slider";

function Footer(props) {
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const [newUser, setNewUser] = useState(user);
    const [currTrack, setCurrTrack] = useState();
    const [isRepeatClicked, setRepeatClick] = useState(false);
    const [isShuffleClicked, setShuffleClick] = useState(false);
    const [isPrevClicked, setPrevClicked] = useState(false);
    const [isNextClicked, setNextClicked] = useState(false);
    const [isPlaying, setPlayPauseClicked] = useState(true);
    const [isVolumeClicked, setVolumeClicked] = useState(false);
    const [volume, setVolume] = useState(50);
    const [seekTime, setSeekTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currTime, setCurrTime] = useState(0);
    const src = `http://localhost:3000/${props.music.sound}`;

    const audioElement = useRef();
    const dispatch = useDispatch();

    const handleAddFv = () => {
        axios.get(`http://localhost:9000/user/favourite/songs/${props.music.name}&${user.username}`)
            .then(res => {
                axios.get(`http://localhost:9000/user/${user.username}`)
                    .then(res => {
                        setNewUser(res.data);
                    })
            })
            .catch(err => {console.log(err);});
    }

    const handleDislike = () => {
        axios.get(`http://localhost:9000/user/favourite/songs/delete/${props.music.name}&${user.username}`)
            .then(res => {
                axios.get(`http://localhost:9000/user/${user.username}`)
                    .then(res => {
                        setNewUser(res.data);
                    })
            })
            .catch(err => {console.log(err);});
    }

    const handleToggle = (type, val) => {
        switch (type) {
            case "repeat":
                setRepeatClick(val);
                break;
            case "prev":
                setPrevClicked(val);
                break;
            case "play-pause":
                setPlayPauseClicked(val);
                break;
            case "next":
                setNextClicked(val);
                break;
            case "volume":
                setVolumeClicked(val);
                break;
            case "shuffle":
                setShuffleClick(val);
                break;
            default:
                break;
        }
    };

    const handleSeekChange = (event, newValue) => {
        audioElement.current.currentTime =(newValue*duration)/100;
        setSeekTime(newValue)
    };
    
    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
    };

    
    useEffect(() => {
        isPlaying
            ? audioElement.current.play().then(()=>{}).catch((e)=>{audioElement.current.pause(); audioElement.current.currentTime=0;})
            : audioElement.current.pause();
        audioElement.current.loop = isRepeatClicked;
        audioElement.current.volume = volume / 100;
        audioElement.current.muted = isVolumeClicked;
        audioElement.current.onloadedmetadata = () => {
            if (audioElement.current != null)
                setDuration(audioElement.current.duration);
        };
        setInterval(() => {
            if (audioElement.current !== null)
                setCurrTime(audioElement.current.currentTime);
        })
    });
    
    useEffect(() => {
        setCurrTrack(props.music);
    }, [props.music]);

    useEffect(() => {
        setSeekTime((currTime) / (duration / 100))
    }, [currTime, duration]);

    useEffect(()=>{
        if (isRepeatClicked === false) {
            audioElement.current.onended = ()=> {
                setNextClicked(true);
            };
        }
    })
    
     useEffect(()=>{
        if (props.playlist !== undefined) {
            if (isShuffleClicked) {
                if (isNextClicked || isPrevClicked) {
                    let currTrackId = Math.floor(Math.random() * props.playlist.length) + 0;
                    axios.get(`http://localhost:9000/user/recent/songs/${props.playlist[currTrackId].name}&${user.username}`)
                        .then(res => {
                            dispatch(setCurrentPlaying(props.playlist[currTrackId]));
                            if (isNextClicked) {
                                setNextClicked(false);
                            } else {
                                setPrevClicked(false);
                            }
                        })
                        .catch(err => {console.log(err)});
                }
            } else {
                if (isNextClicked){
                    let currTrackId = props.music.index + 1;
                    if (currTrackId === props.playlist.length) {
                        currTrackId = 0;
                    }
                    axios.get(`http://localhost:9000/user/recent/songs/${props.playlist[currTrackId].name}&${user.username}`)
                        .then(res => {
                            dispatch(setCurrentPlaying(props.playlist[currTrackId]));
                            setNextClicked(false);
                        })
                        .catch(err => {console.log(err)});
                }
                if (isPrevClicked){
                    let currTrackId = props.music.index - 1;
                    if (currTrackId < 0){
                        currTrackId = props.playlist.length - 1;
                    }
                    axios.get(`http://localhost:9000/user/recent/songs/${props.playlist[currTrackId].name}&${user.username}`)
                        .then(res => {
                            dispatch(setCurrentPlaying(props.playlist[currTrackId]));
                            setPrevClicked(false);
                        })
                        .catch(err => {console.log(err)});
                }
            }
        }
    },[dispatch, isNextClicked, isPrevClicked, props.playlist]);

    function formatTime(secs) {
        const t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        let s = t.toTimeString().slice(0, 8);
        if (secs > 86399)
            s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.slice(2);
        return s.substring(3);
    }

    return (
        <div className="player">
            <div className="playback">
                {
                    !isNaN(seekTime) &&
                    <Slider className={"playback-completed"}
                            value={seekTime} onChange={handleSeekChange}/>
                }
            </div>
            
                <div className="curr-song-container">
                    <div className="image">
                        <img src={props.music.image} alt="img"/>
                    </div>
                    <div className="curr-song-details">
                        <h2>{props.music.name}</h2>
                        <p>{props.music.artist_name}</p>
                    </div>
                    
                    {newUser.favourite.songs.filter(song => {
                        if (song.name === props.music.name && song.artist_name === props.music.artist_name) {
                            return true;
                        } else {
                            return false;
                        }
                    }).length === 0 ? (
                        <i className='bx bxs-heart' onClick={handleAddFv}></i>
                    ) : (
                        <i className='bx bxs-heart' onClick={handleDislike} style={{color: "red"}}></i>
                    )}

                </div>

                <div className="playback-controls">
                    <ControlsButton type={"repeat"} 
                                    defaultIcon={<i className='bx bx-repeat'></i>}
                                    changeIcon={<i className='bx bx-repeat' style={{color: "#e4335c"}}></i>}
                                    onClicked={handleToggle}/>

                    <ControlsButton type={"prev"} 
                                    defaultIcon={<i className='bx bx-skip-previous'></i>}
                                    changeIcon={<i className='bx bx-skip-previous'></i>}
                                    onClicked={handleToggle} playlist={props.playlist}/>

                    <audio ref={audioElement} src={src}/>

                    <ControlsButton type={"play-pause"} 
                                    defaultIcon={<i className='bx bx-pause'></i>}
                                    changeIcon={<i className='bx bx-play'></i>}
                                    onClicked={handleToggle} />

                    <ControlsButton type={"next"} 
                                    defaultIcon={<i className='bx bx-skip-next' />}
                                    changeIcon={<i className='bx bx-skip-next'></i>}
                                    onClicked={handleToggle} playlist={props.playlist}/>

                    <ControlsButton type={"shuffle"}
                                    defaultIcon={<i className='bx bx-shuffle'></i>}
                                    changeIcon={<i className='bx bx-shuffle' style={{color: "#e4335c"}}></i>}
                                    onClicked={handleToggle} playlist={props.playlist}/>
                </div>

                <div className="playback-widgets">
                    
                    <div className="timer">
                        <p>
                            <span>{formatTime(currTime)}</span>
                            /
                            <span>{formatTime(duration)}</span>
                        </p>
                    </div>

                    <ControlsButton type={"volume"} 
                                    defaultIcon={<i className='bx bx-volume-full'></i>}
                                    changeIcon={<i className='bx bx-volume-mute'></i>}
                                    onClicked={handleToggle} className="volumeBtn"/>

                    <div className="slider">
                        <Slider value={volume} onChange={handleVolumeChange}/>
                    </div>

                </div>
            
        </div>
    )
}

export default Footer;