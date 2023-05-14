import { useEffect, useState } from 'react'; 
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
                    return <Card img={playlist.image} name={playlist.name} key={index} path="playlist" state={playlist}/>
                })}
            </div>
        </div>
    )
}

export default Playlists;