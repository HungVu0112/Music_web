import Header from '../../components/Header';
import { useRef, useEffect } from 'react';
import { useLocation, Link, redirect } from 'react-router-dom';

function PageContent({children}) {
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const location = useLocation();

    const homePage = useRef();
    const sidebar = useRef();
    const searchBox = useRef();
    const navigate = useRef();
    const player = useRef();
    const redirectBack = useRef();

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

        if (location.pathname.includes("/artists/")) {
            redirectBack.current.style.display = "";
        } else redirectBack.current.style.display = "none";

    },[location.pathname])

    return (
    <div className='homepage dark'  ref={homePage}>
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

                <Link to="/artists" className="redirect-back" ref={redirectBack}>
                    <i className='bx bx-chevron-left'></i>
                </Link>

                <div className="user-circle">
                    <img src={user.avatar} alt="user"></img>
                </div>
            </div>
            {children}
            
            <footer className="bottom" id="bottom-click">
	            <div className="active-song-description">
                <div id="song-image">
                    <img src="https://www.lololyrics.com/img/cover/39824.jpeg"/>
                </div>
                <div className="song-desc">
                    <div>
                        Be Kind
                    </div>
                    <div >
                        Halsey
                    </div>
                </div>
                <div className="heart-and-ban-icon">
                <span>
                    <i className='bx bx-heart'></i>
                </span>
                
                <span>
                    <i className="fas fa-ban"></i>
                </span>
            </div>
        </div>
<<<<<<< HEAD
    <div class="player">
            <div class="controls">
                <i class='bx bx-shuffle'></i>
                <i class='bx bx-skip-previous'></i>
                <i class='bx bx-pause'></i>
                <i class='bx bx-skip-next'></i>
                <i class='bx bx-sync'></i>
=======
    <div className="player">
            <div className="controls">
                <div><i className='bx bx-shuffle'></i></div>
                <div><i className='bx bx-skip-previous'></i></div>
                <div><i className='bx bx-pause'></i></div>
                <div><i className='bx bx-skip-next'></i></div>
                <div><i className='bx bx-sync'></i></div>
>>>>>>> 2fb0cbc3a4665c59ed42124868e5fc95f40ed9b9
            </div>
            <div id="slider">
                <div className="time">
                    0:00
                </div>

                <div className="slidecontainer">
                    <input type="range" min="0" max="100" value="0" className="slider" id="myRange" style={{ width: "100%" }} onChange={() => {}}/>
                </div>
                <div className="time">
                    5:10
                </div>
            </div>

        </div>

        <div className="extras">
            <div>
                <i className='bx bx-list-ul'></i>
            </div>
            <div>
                <i className='bx bx-laptop'></i>
            </div>
            <div>
                <i className='bx bxs-volume-full'></i>
            </div>
            <div className="slidecontainer" style={{ width: "30%" , marginTop:"-10px"  }}>
                <input type="range" min="0" max="100" value="0" className="slider" id="myRange" style={{marginTop:"0px" , width: "100%" }} onChange={() => {}}/>
            </div>
                    <div>
                        <i className="fas fa-expand-alt"></i>
                    </div>
                </div>


            </footer>
        </div>
    </div>
    )
}

export default PageContent;