import React, { Component } from 'react';
import Wrapper from '../../HOC/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControl/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-config-instance';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    bacon: 0.9,
    cheese: 0.7,
    meat: 1.5,
    salad: 0.3
};

class Burgeruilder extends Component {
    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0
        },
        totalPrice: 3,
        canPurchase: false, // can purcahse the burger or not?
        purchasing: false, // does user clicker the ORDER button?
        loading: false // is modal in loading state?
    };

    updateCanPurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => ingredients[ingKey])
            .reduce((_sum, current) => _sum + current, 0);

        this.setState({ canPurchase: sum > 0 });
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        const newIngs = { ...this.state.ingredients };
        newIngs[type] = oldCount + 1;
        this.setState({
            ingredients: { ...newIngs },
            totalPrice: oldPrice + INGREDIENT_PRICES[type]
        });
        this.updateCanPurchaseState(newIngs);
    };

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) return;
        const oldPrice = this.state.totalPrice;
        const newIngs = { ...this.state.ingredients };
        newIngs[type] = oldCount - 1;
        this.setState({
            ingredients: { ...newIngs },
            totalPrice: oldPrice - INGREDIENT_PRICES[type]
        });
        this.updateCanPurchaseState(newIngs);
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };
    purchaseContinueHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
            customer: {
                name: 'Amir Reza',
                address: {
                    street: 'mission 1',
                    zipCode: 8585
                },
                email: 'amir@amir.com',
                delivetyMethod: 'fastest'
            }
        };

        axios
            .post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false, purchasing: false });
                console.log(res);
            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false });
                console.log(err);
            });
        this.setState({ loading: true });
    };

    render() {
        //find which component should be disabled depending to ingredients quantity
        // { meat: true, salad: false}
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let modalContent = (
            <OrderSummary
                cancelPurchase={this.purchaseCancelHandler}
                continuePurchase={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice.toFixed(2)}
            />
        );

        if (this.state.loading) {
            modalContent = <Spinner />;
        }

        return (
            <Wrapper>
                <Modal
                    modalClosed={this.purchaseCancelHandler}
                    show={this.state.purchasing}>
                    {modalContent}
                </Modal>

                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    initPurchase={this.purchaseHandler}
                    canPurchase={this.state.canPurchase}
                />
            </Wrapper>
        );
    }
}

// export default Burgeruilder;
export default withErrorHandler(Burgeruilder, axios);
