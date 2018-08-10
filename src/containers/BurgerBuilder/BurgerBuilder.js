import React, { Component } from 'react';
import Wrapper from '../../HOC/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControl/BuildControls';

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
        totalPrice: 3
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        const newIngs = { ...this.state.ingredients }
        newIngs[type] = oldCount + 1
        this.setState({
            ingredients: { ...newIngs },
            totalPrice: oldPrice + INGREDIENT_PRICES[type]
        })
    }

    removeIngredientHandler = (type) => {

    }

    render() {
        return (
            <Wrapper>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler} />

            </Wrapper>
        );
    }
}


export default Burgeruilder;


