import { useEffect, useState } from "react";
import Songcard from "../../components/Songcard";
import Card from "../../components/card";
import axios from 'axios';

function Favourite() {
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const [favourite, setFavourite] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:9000/user/favourite/get/${user.username}`, favourite)
            .then(res => {
                setFavourite(res.data);
            })
            .catch(err => {console.log(err)})
    },[])
    
    return (
        <div className="favourite main-content">
            <div className="display scroll-bar">
                <h1 className="text">・Songs</h1>
                {favourite !== null ? 
                    favourite.songs.map((song, index) => {
                        return <Songcard song={song} key={index} index={index} playlist={favourite.songs}/>
                }) : ""}
            </div>

            <div className="display artist scroll-bar">
                <h1 className="text">・Artists</h1>
                {favourite !== null ? 
                    favourite.artists.map((artist, index) => {
                        return <Card img={artist.image} name={artist.name} key={index} path="artist" state={artist}/>
                }) : ""}
            </div>

            <div className="display scroll-bar">
                <h1 className="text">・Playlists</h1>
                {favourite !== null ? 
                    favourite.playlists.map((playlist, index) => {
                        return <Card img={playlist.image} name={playlist.name} key={index} path="playlist" state={playlist}/>
                }) : ""}
            </div>
        </div>
    );
}

export default Favourite;