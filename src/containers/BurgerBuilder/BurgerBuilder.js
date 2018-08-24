import React, { Component } from 'react';
import Wrapper from '../../HOC/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControl/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-config-instance';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import {
    addIngredient,
    removeIngredient,
    fetchIngredientAsync,
    purchaseInit
} from '../../store/actions/exports';

class Burgeruilder extends Component {
    state = {
        canPurchase: false, // can purcahse the burger or not?
        purchasing: false // does user clicker the ORDER button?
    };

    componentDidMount() {
        this.props.initIngredients();
    }

    updateCanPurchaseState() {
        const sum = Object.keys(this.props.ingredients)
            .map(ingKey => this.props.ingredients[ingKey])
            .reduce((_sum, current) => _sum + current, 0);
        return sum > 0;
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };
    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    };

    render() {
        if (this.props.error) {
            return <p> can not load ingredients </p>;
        } else if (this.props.loading) {
            return <Spinner />;
        }
        //find which component should be disabled depending to ingredients quantity
        // { meat: true, salad: false}
        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let buildControls = (
            <BuildControls
                ingredientAdded={this.props.onAddIng}
                ingredientRemoved={this.props.onDelIng}
                disabled={disabledInfo}
                price={this.props.totalPrice}
                initPurchase={this.purchaseHandler}
                canPurchase={this.updateCanPurchaseState()}
            />
        );

        if (!this.props.isLoggedIn) {
            buildControls = (
                <p
                    style={{
                        textAlign: 'center',
                        border: '1px #ccc solid',
                        width: '60%',
                        height: '60%',
                        margin: '0 auto',
                        padding: '20px'
                    }}>
                    You Must Sign In to Order a Burger
                </p>
            );
        }

        return (
            <Wrapper>
                <Modal
                    modalClosed={this.purchaseCancelHandler}
                    show={this.state.purchasing}>
                    <OrderSummary
                        cancelPurchase={this.purchaseCancelHandler}
                        continuePurchase={this.purchaseContinueHandler}
                        ingredients={this.props.ingredients}
                        price={this.props.totalPrice.toFixed(2)}
                    />
                </Modal>

                <Burger ingredients={this.props.ingredients} />
                {buildControls}
            </Wrapper>
        );
    }
}

const mapStateToProps = newState => ({
    ingredients: newState.burgerBiulderReducer.ingredients,
    totalPrice: newState.burgerBiulderReducer.totalPrice,
    error: newState.burgerBiulderReducer.error,
    loading: newState.burgerBiulderReducer.loading,
    isLoggedIn: !!newState.authReducer.token
});

const mapDispatchToProps = dispatch => ({
    onAddIng: ingName => dispatch(addIngredient(ingName)),
    onDelIng: ingName => dispatch(removeIngredient(ingName)),
    initIngredients: () => dispatch(fetchIngredientAsync()),
    onPurchaseInit: () => dispatch(purchaseInit())
});

// export default Burgeruilder;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Burgeruilder, axios));
