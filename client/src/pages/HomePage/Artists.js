import {useEffect,useState} from 'react';
import Card from '../../components/card';
import axios from 'axios';

function Artists() {
    const [data, setdata] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9000/artist',data)
        .then(res => {
            setdata(res.data)
        })
        .catch(err => { console.log(err) })
    }, [])

    return (
        <div className="artist main-content">
            <div className="title">
                <h1 className="text">Artists</h1>
            </div>

            <div className="body">
                { data.map((artist, index) => {
                    return <Card img={artist.image} name={artist.name} key={index}/>
                })}
            </div>
        </div>
    );
}

export default Artists;