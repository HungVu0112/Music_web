import { useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import axios from 'axios';

function User(){
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const btn = useRef();
    const modal = useRef();
    const [data,setdata] = useState(user);
    const [username, setUsername] = useState(user.username);
    const [reRender, setRerender] = useState(0);

    const handleClick = () => {
        modal.current.style.display = "flex";
    }
    const handleClick1 = () => {
        modal.current.style.display = "none";
    }
    const handleSubmit = () => {
        axios.get(`http://localhost:9000/user/changeinfo/${user.username}&${username}`)
            .then(res => {
                modal.current.style.display = "none";
                setRerender(n => n + 1);
            })
    }

    const handleInput = (e) => {
        setUsername(e.target.value);
    }

    useEffect(() => {
        axios.get(`http://localhost:9000/user/${username}`)
            .then(res => {
                const account = JSON.stringify(res.data);
                sessionStorage.setItem("account", account);
                setdata(res.data);
            })
    }, [reRender])


    return (
        <>
            <div className="userPage main-content" >  
                <div className="heading">
                   
                    <button ref={btn} onClick={handleClick} className="image">
                        <img src={data.avatar} alt="img" />
                    </button>
                    
                    <h1>{data.username}</h1>
                </div>
            </div>
            <div ref={modal} class = "modal">
                <div class = "modal-container">
                    <div onClick={handleClick1} class="modal-close">
                        <i class='bx bx-x'></i>
                    </div>
                    <header class = "modal-header">
                        <i class='bx bx-user'></i>
                        Change Photo
                    </header>
                    <div class="modal-body">
                        <label for="" class="modal-label">
                            Change avatar
                        </label>
                        <input type="" class="modal-input" placeholder="Link image"></input>
                        
                        <label for="" class="modal-label">
                            Change name
                        </label>
                        <input onChange={handleInput} type="name" class="modal-input" placeholder="New"></input>
                        <button onClick={handleSubmit} id="change">
                            ADD <i class='bx bx-check'></i>
                        </button>
                    </div>
                </div>
            </div>
           
        </>
    );
}

export default User;