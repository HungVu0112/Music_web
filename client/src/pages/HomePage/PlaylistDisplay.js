import { useLocation } from 'react-router-dom';

function PlaylistDisplay() {
    const location = useLocation();
    const data = location.state;

    return (
        <div className="playlistPage main-content">
            <h1></h1>
        </div>
    )
}

export default PlaylistDisplay;