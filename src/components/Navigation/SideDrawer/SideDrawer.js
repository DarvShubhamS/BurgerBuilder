import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItem/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxillary'
const sideDrawer = (props) => {
    let Attachedclasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        Attachedclasses = [classes.SideDrawer, classes.Open]
    }



    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={Attachedclasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>

                    <Logo></Logo>

                </div>

                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
                </nav>
            </div>
        </Aux>
    )
}
export default sideDrawer