import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContacData from '../../containers/Checkout/ContactData/Contact'
import { connect } from 'react-redux'
class Checkout extends Component {



    checkoutCancelled = () => {
        this.props.history.goBack();

    }

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data')

    }
    render() {
        let summary = <Redirect to="/"></Redirect>

        if (this.props.ings) {
            const purchasedRediret = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRediret}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinue={this.checkoutContinue}

                    ></CheckoutSummary >
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContacData}
                    />
                </div>


            )
        }
        return (
            <div>
                {summary}

            </div >

        )


    }


}

const matchStateToProps = state => {
    return {
        ings: state.BurgerBuilder.ingredients,
        purchased: state.order.purchased

    }
}



export default connect(matchStateToProps)(Checkout)