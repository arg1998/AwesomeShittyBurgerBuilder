import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import calsses from './ContactData.css';
import axios from '../../../axios-config-instance';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import _ from 'lodash';
import { connect } from 'react-redux';
import { purchaseBurger } from '../../../store/actions/exports';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Name Here'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Street Here'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Postal Code Here'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Country Here'
                },
                value: 'Fucking Iran',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your Email Address Here'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayText: 'Fastest Way' },
                        { value: 'cheapest', displayText: 'Cheapest Way' }
                    ]
                },
                value: 'cheapest',
                validation: {},
                valid: true
            }
        },
        isFormValid: false
    };

    orderHndler = event => {
        event.preventDefault(); // stop refreshing the page causing by form submission
        const contactData = {};
        for (let key in this.state.orderForm) {
            contactData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            contactData
        };

        this.props.onPurchaseBurger(order);
    };

    checkValidity(value, rules) {
        let isValid = false;

        if (!_.isEmpty(rules)) {
            if (rules.required) {
                isValid = value.trim() !== '';
            }
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid;
            }
            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid;
            }
            return isValid;
        }
        return true;
    }

    inputChangedHandler = (event, key) => {
        const updatedFormOrder = _.cloneDeep(this.state.orderForm);
        updatedFormOrder[key].value = event.target.value;
        updatedFormOrder[key].touched = true;
        updatedFormOrder[key].valid = this.checkValidity(
            updatedFormOrder[key].value,
            updatedFormOrder[key].validation
        );

        let isFormValid = true;
        for (const key in updatedFormOrder) {
            isFormValid = updatedFormOrder[key].valid && isFormValid;
            // console.log(`${key} : ${updatedFormOrder[key].valid}`);
        }

        this.setState({
            orderForm: updatedFormOrder,
            isFormValid: isFormValid
        });
    };

    render() {
        let formElements = [];
        for (let key in this.state.orderForm) {
            const inp = this.state.orderForm[key];
            formElements.push(
                <Input
                    onChange={event => this.inputChangedHandler(event, key)}
                    key={key}
                    shouldValidate={inp.validation}
                    valid={inp.valid}
                    touched={inp.touched}
                    elementType={inp.elementType}
                    elementConfig={{ ...inp.elementConfig }}
                    value={inp.value}
                />
            );
        }

        let form = (
            <form onSubmit={this.orderHndler}>
                {formElements}
                <Button disabled={!this.state.isFormValid} btnType="Success">
                    Order
                </Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={calsses.ContactData}>
                <h4>Enter your contact data </h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = newState => ({
    ingredients: newState.burgerBiulderReducer.ingredients,
    totalPrice: newState.burgerBiulderReducer.totalPrice,
    loading: newState.orderReducer.loading
});

const mapDispatchToProps = dispatch => ({
    onPurchaseBurger: orderData => dispatch(purchaseBurger(orderData))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(ContactData, axios));
