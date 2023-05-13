import { useDispatch } from "react-redux";
import { setCurrentPlaying } from '../actions/actions';

function Songcard(props) {
    const dispatch = useDispatch();

    const handlePlay = () => {
        dispatch(setCurrentPlaying(props.song));
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