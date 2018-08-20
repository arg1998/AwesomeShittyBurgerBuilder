import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Wrapper from '../../HOC/Wrapper';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.css';
import axios from '../../axios-config-instance';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios
            .get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }
    render() {
        let content = (
            <Wrapper>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </Wrapper>
        );
        if (this.state.loading) {
            content = <Spinner />;
        }

        return <div className={classes.Orders}>{content}</div>;
    }
}

export default withErrorHandler(Orders, axios);
