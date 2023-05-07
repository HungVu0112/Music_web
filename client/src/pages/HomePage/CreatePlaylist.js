import { Link } from 'react-router-dom';

function CreatePlaylist() {
    return (
        <div className="playlists main-content">
            <div className="title">
                <h1 className="text">Playlists</h1>
                <Link><i className='bx bx-plus'></i></Link>
            </div>
        </div>
    );
}

export default CreatePlaylist;