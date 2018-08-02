import React, { Component } from 'react';
import Header from '../Header';
import Login from '../Login';
import Signup from '../Signup';
import Feedback from '../Feedback';

class SignupOrLogin extends Component {

    state = { form: 'login' }

    toggleForm = (form) => this.setState({ form })

    getActiveClass = (item) => this.state.form === item ? 'active-main' : '';

    render() {
        const { form } = this.state;
        const { history, feedback } = this.props;
        const Form = form === 'login' ? Login : Signup;

        return (
            <div className='login-signup page-content'>
                <Header history={history} />
                <div className='login-signup-container'>
                    <div className='signup-login-tabs'>
                        <div
                            className={`login-tab ${this.getActiveClass('login')}`}
                            onClick={()=> this.toggleForm('login')}>
                            <h3>LOGIN</h3>
                        </div>
                        <div
                            className={`signup-tab ${this.getActiveClass('signup')}`}
                            onClick={()=> this.toggleForm('signup')}>
                            <h3>SIGNUP</h3>
                        </div>
                    </div>
                    <Form history={history} />
                </div>
                <Feedback {...feedback} />
            </div>
        );
    };
};

export default SignupOrLogin;
