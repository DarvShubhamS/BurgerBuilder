import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger'
import BuildContols from '../../components/Burger/BuilControls/BuildControls.js'
import Modal from '../../components/UI/Modal/Modal'
import Summary from '../../components/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as BurgerBuilderActions from '../../store/action/index'

export class BurgerBuilder extends Component {

    state = {



        purchasing: false,

    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        }
        else {
            this.props.onSetAuthRedirect('/checkout')
            this.props.history.push('/auth')
        }

    }

    componentDidMount() {
        this.props.initIngs()

    }
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey];
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        return sum > 0

        // this.setState({ purchasable: sum > 0 })
    }
    // addIngredientsHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedcount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedcount;
    //     const priceAddition = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientsHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedcount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedcount;
    //     const priceDeduction = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString = queryParams.join('&');
        this.props.history.push(
            //     pathname: '/checkout',
            //     search: '?' + queryString
            // } )
            '/checkout'
        )

    }
    render() {
        const disableInfo = {
            ...this.props.ings
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let OrderSummary = null;



        let burger = this.props.error ? <p>Cant be loaded</p> : <Spinner></Spinner>
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildContols
                        ingredientAdded={this.props.ingredientAdded}
                        ingredientRemoved={this.props.ingredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchaseHandler} />
                </Aux>
            )
            OrderSummary = <Summary ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            ></Summary>


        }





        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelGandler}>
                    {OrderSummary}
                </Modal>
                {burger}
                <div>

                </div>
            </Aux >
        )
    }
}

const matchStateToProps = state => {
    return {
        ings: state.BurgerBuilder.ingredients,
        price: state.BurgerBuilder.totalPrice,
        error: state.BurgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const matchDispatchToProps = dispatch => {
    return {
        ingredientAdded: (ingName) => dispatch(BurgerBuilderActions.addIngredient(ingName)),
        ingredientRemoved: (ingName) => dispatch(BurgerBuilderActions.removeIngredient(ingName)),
        initIngs: () => dispatch(BurgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(BurgerBuilderActions.purchaseInit()),
        onSetAuthRedirect: (path) => dispatch(BurgerBuilderActions.setAuthRedirect(path))
    }
}



export default connect(matchStateToProps, matchDispatchToProps)(withErrorHandler(BurgerBuilder, axios));


