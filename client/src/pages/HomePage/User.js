import { useLocation, Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import ChangePasswordValidation from "../../Validation/ChangePasswordValidation";
import axios from 'axios';

function User(){
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const form = useRef();
    const close = useRef();
    const pwForm = useRef();
    const [data,setData] = useState(user)
    const [info, setInfo] = useState({
        username: user.username,
        avatar: user.avatar,
    });
    const [password, setPassword] = useState({
        oldpassword: '',
        newpassword: '',
    });
    const [err, setErr] = useState({});

    const [reRender, setRerender] = useState(0);

    const handleClick = () => {
        form.current.style.display = "block";
    }

    const handleOpen = () => {
        pwForm.current.style.display = "block";
    }

    const handleClose1 = () => {
        form.current.style.display = "none";
    }

    const handleClose2 = () => {
        pwForm.current.style.display = "none";
    }

    const handleSubmit = () => {
        const UrlString = encodeURIComponent(info.avatar);
        axios.get(`http://localhost:9000/user/changeinfo/${user.username}&${info.username}&${UrlString}`)
            .then(res => {
                form.current.style.display = "none";
                setRerender(n => n + 1);
            })
    }

    const handleSubmit2 = () => {
        if (err.oldpassword === '' && err.newpassword === '') {
            axios.get(`http://localhost:9000/user/changepw/${data.username}&${password.newpassword}`)
                .then(res => {
                    pwForm.current.style.display = "none";
                    alert("Password changed!");
                    setRerender(n => n + 1);
                })
        }
    }

    const handleInput = (e) => {
        setInfo(prev => ({...prev, [e.target.name] : e.target.value}));
    }

    const handleInput2 = (e) => {
        setPassword(prev => ({...prev, [e.target.name] : e.target.value}));
    }

    useEffect(() => {
        setErr(ChangePasswordValidation(password, user.password));
    },[password])

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
                    <div className="image" onClick={handleClick}>
                        <img src={data.avatar} alt="img" />
                        <i class='bx bx-edit'></i>
                    </div>
                    <h1>{data.username}</h1>
                </div>
                
                <div className="body">
                    <h1 className="text">Information</h1>
                    <div className="body-info">
                        <h3 className="text">・Username: {data.username}</h3>
                        <h3 className="text">・Email: {data.email}</h3>
                    </div>
                    <button onClick={handleOpen}>Change Password</button>
                </div>

                <div className="navigate">
                    <Link to='/library'>Library</Link>
                    <Link to='/library/recent'>Recent</Link>
                    <Link to='/library/favourite'>Favourite</Link>
                </div>
            </div>

            <div className="info-form" ref={form}>
                <div className="close-btn" ref={close} onClick={handleClose1}>
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
                            <label htmlFor="name">Name</label>
                            <i className='bx bx-edit-alt'></i>
                        </div>

                        <input type="text" id="name" value={info.username} name="username" placeholder="Type your username..." onChange={handleInput} autoComplete="off"/>
                    </div>
                </div>
                
                <div className="submit-btn">
                    <button onClick={handleSubmit}>Save</button>
                </div>
            </div>

            <div className="change-password-form" ref={pwForm}>
                <div className="close-btn" ref={close} onClick={handleClose2}>
                    <i className='bx bxs-tag-x'></i>
                </div>

                <div className="head">
                    <h1>CHANGE PASSWORD</h1>
                </div>
                
                <div className="body">
                    <div className="image">
                        <i className='bx bxs-lock-open-alt'></i>
                    </div>

                    <div className="main">
                        <label htmlFor="op">Old Password</label>
                        <input type="password" placeholder="Type your old password ..." name="oldpassword" id="op" onChange={handleInput2}/>
                        {err.oldpassword && <p style={{color : "red"}}>* {err.oldpassword}</p>}

                        <label htmlFor="np">New Password</label>
                        <input type="password" placeholder="Type your new password ..." name="newpassword" id="np" onChange={handleInput2}/>
                        {err.newpassword && <p style={{color : "red"}}>* {err.newpassword}</p>}

                    </div>
                </div>
                <div className="submit-btn">
                    <button onClick={handleSubmit2}>Save</button>
                </div>
            </div>
        </>
    );
}

export default User;