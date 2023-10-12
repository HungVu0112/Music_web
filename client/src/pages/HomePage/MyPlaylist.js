import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MyPlaylistCSS from '../../css/myplaylist.module.css';
import PlaylistBox from '../../components/PlaylistBox';
import axios from 'axios';

function MyPlaylist() {
    const [playlists, setPlaylists] = useState([]);
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);

    useEffect(() => {
        axios.get(`http://localhost:9000/user/${user._id}`)
            .then(res => {
                setPlaylists(res.data.playlists);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className={`${MyPlaylistCSS.my_playlist} main-content`}>
            <div className={MyPlaylistCSS.title}>
                <h1>MY PLAYLISTS</h1>
                <i className='bx bxs-layer-plus'></i>
            </div>

            <div className={MyPlaylistCSS.line}></div>

            <div className={MyPlaylistCSS.p_display}>
                {playlists.length !== 0 ? (
                    playlists.map((playlist, index) => {
                        return <PlaylistBox index={index + 1} playlist={playlist} /> 
                    })
                ) : (
                    <p>You haven't create any playlist yet !!</p>
                )}
            </div>
        </div>
    )
}

export default MyPlaylist;