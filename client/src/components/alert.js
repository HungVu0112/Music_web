import React from 'react'
import alertCSS from '../css/alert.module.css'

const Alert = ({ mes, setShowAlert }) => {
    const handleClose = () => {
        setShowAlert(false)
    }

    return (
        <>
            <div class={`${alertCSS.alert} ${alertCSS.alert_warning}`}>
                <div class={alertCSS.icon__wrapper}>
                    <i className='bx bxs-error'></i>
                </div>
                <p>{mes}</p>
                <i className={`bx bx-x ${alertCSS.close}`} onClick={handleClose}></i>
            </div>
        </>
    )
}

export default Alert