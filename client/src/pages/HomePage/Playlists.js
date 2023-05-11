import { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/card';

function Playlists() {
    const [data, setData] = useState([]);
    let number = 0;

    useEffect(() => {
        axios.get('http://localhost:9000/playlists', data)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {console.log(err);});
    }, [number])

    return (
        <div className="playlists main-content">
            <div className="title">
                <h1 className="text">Playlists</h1>
            </div>

            <div className="body">
                { data.map((playlist, index) => {
                    return <Link to={`/playlists/${playlist.name}`} state={playlist} key={index}><Card img={playlist.image} name={playlist.name} key={index} /></Link>
                })}
            </div>
        </div>
    )
}

export default Playlists;