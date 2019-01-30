import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {BwmInput} from '../shared/form/BwmInput'
import { BwmResError } from '../shared/form/BwmResError'


const RegisterForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid, errors  } = props
    return (
        <form onSubmit={handleSubmit(submitCb)}>
                    <Field
                        name="username"
                        component="input"
                        type="text"
                        label="Username"
                        className="form-control"
                        component={BwmInput}
                    />
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        label="Email"
                        className="form-control"
                        component={BwmInput}
                    />
                    <Field
                        name="password"
                        component="input"
                         type="password"
                        label="Password"
                        className="form-control"
                        component={BwmInput}
                    />
                    <Field
                        name="passwordConfirmation"
                        component="input"
                        label="Password Confirmation"
                        type="password"
                        className="form-control"
                        component={BwmInput}
                    />
        <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
            Submit
        </button>
            <BwmResError errors={errors}/>
        </form>
    )
}

const validate = values => {
    const errors = {}
    if (values.username && values.username.length < 3) {
        errors.username = 'Username min length is 4 chars'
    } 
    if (!values.email) {
        errors.email = 'Enter your email'
    } 
    if (!values.passwordConfirmation) {
        errors.password = 'Enter your Password'
    } 
    if (values.password !== values.passwordConfirmation) {
        errors.password = 'Password must match'
    } 
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

export default reduxForm({
    form: 'registerForm',
    validate
})(RegisterForm)