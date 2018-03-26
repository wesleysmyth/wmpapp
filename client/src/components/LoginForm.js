import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';
import { login, logout } from '../redux/actions/class';


// passes match and history to component
import { withRouter } from 'react-router-dom';

// const AuthButton = withRouter(({ history }) => (
//     props.auth === true
//     ? <button
//         onClick={() => {
//             logout()
//             .then(() => history.push('/'))
//         }}>LOGOUT</button>
//     : <button>LOGIN</button>
// ));


class Login extends Component {
    state = {
        redirectToReferrer: false,
        email: '',
        password: '',
    }

    onChange = (ev, key) => this.setState({ [key]: ev.target.value })

    onSubmit = () => {
        this.props.login({email: this.state.email, password: this.state.password})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth === true && localStorage.getItem('token')) {
            this.setState({redirectToReferrer: true })
        }
    }

    render() {
        const { redirectToReferrer } = this.state;
        const { from } = this.props.location && this.props.location.state || { from: { pathname: '/profile' }};

        if (redirectToReferrer === true || this.props.auth === true) {
            return (
                <Redirect
                    to={from} />
            )
        }

        return (
            <div className='login-form'>

                <div className='form-row'>
                    <input
                        placeholder='USERNAME!!'
                        name='email'
                        onChange={(ev) => this.onChange(ev, 'email')}/>
                </div>
                <div className='form-row'>
                    <input
                        placeholder='PASSWORD'
                        name='password'
                        type='password'
                        onChange={(ev) => this.onChange(ev, 'password')}/>
                </div>
                <Button
                    className='signup-login-btn'
                    size='large'
                    onClick={this.onSubmit}>LOGIN</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { login })(Login);