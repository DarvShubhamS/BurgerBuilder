import React, { Component } from "react";
import * as actionTypes from '../../../store/action/index'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionTypes.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)