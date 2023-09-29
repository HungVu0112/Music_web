import { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import validation from '../Validation/SignupValidation';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import authenCSS from '../css/authen.module.css';
import Alert from '../components/alert';

function SignUp() {
    const [isShow, setIsShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().min(5, 'Must be at least 5 characters long !').max(25, 'Must be under 25 characters long !').required('Please fill in this field !'),
            email: Yup.string().email('Invalid Email !').required('Please fill in this field !'),
            password: Yup.string().min(6, 'Password must be at least 6 characters long !').required('Please fill in this field !'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password doesn't match !").required('Please fill in this field !'),
        }),
        onSubmit: (values) => {
            axios.post('http://localhost:9000/checkSignup', values)
                .then(res => {
                    if (res.data === 'exists') {
                        setShowAlert(true)
                    } else {
                        navigate('/')
                    }
                })
        }
    })

    return (
        <>
            <div className={authenCSS.signup}>
                <section className={authenCSS.bg_img}></section>

                <section className={authenCSS.container}>
                    <div className={authenCSS.side_img}>
                        <img src='img/authen-bg.jpg'/>
                    </div>

                    <div className={authenCSS.form}>
                        <h1>Signup</h1>

                        <form onSubmit={formik.handleSubmit}>
                            <div className={authenCSS.info}>
                                <i className='bx bxs-user'></i>
                                <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Type your username ... ' autoComplete='off'/>
                            </div>
                            {formik.errors.username && formik.touched.username && (<p className={authenCSS.err}>{formik.errors.username}</p>)}

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

                            <div className={authenCSS.info}>
                                <i className='bx bxs-lock-alt'></i>
                                <input type={isShow ? 'text' : 'password'} name='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange} placeholder='Confirm your password ... ' autoComplete='off'/>
                                <div onClick={() => setIsShow(!isShow)} className={authenCSS.show_btn}>
                                    {isShow ? <i className='bx bxs-low-vision' ></i> : <i className='bx bx-show-alt'></i>}
                                </div>
                            </div>
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && (<p className={authenCSS.err}>{formik.errors.confirmPassword}</p>)}

                            <button type='submit' className={authenCSS.submit_btn}>Signup</button>
                        </form>

                        <p className={authenCSS.link}>Already have an account ? <Link to='/' replace={true}>Login</Link> here !</p>
                    </div>
                </section>
            </div>

            <div className={authenCSS.alert_box}>
                {showAlert ? <Alert mes="Account already exists ! Please try again or login !" setShowAlert={setShowAlert}/> : ''}
            </div>
        </>
    )
}

export default SignUp;
