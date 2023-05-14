import { useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import axios from 'axios';

function User(){
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const btnChange = useRef();
    const form = useRef();
    const close = useRef();
    const [data,setData] = useState(user);
    const [info, setInfo] = useState({
        username: user.username,
        avatar: user.avatar,
    });

    const [reRender, setRerender] = useState(0);

    const handleClick = () => {
        form.current.style.display = "block";
    }

    const handleClose = () => {
        form.current.style.display = "none";
    }

    const handleSubmit = () => {
        const UrlString = encodeURIComponent(info.avatar);
        axios.get(`http://localhost:9000/user/changeinfo/${user.username}&${info.username}&${UrlString}`)
            .then(res => {
                form.current.style.display = "none";
                setRerender(n => n + 1);
            })
    }

    const handleInput = (e) => {
        setInfo(prev => ({...prev, [e.target.name] : e.target.value}));
    }

    useEffect(() => {
        axios.get(`http://localhost:9000/user/${info.username}`)
            .then(res => {
                const account = JSON.stringify(res.data);
                sessionStorage.setItem("account", account);
                setData(res.data);
            })
    }, [reRender])


    return (
        <>
            <div className="userPage main-content" >  
                <div className="heading">
                    <div className="image" ref={btnChange} onClick={handleClick}>
                        <img src={data.avatar} alt="img" />
                        <i class='bx bx-edit'></i>
                    </div>
                    <h1>{data.username}</h1>
                </div>
            </div>
            <div className="info-form" ref={form}>
                <div className="close-btn" ref={close} onClick={handleClose}>
                    <i className='bx bxs-tag-x'></i>
                </div>

                <div className="head">
                    <h1>CHANGE INFO</h1>
                </div>
                <div className="body">
                    <div className="avatar">
                        <div className="image">
                            <img src={data.avatar} alt="img"/>
                        </div>
                        <input type="text" value={info.avatar} name="avatar" placeholder="Type your image link..." onChange={handleInput} autoComplete="off"/>
                    </div>

                    <div className="username">
                        <div className="header">
                            <label for="name">Input</label>
                            <i className='bx bx-edit-alt'></i>
                        </div>

                        <input type="text" id="name" value={info.username} name="username" placeholder="Type your username..." onChange={handleInput} autoComplete="off"/>
                    </div>
                </div>
                
                <div className="submit-btn">
                    <button onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </>
    );
}

export default User;