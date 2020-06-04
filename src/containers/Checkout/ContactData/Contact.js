import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from '../ContactData/ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/action/index'
class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    option: [
                        { value: 'fastest', displayValue: 'Fatest' },
                        { value: 'cheapest', displayValue: 'cheapest' }

                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,


            }



        },
        formIsValid: false,


    }
    orderHandler = (event) => {
        console.log(this.props.ingredients)
        event.preventDefault()
        alert('you can continue')

        const formdata = {}
        for (let formEl in this.state.orderForm) {
            formdata[formEl] = this.state.orderForm[formEl].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formdata,
            userId: this.props.userId



        }

        this.props.onOrderBurger(order, this.props.token)
    }


    inputchangedHandler = (event, inputIdentifier) => {
        const updatedForm = { ...this.state.orderForm }
        //property
        const updatedFormEl = { ...updatedForm[inputIdentifier] }

        updatedFormEl.value = event.target.value
        //checkavaila mai value pass kar rahai hai and rules
        updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation)
        updatedFormEl.touched = true
        console.log(updatedFormEl.validation)
        updatedForm[inputIdentifier] = updatedFormEl
        console.log(updatedFormEl)


        let formIsValid = true;
        for (let inputId in updatedForm) {
            formIsValid = updatedForm[inputId].valid && formIsValid
        }
        this.setState({ orderForm: updatedForm, formIsValid: formIsValid })

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
    render() {
        const FormElementArr = [];
        for (let key in this.state.orderForm) {
            FormElementArr.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>

                {FormElementArr.map(formel => (
                    <Input key={formel.id} elementType={formel.config.elementType}
                        elementConfig={formel.config.elementConfig}
                        value={formel.config.value}
                        invalid={!formel.config.valid}
                        shouldValidate={formel.config.validation}
                        touched={formel.config.touched}
                        changed={(event) => this.inputchangedHandler(event, formel.id)}
                    ></Input>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}

            </div>




        )


    }


}

const matchStateToProps = state => {
    return {
        ings: state.BurgerBuilder.ingredients,
        price: state.BurgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId

    }
}


const matchDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }


}




export default connect(matchStateToProps, matchDispatchToProps)(withErrorHandler(ContactData, axios))