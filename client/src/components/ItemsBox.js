import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Songcard from './Songcard.js';

function ItemsBox(props) {
    const [data, setData] = useState([]);
    const [artist, setArtist] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:9000/songs/get4songs/${props.name}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {console.log(err)})
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:9000/artist/${props.name}`)
            .then(res => {
                setArtist(res.data);
            })
            .catch(err => {console.log(err)})
    },[])    

    return (
        <div className="items-box">
            <div className="box-title">
                <h2 className='text'>{props.name}</h2>
                {artist ? <Link to={`/artists/${props.name}`} state={artist} className='text'>Show all</Link> : ""}
            </div>

            <div className="box-body">
                {data.length === 0 ? "" : 
                    data.map((song, index) => {
                        return <Songcard song={song} key={index} playlist={data} index={index}/>
                    })}
            </div>
        </div>
    )
}

export default ItemsBox;