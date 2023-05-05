import Header from '../../components/Header';
import { useRef } from 'react';

function PageContent({children}) {
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);

    const homePage = useRef();
    const sidebar = useRef();
    return (
    <div className='homepage' ref={homePage}>
        <div className='sidebar' ref={sidebar}>
            <Header homePage={homePage} sidebar={sidebar} />
        </div>
        <div className='content'>
            <div className="info-bar">
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