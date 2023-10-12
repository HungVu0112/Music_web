import PlaylistBoxCSS from '../css/playlistbox.module.css';
import { Link } from 'react-router-dom';

function PlaylistBox ({ index, playlist }) {
    return (
        <div className={PlaylistBoxCSS.playlist_box}>
            <div>
                <p className={PlaylistBoxCSS.index}>{index}</p>

                <div className={PlaylistBoxCSS.heading}>
                    <img src={playlist.image} alt="Pic" />
                    <Link to='/home'><h3>{playlist.name}</h3></Link>
                </div>

                <p className={PlaylistBoxCSS.s_count}>Song: {playlist.songs.length}</p>
            </div>

            {playlist.isShared && <i className='bx bxs-navigation'></i>}
        </div>
    )
}

export default PlaylistBox;