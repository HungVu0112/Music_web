import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Card from '../../components/card';
import Songcard from '../../components/Songcard';
import axios from 'axios';

function Search({ searchData }) {
    const title = useRef();
    const data = useRef([]);
    const artistAmount = useRef(0);
    const [count, setCount] = useState();
    let artists = [];
    let songs = [];
    let playlists = [];
    
    useEffect(() => {
        if (title.current.innerText === "Recommend") {
            axios.get('http://localhost:9000/songs/getTops')
                .then(res => {
                    data.current = res.data;

                    data.current.forEach(item => {
                        if (item.type === undefined) {
                            artistAmount.current++;
                        }
                    })
                    setCount(n => n + 1);
                })
        }
    }, [title, searchData])

    searchData.forEach((data) => {
        if (data.type === undefined) {
            if (data.songs === undefined) {
                artists.push(data);
            } else {
                playlists.push(data);
            }
        } else {
            songs.push(data);
        }
    })

    return (
        <div className="searchPage main-content">
            <div className="title">
                <h1 className="text" ref={title}>{searchData.length === 0 ? "Recommend" : "Result"}</h1>
            </div>
            
                <div className="page-body">
                    <div className="search-element">
                        {searchData.length === 0 ? (data.current.length === 0 ? "" : 
                        <>    
                            <h2 className="text">・Top 4 Songs</h2>
                            <div className="box scroll-bar">
                                {data.current.map((song, index) => {
                                    if (song.type !== undefined) {
                                        if (index < artistAmount.current + 4) {
                                            return <Songcard song={song} key={index} playlist={data.current} artistAmount={artistAmount.current} index={index}/>
                                        }
                                    }
                                })}
                            </div>
                        </>
                        ) : songs.length === 0 ? "" : (
                            <>
                                <h2 className="text">・Songs</h2>
                                <div className="box scroll-bar">
                                    {songs.map((song, index) => {
                                        if (index < 4) {
                                            return <Songcard song={song} key={index} playlist={songs} index={index}/>
                                        }
                                    })}
                                </div>
                            </>   
                            )
                        }         
                    </div>
                    
                    <div className="search-element artist-element">
                        
    
                        {searchData.length === 0 ? (data.current.length === 0 ? "" :
                        <>    
                            <h2 className="text">・Top 4 Artists</h2>
                            <div className="box scroll-bar">
                                {data.current.map((artist, index) => {
                                    if (artist.type === undefined) {
                                        if (index < 4) {
                                            return <Link to={`/artists/${artist.name}`} state={artist} key={index}><Card name={artist.name} img={artist.image}/></Link>
                                        }
                                    }
                                })}
                            </div>
                        </>    
                        ) : artists.length === 0 ? "" : (
                            <>
                                <h2 className="text">・Artists</h2>
                                <div className="box scroll-bar">
                                    {artists.map((artist, index) => {
                                        if (index < 4) {
                                            return <Link to={`/artists/${artist.name}`} state={artist} key={index}><Card name={artist.name} img={artist.image}/></Link>
                                        }
                                    })}
                                </div>
                            </>    
                            )
                        }         
                    </div>
                    
                    <div className="search-element">
                        {playlists.length === 0 ? "" : (
                            <>                    
                                <h2 className="text">・Playlists</h2>

                                <div className="box scroll-bar">
                                    {playlists.map((playlist, index) => {
                                        if (index < 4) {
                                            return <Link to={`/playlists/${playlist.name}`} state={playlist} key={index}><Card name={playlist.name} img={playlist.image}/></Link>
                                        }
                                    })}
                                </div>
                            </>
                        )}
                    </div>
            </div>            
        </div>
    );
}

export default Search;