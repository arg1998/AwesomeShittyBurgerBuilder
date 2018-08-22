import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Wrapper from '../../HOC/Wrapper';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.css';
import axios from '../../axios-config-instance';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import { fetchOrdersAsync } from '../../store/actions/exports';
import { connect } from 'react-redux';

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrdersAsync();
    }
    render() {
        let content = (
            <Wrapper>
                {this.props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </Wrapper>
        );
        if (this.props.loading) {
            content = <Spinner />;
        }

        return <div className={classes.Orders}>{content}</div>;
    }
}

const mapStateToProps = newState => ({
    orders: newState.orderReducer.orders,
    loading: newState.orderReducer.loading
});

const mapDispatchToProps = dispatch => ({
    fetchOrdersAsync: () => dispatch(fetchOrdersAsync())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
