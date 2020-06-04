import React from 'react'
import img from '../../assets/images/original.png'
import classes from './Log.module.css'
const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={img} alt="BurgerImage" />
    </div>
)

export default logo