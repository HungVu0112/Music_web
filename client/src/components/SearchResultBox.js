import SearchResultCSS from '../css/searchresultbox.module.css';
import axios from 'axios';

function SearchResultBox({ type, info }) {
    return (
        <>
            {type === "artist" || type === "album" ? (
                <div class={SearchResultCSS.artist}>
                    <div className={SearchResultCSS.info_box}>
                        <div class={SearchResultCSS.pic}>
                            <img src={info.image} alt="Pic" />
                        </div>
                        
                        <div class={SearchResultCSS.info}>
                            <h2>{info.name}</h2>
                            <p>Song: </p>
                            <p>Album: </p>
                        </div>
                    </div>
                    
                    <div class={SearchResultCSS.song_display}>
                        <div class={SearchResultCSS.song}>

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