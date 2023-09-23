import axios from 'axios';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import authenCSS from '../css/authen.module.css';
import Alert from '../components/alert';

function Login() {
    const [isShow, setIsShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid Email !').required('Please fill in this field !'),
            password: Yup.string().min(6, 'Password must be at least 6 characters long !').required('Please fill in this field !')
        }),
        onSubmit: (values) => {
            axios.post('http://localhost:9000/checkLogin', values)
                .then(res => {
                    if (res.data === 'not exists') {
                        setShowAlert(true)
                    } else {
                        const account = JSON.stringify(res.data)
                        sessionStorage.setItem("account", account)
                        navigate('/home', { replace: true })
                    }
                })
        }
    });


    return (
        <>
            <div className={authenCSS.login}>
                <section className={authenCSS.bg_img}></section>

                <section className={authenCSS.container}>
                    <div className={authenCSS.side_img}>
                        <img src='img/authen-bg.jpg'/>
                    </div>

                    <div className={authenCSS.form}>
                        <h1>Login</h1>

                        <form onSubmit={formik.handleSubmit}>
                            <div className={authenCSS.info}>
                                <i className='bx bxs-envelope'></i>
                                <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='Type your email ... ' autoComplete='off'/>
                            </div>
                            {formik.errors.email && formik.touched.email && (<p className={authenCSS.err}>{formik.errors.email}</p>)}

                            <div className={authenCSS.info}>
                                <i className='bx bxs-lock-alt'></i>
                                <input type={isShow ? 'text' : 'password'} name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Type your password ... ' autoComplete='off'/>
                                <div onClick={() => setIsShow(!isShow)} className={authenCSS.show_btn}>
                                    {isShow ? <i className='bx bxs-low-vision' ></i> : <i className='bx bx-show-alt'></i>}
                                </div>
                            </div>
                            {formik.errors.password && formik.touched.password && (<p className={authenCSS.err}>{formik.errors.password}</p>)}

                            <button type='submit'>Login</button>
                        </form>

                        <p className={authenCSS.link}>Don't have any account ? <Link to='/signup' replace={true}>Signup</Link> here !</p>
                        
                        <ul>
                            <li><i className='bx bxl-facebook-square'></i></li>
                            <li><i className='bx bxl-instagram-alt' ></i></li>
                            <li><i className='bx bxl-github' ></i></li>
                        </ul>
                    </div>
                </section>
            </div>

            <div className={authenCSS.alert_box}>
                {showAlert ? <Alert mes="Account doesn't exist ! Please try again or signup !" setShowAlert={setShowAlert}/> : ''}
            </div>
        </> 
    )
}

export default Login;