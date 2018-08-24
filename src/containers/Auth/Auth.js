import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import validator from 'validator';
import _ from 'lodash';
import classes from './Auth.css';
import { connect } from 'react-redux';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../axios-config-instance';
import { authenticateAsync } from '../../store/actions/exports';
import Spinner from '../../components/UI/Spinner/Spinner';
import Wrapper from '../../HOC/Wrapper';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    // handling local state and UI
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isFormValid: false,
        isLoggingIn: false
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
            if (rules.isEmail) {
                isValid = validator.isEmail(value) && isValid;
            }
            return isValid;
        }
        return true;
    }

    inputChangedHandler = (event, key) => {
        const updatedFormOrder = _.cloneDeep(this.state.controls);
        updatedFormOrder[key].value = event.target.value;
        updatedFormOrder[key].touched = true;
        updatedFormOrder[key].valid = this.checkValidity(
            updatedFormOrder[key].value,
            updatedFormOrder[key].validation
        );

        let isFormValid = true;
        for (const key in updatedFormOrder) {
            isFormValid = updatedFormOrder[key].valid && isFormValid;
        }

        this.setState({
            controls: updatedFormOrder,
            isFormValid: isFormValid
        });
    };

    onFormSubmitted = event => {
        event.preventDefault();
        this.props.authenticateAsync(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isLoggingIn
        );
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => ({
            isLoggingIn: !prevState.isLoggingIn
        }));
    };

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />;
        }

        let formElements = [];
        for (let key in this.state.controls) {
            const inp = this.state.controls[key];
            formElements.push(
                <Input
                    onChange={event => this.inputChangedHandler(event, key)}
                    key={key}
                    shouldValidate={!!inp.validation}
                    valid={inp.valid}
                    touched={inp.touched}
                    elementType={inp.elementType}
                    elementConfig={{ ...inp.elementConfig }}
                    value={inp.value}
                />
            );
        }

        let form = (
            <Wrapper>
                <form onSubmit={this.onFormSubmitted}>
                    {formElements}
                    <Button
                        disabled={!this.state.isFormValid}
                        btnType="Success">
                        {this.state.isLoggingIn ? 'SIGN IN' : 'SIGN UP'}
                    </Button>
                </form>

                <Button onClick={this.switchAuthModeHandler} btnType="Danger">
                    Switch To {this.state.isLoggingIn ? 'SIGN UP' : 'SIGN IN'}
                </Button>
            </Wrapper>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{ textTransform: 'capitalize' }}>
                    {this.props.error.message.replace('_', ' ')}
                </p>
            );
        }

        return (
            <div className={classes.Auth}>
                {form}
                {errorMessage}
            </div>
        );
    }
}

const mapStateToProps = newState => ({
    loading: newState.authReducer.loading,
    error: newState.authReducer.error,
    isLoggedIn: !!newState.authReducer.token
});

const mapDispatchToProps = dispatch => ({
    authenticateAsync: (email, password, isLoggingIn) =>
        dispatch(authenticateAsync(email, password, isLoggingIn))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Auth, axios));
