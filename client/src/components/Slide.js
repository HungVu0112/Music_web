import Card from './Card';
import SlideCSS from '../css/slide.module.css';

function Slide({ arr, type }) {
    return(
        <div className={SlideCSS.slide}>
            {arr?.map((item, index) => {
                return <Card key={index} type={type} img={item.image} name={item.name} description={type !== "artist" && item.artist_name}/>
            })}
        </div>
    )
}

export default Slide;