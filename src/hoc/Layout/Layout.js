import React, { Component } from 'react';
import Aux from '../Auxillary'
import { connect } from 'react-redux'
import classes from '../Layout/Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
class Layout extends Component {
    state = {
        showSide: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSide: this.props.visible })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSide: !prevState.showSide }
        })
    }
    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}



                ></Toolbar>
                <SideDrawer open={this.state.showSide} closed={this.sideDrawerClosedHandler}></SideDrawer>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux >
        )


    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);