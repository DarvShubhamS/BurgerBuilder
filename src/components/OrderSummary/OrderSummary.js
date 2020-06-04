import React, { Component } from 'react'
import Aux from '../../hoc/Auxillary';
import Button from '../UI/Button/Button'
class OrderSummary extends Component {
    // componentWillUpdate() {
    //     console.log('Order summary will update')
    // }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igkey => {
                return (<li key={igkey}>{igkey}: <span
                    style={{ textTransform: 'capitalize' }}> {this.props.ingredients[igkey]}</span></li>)
            })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A
delicious Burger</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>

            </Aux>
        )
    }

};

export default OrderSummary