import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderCSS from '../css/header.module.css';

function Header({ homePage, sidebar }) {
    const modeSwitch = useRef();
    const modeText = useRef();
    const menuBar = useRef();
    
    const handleClick = () => {
        homePage.current.classList.toggle('dark');
        sidebar.current.classList.toggle(`${HeaderCSS.dark_}`);
    
        if (homePage.current.classList.contains('dark')) {
            modeText.current.innerText = 'Dark Mode';
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
                sidebar.current.classList.toggle(`${HeaderCSS.dark_}`);
            }
        }
    })

    return (
        <>
            <header>
                <div className={HeaderCSS.title_combo}>
                    <div className={HeaderCSS.website_logo}>
                        <img src="img/header-logo.png"/>
                    </div>
                    <div className={`${HeaderCSS.text} ${HeaderCSS.header_text}`}>
                        <h1 className={HeaderCSS.name}>
                            E11 
                        </h1>
                        <h4 className={HeaderCSS.profession}>
                            Music Website
                        </h4>
                    </div>
                </div>
            </header>

            <div className={HeaderCSS.menu_bar}>
                <div className={HeaderCSS.menu}>
                    <ul className="menu-links" ref={menuBar}>
                        <li className="nav-link">
                            <Link to='/home' replace>
                                <i className={`bx bx-home-alt ${HeaderCSS.icons}`}></i>
                                <span className={HeaderCSS.text}>Home</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/search' replace>
                                <i className={`bx bx-search ${HeaderCSS.icons}`}></i>
                                <span className={HeaderCSS.text}>Search</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/artists' replace>
                                <i className={`bx bx-user ${HeaderCSS.icons}`}></i>
                                <span className={HeaderCSS.text}>Artists</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/albums' replace>
                                <i className={`bx bxs-album ${HeaderCSS.icons}`}></i>
                                <span className={HeaderCSS.text}>Albums</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/library' replace>
                                <i className={`bx bx-library ${HeaderCSS.icons}`}></i>
                                <span className={HeaderCSS.text}>Library</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/community' replace>
                                <i className={`bx bxs-group ${HeaderCSS.icons}`}></i>
                                <span className={HeaderCSS.text}>Community</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={HeaderCSS.bottom_content}>
                    <li className="">
                        <Link to='/' replace>
                            <i className={`bx bx-log-out ${HeaderCSS.icons}`}></i>
                            <span className={HeaderCSS.text}>Logout</span>
                        </Link>
                    </li>

                    <li className={HeaderCSS.mode}>
                        <div className={HeaderCSS.moon_sun}>
                            <i className={`bx bx-moon ${HeaderCSS.icons} ${HeaderCSS.moon}`}></i>
                            <i className={`bx bx-sun ${HeaderCSS.icons} ${HeaderCSS.sun}`}></i>
                        </div>

                        <span className={HeaderCSS.text} ref={modeText}>Light Mode</span>

                        <div className={HeaderCSS.toggle_switch} ref={modeSwitch} onClick={handleClick}>
                            <span className={HeaderCSS.switch}></span>
                        </div>
                    </li>
                </div>
            </div>
        </>
    );
}

export default Header;