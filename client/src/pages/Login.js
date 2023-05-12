import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from '../Validation/LoginValidation';
import axios from 'axios';

function Login() {
    let navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [err, setErr] = useState({});

    const handleInput = (e) => {
        setData(prev => ({...prev, [e.target.name] : e.target.value}));
        setErr(validation(data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (err.name === '' && err.email === '' && err.password === '') {
            axios.post('http://localhost:9000/checkLogin', data)
            .then(res => {
                if (res.data === 'not exists') {
                    alert('Account does not exist ! Please signup !');
                }
                else {
                    const account = JSON.stringify(res.data)
                    sessionStorage.setItem("account", account);
                    navigate('/home', { replace: true });
                }
            })
            .catch(err => { console.log(err) })
        }
    }

    return (
        <div className='login'>
            <div className='form'>
                <div className='form-header'>
                    <div className="website-logo">
                        <img src="https://cdn0.iconfinder.com/data/icons/internet-2020/1080/Applemusicandroid-512.png"/>
                    </div>
                    Login
                </div>
            
                <div className='form-body'>
                    <form method="POST">
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input type="email" onChange={handleInput}  placeholder="Enter Email" name="email" id="email" autoComplete='off' />
                            {err.email && <span className='err-message'>* {err.email}</span> }
                        </div>
                        
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input type="password" onChange={handleInput} placeholder ="Enter Password" name="password" id="password" autoComplete='off' />
                            {err.password && <span className='err-message'>* {err.password}</span> }
                        </div>
                        <button type="submit" onClick={handleSubmit}>Login</button>
                    </form>

                    <p>Don't have an account ? <Link to='/signup' replace={true}>Sign Up </Link> here</p>
                 </div>
            </div>
        </div>
    );
}

export default Login;