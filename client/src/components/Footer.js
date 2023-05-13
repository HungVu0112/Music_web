import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPlaying } from '../actions/actions';
import ControlsButton from './ControlsButton';
import Slider from "@material-ui/core/Slider";

function Footer(props) {
    const [currTrack, setCurrTrack] = useState();
    const [isRepeatClicked, setRepeatClick] = useState(false);
    const [isPrevClicked, setPrevClicked] = useState(false);
    const [isNextClicked, setNextClicked] = useState(false);
    const [isPlaying, setPlayPauseClicked] = useState(false);
    const [isVolumeClicked, setVolumeClicked] = useState(false);
    const [volume, setVolume] = useState(50);
    const [seekTime, setSeekTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currTime, setCurrTime] = useState(0);
    const src = `http://localhost:3000/${props.music.sound}`;

    const audioElement = useRef();
    const dispatch = useDispatch();

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
        console.log(audioElement.current.src)
        audioElement.current.onloadedmetadata = () => {
            if (audioElement.current != null)
                setDuration(audioElement.current.duration)
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
        audioElement.current.onended = ()=> {
            setNextClicked(true);
        };
    })
    
     // useEffect(()=>{
    //     if (isNextClicked){
    //         let currTrackId = (id+1) % props.playlist.length;
    //         dispatch(setCurrentPlaying(props.playlist[currTrackId]));
    //         setNextClicked(false);
    //     }
    //     if (isPrevClicked){
    //         let currTrackId = (id-1) % playlists.length;
    //         if ((id-1)<0){
    //             currTrackId = playlists.length - 1;
    //         }
    //         dispatch(setCurrentPlaying(playlists[currTrackId]));
    //         setPrevClicked(false);
    //     }
    // },[dispatch, id, isNextClicked, isPrevClicked, playlists]);

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
                </div>

                <div className="playback-controls">
                    <ControlsButton type={"repeat"} 
                                    defaultIcon={<i class='bx bx-repeat'></i>}
                                    changeIcon={<i class='bx bx-repeat' style={{color: "blue"}}></i>}
                                    onClicked={handleToggle}/>

                    <ControlsButton type={"prev"} 
                                    defaultIcon={<i class='bx bx-skip-previous'></i>}
                                    changeIcon={<i class='bx bx-skip-previous'></i>}
                                    onClicked={handleToggle}/>

                    <audio ref={audioElement} src={src}/>

                    <ControlsButton type={"play-pause"} 
                                    defaultIcon={<i class='bx bx-play'></i>}
                                    changeIcon={<i class='bx bx-pause'></i>}
                                    onClicked={handleToggle}/>

                    <ControlsButton type={"next"} 
                                    defaultIcon={<i class='bx bx-skip-next' />}
                                    changeIcon={<i class='bx bx-skip-next'></i>}
                                    onClicked={handleToggle}/>
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
                                    defaultIcon={<i class='bx bx-volume-full'></i>}
                                    changeIcon={<i class='bx bx-volume-mute'></i>}
                                    onClicked={handleToggle} className="volumeBtn"/>

                    <div className="slider">
                        <Slider value={volume} onChange={handleVolumeChange}/>
                    </div>

                </div>
            
        </div>
    )
}

export default Footer;