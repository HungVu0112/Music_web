import SearchResultCSS from '../css/searchresultbox.module.css';
import SongBox from './SongBox';
import axios from 'axios';

function SearchResultBox({ type, data }) {
    return (
        <>
            {type === "artist" || type === "album" ? (
                <div class={SearchResultCSS.artist}>
                    <div className={SearchResultCSS.info_box}>
                        <div class={SearchResultCSS.pic}>
                            <img src={type === "artist" ? data.info.image : data.image} alt="Pic" />
                        </div>
                        
                        <div class={SearchResultCSS.info}>
                            <h2>{type === "artist" ? data.info.name : data.name}</h2>
                            {type === "artist" ? (
                                <p>Song: {data.songCount[0].songCount}</p>
                            ) : (
                                <p>Song: {data.songs.length}</p>
                            )}
                            {type === "artist" && <p>Album: {data.albumCount[0].albumCount}</p>}
                        </div>
                    </div>
                    
                    <div class={SearchResultCSS.song_display}>
                        <div class={SearchResultCSS.song}>
                            {type === "artist" ? (data.songList.map((song, index) => {
                                return <SongBox key={index} img={song.image} name={song.name} artist={song.artist_name} />
                            })) : (
                                data.songs.map((song, index) => {
                                    return <SongBox key={index} img={song.image} name={song.name} artist={song.artist_name} />
                                }).slice(0, 2)
                            )}
                        </div>
                        
                        <p>View more</p>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default SearchResultBox;