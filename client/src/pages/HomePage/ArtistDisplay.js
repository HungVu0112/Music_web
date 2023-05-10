import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function ArtistDisplay() {
    const location = useLocation();
    const [songs, setSongs] = useState();

    useEffect(() => {
        axios.get(`http://localhost:9000//songs/${location.state.name}`, songs)
            .then(res => {
                setSongs(res.data);
            })
            .catch(err => {console.log(err);})
    }, [songs]);

    return (
        <div className="artistPage main-content" >
            
        </div>
    )
}

export default ArtistDisplay;