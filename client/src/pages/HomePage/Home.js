import Slide from '../../components/Slide';
import SongBox from '../../components/SongBox';
import HomeCSS from '../../css/home.module.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function Home() {
    const [playlists, setPlaylists] = useState([]);
    const [reload, setReload] = useState(false);
    const worldwide = useRef();
    const trending = useRef();
    const recent = useRef();

    const ActiveToggle = (e) => {
        worldwide.current.classList.remove(`${HomeCSS.active}`);
        trending.current.classList.remove(`${HomeCSS.active}`);
        recent.current.classList.remove(`${HomeCSS.active}`);

        if (e.target.tagName === "H2") {
            e.target.parentNode.classList.add(`${HomeCSS.active}`);
        } else {
            e.target.classList.add(`${HomeCSS.active}`);
        }

        setReload(!reload);
    }

    useEffect(() => {}, [reload])

    useEffect(() => {
        axios.get('http://localhost:9000/playlists')
            .then(res => {
                setPlaylists(res.data);
            })  
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="main-content">
            <div className={HomeCSS.header}>
                <div className={HomeCSS.header_text}>
                    <h1>Top Songs</h1>
                    <p>Listen to top songs</p>
                </div>

                <button className={HomeCSS.view_btn}>View All</button>
            </div>

            <div className={HomeCSS.body}>
                <div className={HomeCSS.song_slide}>
                    <Slide type="song" arr={playlists[1]?.songs} />
                </div>

                <div className={HomeCSS.parts}>
                    <div className={HomeCSS.photo}>
                        <img src='img/home-photo-1.jpg' width={380} height={440} alt='Photo' />
                        <div className={HomeCSS.photo_r2}>
                            <img src='img/home-photo-2.jpg' width={340} height={212} alt='Photo' />
                            <img src='img/home-photo-3.jpg' width={340} height={212} alt='Photo' />
                        </div>
                    </div>

                    <div className={HomeCSS.suggest}>
                        <div className={HomeCSS.titles}>
                            <div onClick={ActiveToggle} className={HomeCSS.active} ref={worldwide}>
                                <h2>WorldWide</h2>
                            </div>
                            <div className='' onClick={ActiveToggle} ref={trending}>
                                <h2>Trending</h2>
                            </div>
                            <div className='' onClick={ActiveToggle} ref={recent}>
                                <h2>Recent</h2>
                            </div>
                        </div>

                        <div className={HomeCSS.title_info}>
                            {worldwide.current?.classList.contains(`${HomeCSS.active}`) && (
                                playlists[2]?.songs.map(song => {
                                    return <SongBox img={song.image} name={song.name} artist={song.artist_name} />
                                })            
                            )}

                            {trending.current?.classList.contains(`${HomeCSS.active}`) && (
                                playlists[0]?.songs.map(song => {
                                    return <SongBox img={song.image} name={song.name} artist={song.artist_name} />
                                })  
                            )}

                            {recent.current?.classList.contains(`${HomeCSS.active}`) && (
                                <p>re</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;