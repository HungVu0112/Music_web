import Header from '../../components/Header';
import { useRef, useEffect, useState } from 'react';
import { useLocation, Link, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from './Search';
import Footer from '../../components/Footer';
import axios from 'axios';
import HeaderCSS from '../../css/header.module.css';

function PageContent({children}) {
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const location = useLocation();

    const [searchResult, setSearchResult] = useState({});
    const [currMusic, setCurrMusic] = useState(null);
    const [currPlaylist, setCurrentPlaylist] = useState(null);
    const [isSearch, setIsSearch] = useState(false);

    const homePage = useRef();
    const sidebar = useRef();
    const searchBox = useRef();
    const navigate = useRef();
    const redirectBack1 = useRef();
    const redirectBack2 = useRef();
    const redirectBack3 = useRef();

    const handleSearch = (e) => {
        const value = e.target.value.trim();

        if (value !== "") {
            axios.get(`http://localhost:9000/getAll/${value.replace(/\s/g, '')}`, searchResult)
                .then(res => {
                    setIsSearch(true);
                    setSearchResult(res.data);
                })
                .catch(err => {console.log(err);})
        }
    }   

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, [location.pathname])

    useEffect(() => {
        if (location.pathname === "/search") {
            searchBox.current.style.display = "";
        } else searchBox.current.style.display = "none";

        if (location.pathname === "/library" 
            || location.pathname === "/library/recent"
            || location.pathname === "/library/favourite"
            || location.pathname === "/library/shared"
            || location.pathname === "/library/myPlaylist"
            || location.pathname === "/library/myPlaylist/create"
            || location.pathname.includes("/library/myPlaylist/")
        ) {
                navigate.current.style.display = "";
        } else navigate.current.style.display = "none";

        if (location.pathname.includes("/artists/")) {
            redirectBack1.current.style.display = "";
        } else redirectBack1.current.style.display = "none";

        if (location.pathname.includes("/playlists/")) {
            redirectBack2.current.style.display = "";
        } else redirectBack2.current.style.display = "none";

        if (location.pathname.includes("/community/")) {
            redirectBack3.current.style.display = "";
        } else redirectBack3.current.style.display = "none";

    },[location.pathname])

    const { playing, playlists } = useSelector(state => state.MusicReducer);
    

    useEffect(() => {
        setCurrMusic(playing);
    },[playing])

    useEffect(() => {
        setCurrentPlaylist(playlists);
    },[playlists])
    
    return (
    <div className='homepage dark' ref={homePage}>
        <div className={`${HeaderCSS.sidebar} ${HeaderCSS.dark_}`} ref={sidebar}>
            <Header homePage={homePage} sidebar={sidebar} />
        </div>
        <div className='content'>
            
            <div className="info-bar">
                <div className="search-box" ref={searchBox}>
                    <i className='bx bx-search-alt'></i>
                    <input type="text" placeholder="What do you want to listen to?" onChange={handleSearch}/>
                </div>

                <div className="navigate" ref={navigate}>
                    <Link to="/library/myPlaylist">My Playlists</Link>
                    <Link to="/library/recent">Recent</Link>
                    <Link to="/library/favourite">Favourite</Link>
                    <Link to="/library/shared">Shared</Link>
                </div>

                <Link to="/artists" className="redirect-back" ref={redirectBack1}>
                    <i className='bx bx-chevron-left'></i>
                </Link>
                
                <Link to="/playlists" className="redirect-back" ref={redirectBack2}>
                    <i className='bx bx-chevron-left'></i>
                </Link>

                <Link to="/community" className="redirect-back" ref={redirectBack3}>
                    <i className='bx bx-chevron-left'></i>
                </Link>

                <Link to='/user' className="user-circle">
                    <img src={user.avatar} alt="user"></img>
                </Link>
            </div>

            {location.pathname === "/search" ? <Search searchData={searchResult} isSearch={isSearch} /> : children}            

            {currMusic ? 
                <Footer music={currMusic} playlist={currPlaylist} />
            : ""}

        </div>
    </div>
    )
}

export default PageContent;