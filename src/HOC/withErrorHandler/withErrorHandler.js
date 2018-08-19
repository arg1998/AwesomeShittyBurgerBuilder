import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Wrapper from '../Wrapper';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };
        interceptors = {};

        componentWillMount() {
            this.interceptors.req = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.interceptors.res = axios.interceptors.response.use(
                res => res,
                error => {
                    this.setState({ error });
                }
            );
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.interceptors.req);
            axios.interceptors.response.eject(this.interceptors.res);
        }

        //used if we clicked on backdrop
        errorConfirmedHandler = () => {
            this.setState({ error: null });
        };
        render() {
            return (
                <Wrapper>
                    <Modal
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Wrapper>
            );
        }
    };
};

export default withErrorHandler;
