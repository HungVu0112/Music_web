import SongBoxCSS from '../css/songbox.module.css';

function SongBox({ img, name, artist }) {
    return (
        <div className={SongBoxCSS.song_box}>
            <div className={SongBoxCSS.song_info}>
                <img src={img} />

                <div className={SongBoxCSS.song_text}>
                    <h5>{name}</h5>
                    <p>{artist}</p>
                </div>
            </div>

            <div className={SongBoxCSS.play_btn}>
                <i className='bx bxs-right-arrow'></i>
            </div>
        </div>
    )
}

export default SongBox;