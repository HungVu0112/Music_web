import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SongsDisplay() {
    const [data, setData] = useState({});
    const location = useLocation();
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);

    useEffect(() => {
        if (location.pathname === "/library/myPlaylist/create") {
            axios.get(`http://localhost:9000/user/playlist/create/${user.username}`, data)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => { console.log(err); })
        } else {
            setData(location.state);
        }
    }, [location.pathname, location.state]);

    return (
       <div className="displayPage main-content">
            <div className="heading">
                <div className="image">
                    <img src={data ? data.image : ""} alt="img" />
                </div>
                <h1>{data ? data.name : "name"}</h1>
            </div>

            <div className="body">
                <div className="tool-bar">
                    <i className='bx bx-play play' ></i>
                    <i className='bx bx-heart like'></i>
                </div>

                <div className="list">
                    <div className="search-box">
                        <i className='bx bx-search-alt'></i>
                        <input type="text" placeholder="Search songs to add..." />
                    </div>

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
                            {data ? (
                                data.songs === undefined ? "" : (
                                    data.songs.map((song, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{song.name}</td>
                                                    <td style={{ textAlign: "center" }}>2:30</td>
                                                </tr>
                                            </>
                                        )
                                    }
                                )
                            )) : ""}
                        </tbody>
                    </table>
                </div>
            </div>
       </div> 
    )
}

export default SongsDisplay;