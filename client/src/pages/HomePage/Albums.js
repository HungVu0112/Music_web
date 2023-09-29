import AlbumCSS from '../../css/album.module.css';
import Card from '../../components/Card';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Albums () {
    const [albums, setAlbums] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = () => {
        axios.get(`http://localhost:9000/getAlbums/${searchData.replace(/\s/g, '')}`)
            .then(res => {
                setSearchResult(res.data);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:9000/albums')
            .then (res => {
                setAlbums(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={`${AlbumCSS.album} main-content`}>
            <div className={AlbumCSS.alert}>
                <i className='bx bxs-bell-ring'></i>
                <div>
                    <p>If we can't find the result, the web will display all the albums for recommendation !</p>
                </div>
            </div>
            <div className={AlbumCSS.search}>
                <i className='bx bx-search-alt'></i>
                <input onChange={(e) => setSearchData(e.target.value)} type='text' placeholder="Artist's name or album's name ..." />
                <button onClick={handleSearch} className={AlbumCSS.search_btn} >Search</button>
            </div>

            <div className={AlbumCSS.line}></div>

            <div className={AlbumCSS.display}>
                {searchResult?.length !== 0 ? (
                    searchResult?.map((album, index) => {
                        return <Card key={index} type="playlist" img={album.image} name={album.name} description={album.artist_name} />
                    })
                ) : (
                    albums?.map((album, index) => {
                        return <Card key={index} type="playlist" img={album.image} name={album.name} description={album.artist_name} />
                    })
                )}
            </div>
        </div>
    )
}

export default Albums;