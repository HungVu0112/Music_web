import { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import validation from '../Validation/SignupValidation';
import axios from 'axios';

function SignUp() {
    let navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
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
        
        if (err.name === '' && err.username === '' && err.email === '' && err.password === '') {
            axios.post('http://localhost:9000/checkSignup', data)
            .then(res => {
                if (res.data === 'exists') {
                    alert('Account already exists ! Please login !');
                }
                else {
                    navigate('/');
                }
            })
            .catch(err => { console.log(err) })
        }
    }

    return (
        <div className='signup'>
            <div className='form'>
                <div className='form-header'>
                    <i class='bx bxs-music'></i>
                    Signup
                </div>
                
                <div className='form-body'>
                    <form method="POST">
                        <div>
                            <label htmlFor="username" >Username</label>
                            <input type="text" onChange={handleInput}  placeholder="Enter Username" name="username" id="username" autoComplete='off' />
                            {err.username && <span className='err-message'>* {err.username}</span>}
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={handleInput}  placeholder="Enter Email" name="email" id="email" autoComplete='off' />
                            {err.email && <span className='err-message'>* {err.email}</span>}
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={handleInput} placeholder="Enter Password" name="password" id="password" autoComplete='off' />
                            {err.password && <span className='err-message'>* {err.password}</span>}
                        </div>

                        <button type="submit" onClick={handleSubmit} >Sign Up</button>
                    </form>

                    <p>Already have an account ? <Link to='/' replace={true} >Login </Link> here</p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
