import React, { Component } from "react";
import Wrapper from "../../HOC/Wrapper";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControl/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
        purchasing: false // does user clicker the ORDER button?
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
    purchaseContinueHandler = () => {};

    render() {
        //find which component should be disabled depending to ingredients quantity
        // { meat: true, salad: false}
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Wrapper>
                <Modal
                    modalClosed={this.purchaseCancelHandler}
                    show={this.state.purchasing}>
                    <OrderSummary
                        cancelPurchase={this.purchaseCancelHandler}
                        continuePurchase={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice.toFixed(2)}
                    />
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

export default Burgeruilder;
