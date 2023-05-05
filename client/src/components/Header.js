import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Header({ homePage, sidebar }) {
    const searchBtn = useRef();
    const modeSwitch = useRef();
    const modeText = useRef();

    const handleClick = () => {
        homePage.current.classList.toggle('dark');

        if (homePage.current.classList.contains('dark')) {
            modeText.current.innerText = 'Light Mode';
        } else {
            modeText.current.innerText = 'Dark Mode';
        }
    }

    useEffect(() => {
        
    })

    return (
        <>
            <header>
                <div className="image-text">
                    <span className="icon">
                        <i className='bx bxl-spring-boot logo'></i>
                    </span>

                    <div className="text header-text">
                        <span className="name">E11</span>
                        <span className="profession">Music Web</span>
                    </div>
                </div>

                {/* <i class='bx bx-chevron-right toggle'></i> */}
            </header>

            <div className="menu-bar">
                <div className="menu">
                    <li className="search-box" ref={searchBtn}>
                        <i className='bx bx-search icons'></i>
                        <input type="text" placeholder="Search..."/>
                    </li>
                    <ul className="menu-links">
                        <li className="nav-link">
                            <Link to='/home' replace>
                                <i className='bx bx-home-alt icons'></i>
                                <span className="text nav-text">Home</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/home/artists' replace>
                                <i className='bx bx-user icons'></i>
                                <span className="text nav-text">Artists</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/home/recent' replace>
                                <i className='bx bxl-deezer icons'></i>
                                <span className="text nav-text">Recent Played</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/home/favourite' replace>
                                <i className='bx bx-heart icons'></i>
                                <span className="text nav-text">Favourite Songs</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/home/createPlaylist' replace>
                                <i className='bx bx-library icons'></i>
                                <span className="text nav-text">Create Playlist</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/home/createPlaylist' replace>
                                <i className='bx bxs-group icons'></i>
                                <span className="text nav-text">About Us</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="bottom-content">
                    <li className="">
                        <Link to='/' replace>
                            <i className='bx bx-log-out icons'></i>
                            <span className="text nav-text">Logout</span>
                        </Link>
                    </li>

                    <li className="mode">
                        <div className="moon-sun">
                            <i className="bx bx-moon icons moon"></i>
                            <i className="bx bx-sun icons sun"></i>
                        </div>

                        <span className="mode-text text" ref={modeText}>Dark mode</span>

                        <div className="toggle-switch" ref={modeSwitch} onClick={handleClick}>
                            <span className="switch"></span>
                        </div>
                    </li>
                </div>
            </div>
        </>
    );
}

export default Header;