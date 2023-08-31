import { useEffect, useState } from "react";
import Songcard from "../../components/Songcard";
import Card from "../../components/card";
import axios from 'axios';

function RecentPlayed() {
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const [recent, setRecent] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:9000/user/recent/get/${user.username}`, recent)
            .then(res => {
                setRecent(res.data);
            })
            .catch(err => {console.log(err)})
    },[])

    useEffect(() => {
        axios.get(`http://localhost:9000/user/${user.username}`)
            .then(res => {
                const account = JSON.stringify(res.data);
                sessionStorage.setItem("account", account);
            })
    },[])


    return (
        <div className="recent main-content">
            <div className="display scroll-bar">
                <h1 className="text">・Songs</h1>
                {recent !== null ? 
                    recent.songs.reverse().map((song, index) => {
                        return <Songcard song={song} key={index} index={index} playlist={recent.songs}/>
                }) : ""}
            </div>

            <div className="display artist scroll-bar">
                <h1 className="text">・Artists</h1>
                {recent !== null ? 
                    recent.artists.reverse().map((artist, index) => {
                        return <Card img={artist.image} name={artist.name} key={index} path="artist" state={artist}/>
                }) : ""}
            </div>

            <div className="display scroll-bar">
                <h1 className="text">・Playlists</h1>
                {recent !== null ? 
                    recent.playlists.reverse().map((playlist, index) => {
                        return <Card img={playlist.image} name={playlist.name} key={index} path="playlist" state={playlist}/>
                }) : ""}
            </div>
        </div>
    );
}

export default RecentPlayed;