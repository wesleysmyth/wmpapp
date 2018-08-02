import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Feedback from '../components/Feedback';
import SignupForm from '../components/forms/SignupForm';
import LoginForm from '../components/forms/LoginForm';
import { login, logout } from '../redux/actions/teacher';
import { signup } from '../redux/actions/teacher';

class SignupLoginContainer extends Component {
    constructor(props) {
        super(props)
        this.state = this.getDefaultState(props);
    }

    componentWillReceiveProps({ teacher, feedback }) {
        if((teacher && teacher.id) && localStorage.getItem('token')) {
            this.setState({ redirectToReferrer: true })
        }

        if (feedback && feedback.type) {
            this.setState({ showFeedback: true });
        }
    }

    getDefaultState (props) {
        const { form } = this.props;
        const state = {
            redirectToReferrer: false,
            showFeedback: false
        };

        return { ...state, ...form };
    }

    onChange(ev, key) {
        this.setState({ [ key ]: ev.target.value});
    }

    onSubmit() {
        const { form } = this.props;
        const action = this.props[ form ];
        const data = this.state;
        action(data);
    }

    render() {
        const{ form, teacher, feedback, location } = this.props;
        const { redirectToReferrer, showFeedback } = this.state;
        const { from } = location && location.state || { from: { pathname: '/profile/overview' } };
        const Form = form === 'login' ? LoginForm : SignupForm;

        if (redirectToReferrer === true || teacher.id) {
            return ( <Redirect to={from} /> );
        }

        return(
            <div className='login-signup-form'>
                <div className='form-container'>
                    <Form onChange={this.onChange.bind(this)} />
                    <Button
                        className='large-custom-btn'
                        size='large'
                        onClick={()=>this.onSubmit()}>{form.toUpperCase()}</Button>
                    { showFeedback && (feedback && feedback.type)
                        ? <Feedback {...feedback} />
                        : null }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ teacher, feedback }) => {
    return {
        teacher,
        feedback
    }
}

export default connect(mapStateToProps, { login, signup })(SignupLoginContainer);