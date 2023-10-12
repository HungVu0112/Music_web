import SearchCSS from '../../css/search.module.css';
import SearchResultBox from '../../components/SearchResultBox';
import Card from '../../components/Card';
import Slide from '../../components/Slide';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SongBox from '../../components/SongBox';

function Search({ searchData, isSearch }) {
    const [recommendPlaylist, setRecommendPlaylist] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:9000/playlists')
            .then(res => {
                setRecommendPlaylist(res.data);
            })  
            .catch(err => console.log(err))
    }, [])

    console.log(searchData)

    return (
        <div className={`${SearchCSS.search}  main-content`} >
            {!isSearch ? (
                <>
                    <h2>Recommend</h2>

                    <div className={SearchCSS.recommend_song}>
                        {recommendPlaylist && (
                            recommendPlaylist[2]?.songs.map((song, index) => {
                                return <Card key={index} type="song" img={song.image} name={song.name} description={song.artist_name} />
                            })
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h2 className={SearchCSS.res_title}>Result</h2>

                    <div className={SearchCSS.top_board}>
                        <h2>Top Songs</h2>
                        <div className={SearchCSS.line}></div>

                        <div className={SearchCSS.top_song}>
                            {recommendPlaylist[0]?.songs.map((song, index) => {
                                return <SongBox key={index} img={song.image} name={song.name} artist={song.artist_name} />
                            }).slice(0,5)}
                        </div>
                    </div>

                    {searchData && Object.keys(searchData)?.length !== 0 ? (
                        <>
                            {searchData.artists.length !== 0 && (
                                <div className={SearchCSS.artist_res} >
                                    <h2>Artist</h2>

                                    <div className={SearchCSS.a_display}>
                                        {searchData.artists.map((artist, index) => {
                                            return <SearchResultBox key={index} type="artist" data={artist} />
                                        })}
                                    </div>
                                </div>
                            )}

                            {searchData.albums.length !== 0 && (
                                <div className={SearchCSS.album_res} >
                                    <h2>Album</h2>

                                    <div className={SearchCSS.b_display}>
                                        {searchData.albums.map((album, index) => {
                                            return <SearchResultBox key={index} type="album" data={album} />
                                        })}
                                    </div>
                                </div>
                            )}

                            {searchData.songs.length !== 0 && (
                                <div className={SearchCSS.song_res} >
                                    <h2>Song</h2>

                                    <div className={SearchCSS.s_display}>
                                        <Slide type="song" arr={searchData.songs} />
                                    </div>
                                </div>
                            )}

                            
                        </>
                    ) : (
                        <p className={SearchCSS.search_err}>Can't find the results !!!</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Search; 