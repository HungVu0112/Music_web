import Header from '../../components/Header';
import { useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function PageContent({children}) {
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const location = useLocation();

    const homePage = useRef();
    const sidebar = useRef();
    const searchBox = useRef();
    const navigate = useRef();

    useEffect(() => {
        if (location.pathname === "/search") {
            searchBox.current.style.display = "";
        } else searchBox.current.style.display = "none";

        if (location.pathname === "/library" 
            || location.pathname === "/library/recent"
            || location.pathname === "/library/favourite"
            || location.pathname === "/library/myPlaylist"
            || location.pathname === "/library/myPlaylist/create"
            || location.pathname.includes("/library/myPlaylist/")
        ) {
                navigate.current.style.display = "";
        } else navigate.current.style.display = "none";
    },[location.pathname])

    return (
    <div className='homepage' ref={homePage}>
        <div className='sidebar' ref={sidebar}>
            <Header homePage={homePage} sidebar={sidebar} />
        </div>
        <div className='content'>
            <div className="info-bar">
                <div className="search-box" ref={searchBox}>
                    <i className='bx bx-search-alt'></i>
                    <input type="text" placeholder="Search..." />
                </div>

                <div className="navigate" ref={navigate}>
                    <Link to="/library/myPlaylist">My Playlists</Link>
                    <Link to="/library/recent">Recent</Link>
                    <Link to="/library/favourite">Favourite</Link>
                </div>

                <div className="user-circle">
                    <img src={user.avatar} alt="user"></img>
                </div>
            </div>
            {children}
            <div className="Player">
                    
            </div>
        </div>
    </div>
    )
}

export default PageContent;