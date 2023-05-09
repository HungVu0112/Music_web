import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ homePage, sidebar }) {
    const searchBtn = useRef();
    const modeSwitch = useRef();
    const modeText = useRef();
    const menuBar = useRef();
    const location = useLocation();
    
    const handleClick = () => {
        homePage.current.classList.toggle('dark');
    
        if (homePage.current.classList.contains('dark')) {
            modeText.current.innerText = 'Light Mode';
            sessionStorage.setItem('isDark', "true");
        } else {
            modeText.current.innerText = 'Dark Mode';
            sessionStorage.setItem('isDark', "false");
        }
    }

    window.addEventListener('load', function() {
        if(sessionStorage.getItem('isDark') === "true") {
            if (!homePage.current.classList.contains('dark')) {
                homePage.current.classList.toggle('dark');
            }
        }
    })

    useEffect(() => {
        const adr = location.pathname;
        
        const menuItems = menuBar.current.children;
        
        for (let i = 0; i < menuItems.length; i++) {
            const item = menuItems[i].querySelector('a');

            if (item.getAttribute('href') === adr) {
                item.classList.add('active');
            }
            else item.classList.remove('active');
        }
    })

    return (
        <>
            <header>
                {/* <div className="image-text">
                    <span className="icon">
                        <i className='bx bxs-bowl-rice logo'></i>
                    </span>

                    <div className="text header-text">
                        <span className="name">E11</span>
                        <span className="profession">Music Web</span>
                    </div>
                </div> */}
                <div class="title-combo">
                    <div class="website-logo">
                        <img src="https://cdn0.iconfinder.com/data/icons/internet-2020/1080/Applemusicandroid-512.png"/>
                    </div>
                <div class="text header-text">
                    <h1>
                        E11 
                    </h1>
                    <h4>
                        Music Website
                    </h4>
                </div>
                </div>

                {/* <i class='bx bx-chevron-right toggle'></i> */}
            </header>

            <div className="menu-bar">
                <div className="menu">
                    <ul className="menu-links" ref={menuBar}>
                        <li className="nav-link">
                            <Link to='/home' replace>
                                <i className='bx bx-home-alt icons'></i>
                                <span className="text nav-text">Home</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/search' replace>
                                <i className='bx bx-search icons'></i>
                                <span className="text nav-text">Seach</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/artists' replace>
                                <i className='bx bx-user icons'></i>
                                <span className="text nav-text">Artists</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/library' replace>
                                <i className='bx bx-library icons'></i>
                                <span className="text nav-text">Library</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/playlists' replace>
                                <i className='bx bxs-folder icons'></i>
                                <span className="text nav-text">Playlists</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/aboutus' replace>
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