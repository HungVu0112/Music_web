import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArtistCSS from '../../css/artist.module.css';
import Card from '../../components/Card';

function Artists() {
    const [artists, setArtists] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = () => {
        axios.get(`http://localhost:9000/getArtists/${searchData.replace(/\s/g, '')}`)
            .then(res => {
                setSearchResult(res.data);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:9000/artist')
            .then(res => {
                setArtists(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={`${ArtistCSS.artist} main-content`}>
            <div className={ArtistCSS.alert}>
                <i className='bx bxs-bell-ring'></i>
                <div>
                    <p>If we can't find the artist, the web will display all the artists for recommendation !</p>
                </div>
            </div>
            <div className={ArtistCSS.search}>
                <i className='bx bx-search-alt'></i>
                <input onChange={(e) => setSearchData(e.target.value)} type='text' placeholder='Drake ...' />
                <button onClick={handleSearch} className={ArtistCSS.search_btn} >Search</button>
            </div>

            <div className={ArtistCSS.line}></div>

            <div className={ArtistCSS.display}>
                {searchResult?.length !== 0 ? (
                    searchResult?.map((artist, index) => {
                        return <Card key={index} type="artist" img={artist.image} name={artist.name} />
                    })
                ) : (
                    artists?.map((artist, index) => {
                        return <Card key={index} type="artist" img={artist.image} name={artist.name} />
                    })
                )}
            </div>
        </div>
    )
}

export default Artists;