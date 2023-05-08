import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MyPlaylist() {
    const [data, setData] = useState({});
    const [count, setCount] = useState(0);
    let navigate = useNavigate();
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);

    const handleDelete = (e) => {
        const index = e.target.value;

        axios.get(`http://localhost:9000/user/playlist/delete/${index}&${user.username}`)
            .then(res => {
                setCount(n => n + 1);
            })
            .catch(err => {console.log(err);});
    }

    useEffect(() => {
        axios.get(`http://localhost:9000/user/${user.username}`, data)
            .then(res => {
                setData(res.data);
            })
            .catch(err => { console.log(err); })
    }, [count])

    return (
        <div className="my-playlists main-content">
            <div className="title">
                <h1 className="text">My Playlists</h1>
                <Link to="/library/myPlaylist/create"><i className='bx bx-plus'></i></Link>
            </div>

            <div className="items">
                {data.username === undefined ? "" : data.playlists.length === 0 ? (
                    <p className="text">You haven't created any playlists yet!</p>
                ) : (
                    data.playlists.map((playlist, index) => {
                        return (
                            <div className="playlist" key={index}>
                                <p className="number">{index + 1}</p>
                                
                                <div className="playlist-title">
                                    <Link to={`/library/myPlaylist/${playlist.name}`} state={playlist} >{playlist.name}</Link>
                                    <p>Songs: {playlist.songs ? playlist.songs.length : 0}</p>
                                    
                                    <div className="option">
                                        <button>Edit</button>
                                        <button value={index} onClick={handleDelete}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}

export default MyPlaylist;