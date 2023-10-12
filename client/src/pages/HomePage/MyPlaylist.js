import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MyPlaylistCSS from '../../css/myplaylist.module.css';
import PlaylistBox from '../../components/PlaylistBox';
import axios from 'axios';

function MyPlaylist() {
    const [playlists, setPlaylists] = useState([]);
    const [reload, setReload] = useState(0);
    const navigate = useNavigate();
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);

    const handleClick = () => {
        axios.get(`http://localhost:9000/user/playlist/create/${user._id}`)
            .then(res => {
                navigate(`/library/myPlaylist/${res.data._id}`, { state: res.data });
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(`http://localhost:9000/user/${user._id}`)
            .then(res => {
                setPlaylists(res.data.playlists);
            })
            .catch(err => console.log(err));
    }, [reload])

    return (
        <div className={`${MyPlaylistCSS.my_playlist} main-content`}>
            <div className={MyPlaylistCSS.title}>
                <h1>MY PLAYLISTS</h1>
                <i onClick={handleClick} className='bx bxs-layer-plus'></i>
            </div>

            <div className={MyPlaylistCSS.line}></div>

            <div className={MyPlaylistCSS.p_display}>
                {playlists.length !== 0 ? (
                    playlists.map((playlist, index) => {
                        return <PlaylistBox type="big" index={index} playlist={playlist} setReload={setReload} /> 
                    })
                ) : (
                    <p className={MyPlaylistCSS.no_res_1}>You haven't create any playlist yet !!</p>
                )}
            </div>

            <div className={MyPlaylistCSS.share_p}>
                <h2>Shared Playlists</h2>

                <div className={MyPlaylistCSS.line}></div>

                <div className={MyPlaylistCSS.share_p_display}>
                    {playlists.filter(playlist => {
                        return playlist.isShared === true;
                    }).length !== 0 ? (
                        <>  
                            <div>
                                {playlists.filter(playlist => {
                                    return playlist.isShared === true;
                                }).map((playlist, index) => {
                                    return <PlaylistBox type="small" index={index} playlist={playlist} setReload={setReload} />
                                }).slice(0, 3)}
                            </div>

                            <p className={MyPlaylistCSS.show}>View more</p>
                        </>
                    ) : (
                        <p className={MyPlaylistCSS.no_res_2}>You haven't shared any playlists yet !!</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyPlaylist;