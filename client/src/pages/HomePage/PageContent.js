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
    const player = useRef();

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
            
            <footer class="bottom" id="bottom-click">
	            <div class="active-song-description">
                <div id="song-image">
                    <img src="https://www.lololyrics.com/img/cover/39824.jpeg"/>
                </div>
                <div class="song-desc">
                    <div>
                        Be Kind
                    </div>
                    <div >
                        Halsey
                    </div>
                </div>
                <div class="heart-and-ban-icon">
                <span>
                    <i class='bx bx-heart'></i>
                </span>
                
                <span>
                    <i class="fas fa-ban"></i>
                </span>
            </div>
        </div>
    <div class="player">
            <div class="controls">
                <div><i class='bx bx-shuffle'></i></div>
                <div><i class='bx bx-skip-previous'></i></div>
                <div><i class='bx bx-pause'></i></div>
                <div><i class='bx bx-skip-next'></i></div>
                <div><i class='bx bx-sync'></i></div>
            </div>
            <div id="slider">
                <div class="time">
                    0:00
                </div>

                <div class="slidecontainer">
                    <input type="range" min="0" max="100" value="0" class="slider" id="myRange" style={{ width: "100%" }}/>
                </div>
                <div class="time">
                    5:10
                </div>
            </div>

        </div>

        <div class="extras">
            <div>
                <i class='bx bx-list-ul'></i>
            </div>
            <div>
                <i class='bx bx-laptop'></i>
            </div>
            <div>
                <i class='bx bxs-volume-full'></i>
            </div>
            <div class="slidecontainer" style={{ width: "30%" , marginTop:"-10px"  }}>
                <input type="range" min="0" max="100" value="0" class="slider" id="myRange" style={{marginTop:"0px" , width: "100%" }}/>
            </div>
                    <div>
                        <i class="fas fa-expand-alt"></i>
                    </div>
                </div>


            </footer>
        </div>
    </div>
    )
}

export default PageContent;