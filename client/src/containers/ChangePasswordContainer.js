import React from 'react';
import { connect } from 'react-redux';
import FormContainer from './FormContainer';
import Feedback from '../components/Feedback';
import { changePassword } from '../redux/actions/teacher';
import { Input } from '../components/profile/Input';
import CustomButton from '../components/CustomButton';

const ChangePasswordButton = CustomButton({ name: 'Change Password' });
const inputs = [
    {
        label: 'Current password',
        type: 'password',
        name: 'oldPassword'
    },
    {
        label: 'New password',
        type: 'password',
        name: 'password'
    },
    {
        label: 'Confirm password',
        type: 'password',
        name: 'confirmPassword'
    }
];

const Form = FormContainer({ Input, CustomButton: ChangePasswordButton });

const ResetPassword = ({ changePassword, feedback }) => {
    const onSubmit = (passwords) => changePassword(passwords)

    return (
        <div>
            <p>Password must be at least 8 characters long.</p>
            <Form onSubmit={onSubmit} inputs={inputs} />
            <Feedback {...feedback} />
        </div>
    );
}

const mapStateToProps = ({ feedback }) => {
    return { feedback }
}


export default connect(mapStateToProps, { changePassword })(ResetPassword);