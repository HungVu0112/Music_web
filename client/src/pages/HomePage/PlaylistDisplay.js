import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setCurrentPlaying, setPlaylist } from '../../actions/actions';


function PlaylistDisplay() {
    const location = useLocation();
    const data = location.state;
    const dispatch = useDispatch();
    const playlist = data.songs.map((song, index) => {
        return {...song, index: index};
    })

    const handlePlay = (index) => {
        const song = {...data.songs[index], index: index};
        dispatch(setCurrentPlaying(song));
        dispatch(setPlaylist(playlist));
    }

    const handleClickPlay = () => {
        const song = {...data.songs[0], index: 0};
        dispatch(setCurrentPlaying(song));
        dispatch(setPlaylist(playlist));
    }

    return (
        <div className="playlistPage main-content">
            <div className="heading">
                <div className="image">
                    <img src={data.image} alt="img" />
                </div>
                <h1>{data.name}</h1>
            </div>

            <div className="body">
                <div className="tool-bar">
                    <i className='bx bx-play play' onClick={handleClickPlay}></i>
                    <i className='bx bxs-heart like'></i>
                </div>

                <div className="list">
                <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "5%" }} >#</th>
                                <th 
                                    scope="col" 
                                    style={{ 
                                        width: "45%",
                                        textAlign: "left",    
                                    }}
                                >
                                    Name
                                </th>
                                <th 
                                    scope="col" 
                                    style={{ 
                                        width: "40%",
                                        textAlign: "left",    
                                    }}
                                >
                                    Artist
                                </th>
                                <th scope="col"><i className='bx bx-time'></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlist.map((song, index) => {
                                    return (
                                        <tr key={index} onClick={() => handlePlay(index)}>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                <div className="song-info">
                                                    <div className="song-img">
                                                        <img src={song.image} alt="img"/>
                                                    </div>

                                                    <p>{song.name}</p>
                                                </div>
                                                
                                            </td>
                                            <td>{song.artist_name}</td>
                                            <td style={{ textAlign: "center" }}>2:30</td>
                                        </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PlaylistDisplay;