import CardCSS from '../css/card.module.css';

function Card({type, img, name, description}) {
    return (
        <div className={`${CardCSS.card} ${type === 'artist' && CardCSS.artist_card}`}>
            <div className={CardCSS.card_head}>
                <img src={img} />
                {type !== "artist" && (
                    <div className={CardCSS.play_btn}>
                        <i className='bx bxs-right-arrow'></i>
                    </div>
                )}
            </div>

            <div className={CardCSS.card_body}>
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Card;
