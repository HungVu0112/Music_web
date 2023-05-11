import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function ArtistDisplay() {
    const location = useLocation();
    const [songs, setSongs] = useState();
    const artist = location.state;

    useEffect(() => {
        axios.get(`http://localhost:9000/songs/${location.state.name}`, songs)
            .then(res => {
                setSongs(res.data);
            })
            .catch(err => {console.log(err);})
    }, [location.state]);

    return (
        <div className="artistPage main-content" >
            <div className="heading">
                <div className="image">
                    <img src={artist.image} alt="img" />
                </div>
                <h1>{artist.name}</h1>
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
                                        width: "85%",
                                        textAlign: "left",    
                                    }}
                                >
                                    Name
                                </th>
                                <th scope="col"><i className='bx bx-time'></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs === undefined ? <tr></tr> : (
                                    songs.map((song, index) => {
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
                                                <td style={{ textAlign: "center" }}>2:30</td>
                                            </tr>
                                        )
                                    }
                                )
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ArtistDisplay;