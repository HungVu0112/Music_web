import {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/card';
import axios from 'axios';

function Artists() {
    const [data, setdata] = useState([]);
    let number = 0;
    
    useEffect(() => {
        axios.get('http://localhost:9000/artist',data)
        .then(res => {
            setdata(res.data)
        })
        .catch(err => { console.log(err) })
    }, [number])

    return (
        <div className="artist main-content">
            <div className="title">
                <h1 className="text">Artists</h1>
            </div>

            <div className="body">
                { data.map((artist, index) => {
                    return <Link to={`/artists/${artist.name}`} state={artist} key={index}><Card img={artist.image} name={artist.name} key={index} /></Link>
                })}
            </div>
        </div>
    );
}

export default Artists;