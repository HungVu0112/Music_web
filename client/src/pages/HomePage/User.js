import { useLocation } from "react-router-dom";

function User(){
    const location = useLocation();
    const user = location.state;

    return (
            <div className="userPage main-content" >
                <div className="heading">
                    <div className="image">
                        <img src={user.avatar} alt="img" />
                    </div>
                    <h1>{user.username}</h1>
                </div>
            </div>
    );
}

export default User;