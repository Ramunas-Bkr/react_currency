import React from 'react'
import logo from '../img/logo.svg'
import classes from './Logo.module.css'

const Logo = () => {
    return (
        <div>
            <img src={logo} className={classes.AppLogo} alt="logo" /> 
        </div>
    )
}

export default Logo
