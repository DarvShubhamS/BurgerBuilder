import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItems/NavigationItem'
const navigation = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact >Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders"> Orders</NavigationItem> : null}
            {
                !props.isAuthenticated ?
                    <NavigationItem link="/auth">Authenticate</NavigationItem>
                    :
                    <NavigationItem link="/Logout">Logout</NavigationItem>

            }
        </ul >
    )
}
export default navigation