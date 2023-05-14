import { useDispatch } from "react-redux";
import { setCurrentPlaying, setPlaylist } from '../actions/actions';

function Songcard(props) {
    const dispatch = useDispatch();
    const handlePlay = () => {
        if (props.artistAmount !== undefined) {
            const index = props.index - props.artistAmount;
            const song = {...props.song, index: index};
            const playlist = props.playlist.slice(props.artistAmount).map((song, index) => {
                return {...song, index: index};
            })
            dispatch(setCurrentPlaying(song));
            dispatch(setPlaylist(playlist));
        } else {
            const song = {...props.song, index: props.index}
            const playlist = props.playlist.map((song, index) => {
                return {...song, index: index};
            })
            dispatch(setCurrentPlaying(song));
            dispatch(setPlaylist(playlist));
        }
    }

    return (
        <div className = "card" onClick={handlePlay}>
            {props === undefined ? "" : (
            <>
                <img src={props.song.image}  alt="img" className="card-img"/>
    
                <div className="card-body">
                    <h2 className="name">{props.song.name}</h2>
                    <p className="desc">{props.song.artist_name}</p>
                </div>
            </>
            )}
        </div>
    )
}

export default Songcard;