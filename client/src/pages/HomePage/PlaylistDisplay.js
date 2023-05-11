import { useLocation } from 'react-router-dom';

function PlaylistDisplay() {
    const location = useLocation();
    const data = location.state;

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
                    <i className='bx bx-play play' ></i>
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
                            {data.songs.map((song, index) => {
                                    return (
                                        <tr key={index}>
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