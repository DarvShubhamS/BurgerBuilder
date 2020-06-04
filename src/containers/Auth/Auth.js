import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../../store/action/index'
class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    IsEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        ISignUp: true
    }

    inputchangedHandler = (event, PropertyNameId) => {
        const updatedState = {
            ...this.state.controls,
            [PropertyNameId]: {
                ...this.state.controls[PropertyNameId],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[PropertyNameId].validation),
                touched: true
            }

        }

        this.setState({ controls: updatedState })


    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirect !== '/') {
            this.props.onsetAuth()
        }
    }


    checkValidity(value, rule) {
        let Isvalid = true;

        if (!rule) {
            return true
        }
        if (rule.required) {
            Isvalid = value.trim() !== '' && Isvalid
        }

        if (rule.minLength) {

            Isvalid = value.length >= rule.minLength && Isvalid
        }

        if (rule.maxLength) {
            Isvalid = value.length <= rule.maxLength && Isvalid
        }



        return Isvalid
    }
    submithandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.ISignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                ISignUp: !prevState.ISignUp
            }
        })
    }
    render() {
        const formElArray = []
        for (let key in this.state.controls) {
            formElArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElArray.map(el => (
            <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={(event) => this.inputchangedHandler(event, el.id)}

            >

            </Input >


        ))
        if (this.props.loading) {
            form = <Spinner></Spinner>
        }
        let errMsg = null
        if (this.props.error) {
            errMsg = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRediret = null
        if (this.props.isAuthenticated) {
            authRediret = <Redirect to={this.props.authRedirect}></Redirect>
        }
        return (
            <div className={classes.Auth}>
                {authRediret}
                {errMsg}
                <form onSubmit={this.submithandler}>
                    {form}
                    <Button btnType="Success">
                        SUBMIT
                    </Button>

                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">
                    SWITCH TO {this.state.ISignUp ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.BurgerBuilder.building,
        authRedirect: state.auth.authRedirect
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, ISignUp) => dispatch(action.auth(email, password, ISignUp)),
        onsetAuth: () => dispatch(action.setAuthRedirect('/'))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth)