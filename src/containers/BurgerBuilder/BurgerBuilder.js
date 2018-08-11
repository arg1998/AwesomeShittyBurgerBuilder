import React, { Component } from 'react';
import Wrapper from '../../HOC/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControl/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

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
        canPurchase: false
    };


    updateCanPurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => ingredients[ingKey])
            .reduce((_sum, current) => _sum + current, 0);

        this.setState({ canPurchase: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        const newIngs = { ...this.state.ingredients }
        newIngs[type] = oldCount + 1
        this.setState({
            ingredients: { ...newIngs },
            totalPrice: oldPrice + INGREDIENT_PRICES[type]
        })
        this.updateCanPurchaseState(newIngs);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) return;
        const oldPrice = this.state.totalPrice;
        const newIngs = { ...this.state.ingredients }
        newIngs[type] = oldCount - 1
        this.setState({
            ingredients: { ...newIngs },
            totalPrice: oldPrice - INGREDIENT_PRICES[type]
        })
        this.updateCanPurchaseState(newIngs);
    }

    render() {
        //find which component should be disabled depending to ingredients quantity
        // { meat: true, salad: false}
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Wrapper>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    canPurchase={this.state.canPurchase} />

            </Wrapper>
        );
    }
}


export default Burgeruilder;


