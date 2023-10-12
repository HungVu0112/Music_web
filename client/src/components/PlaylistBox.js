import PlaylistBoxCSS from '../css/playlistbox.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PlaylistBox ({ type, index, playlist, setReload }) {
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);

    const handleDelete = () => {
        axios.get(`http://localhost:9000/user/playlist/delete/${index}&${user._id}`)
            .then(res => {
                setReload(n => n + 1);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={`${PlaylistBoxCSS.playlist_box} ${type === "small" && PlaylistBoxCSS.small}`}>
            <div>
                {type === "big" && <p className={PlaylistBoxCSS.index}>{index + 1}</p>}

                <div className={`${PlaylistBoxCSS.heading} ${type === "small" && PlaylistBoxCSS.small}`}>
                    <img src={playlist.image} alt="Pic" />
                    <Link to={`/library/myPlaylist/${playlist._id}`} state={playlist}><h3>{playlist.name}</h3></Link>
                </div>

                {type === "big" && <p className={PlaylistBoxCSS.s_count}>Song: {playlist.songs.length}</p>}
            </div>

            <div>
                {playlist.isShared && type === "big" && <i className='bx bxs-navigation'></i>}
                <div className={PlaylistBoxCSS.delete}>
                    <p onClick={handleDelete}>Delete</p>
                </div>
            </div>
               
        </div>
    )
}

export default PlaylistBox;