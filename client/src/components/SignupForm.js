import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';

import { createClassProfile } from '../redux/actions/session';

class Signup extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    onChange = (ev, key) => this.setState({[key]: ev.target.value})

    onSubmit = () => {
        const data = this.state;
        this.props.createClassProfile(data);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth === true && localStorage.getItem('token')) {
            this.props.history.push('/profile')
        }
    }


    render() {
        return (
            <div className='signup-form'>
                <div className='form-row'>
                    <input
                        placeholder='FIRST NAME'
                        name='firstname'
                        onChange={(ev)=>this.onChange(ev, 'firstName')}/>
                </div>
                <div className='form-row'>
                    <input
                        placeholder='LAST NAME'
                        name='lastname'
                        onChange={(ev) => this.onChange(ev, 'lastName')}/>
                </div>
                <div className='form-row'>
                    <input
                        placeholder='EMAIL'
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
                <div className='form-row'>
                    <input
                        placeholder='CONFIRM PASSWORD'
                        name='confirmpassword'
                        type='password'
                        onChange={(ev) => this.onChange(ev, 'confirmPassword')}/>
                </div>
                <Button
                    className='signup-login-btn'
                    size='large'
                    onClick={()=>this.onSubmit()}>SIGN UP</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { createClassProfile })(Signup);
