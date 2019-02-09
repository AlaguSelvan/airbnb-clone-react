import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { BwmInput } from 'components/shared/form/BwmInput'
import { BwmResError } from 'components/shared/form/BwmResError'
import { required, minLength4 } from 'components/shared/form/validators'

const LoginForm = props => {
    const { handleSubmit, pristine, submitting, loginUser, valid, errors } = props
    return (
        <form onSubmit={handleSubmit(loginUser)}>
            <Field
                name="email"
                type="email"
                label="Email"
                className="form-control"
                component={BwmInput}
            validate={[required, minLength4]}
        />
            <Field
                name="password"
                type="password"
                label="Password"
                className="form-control"
                component={BwmInput}
                validate={[required]}
        />
            <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
                Login
        </button>
            <BwmResError errors={errors} />
        </form>
    )
}

// const validate = values => {
//     const errors = {}
//     if (!values.email) {
//         errors.email = 'Enter your email'
//     }
//     if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         errors.email = 'Invalid email address'
//     }
//     return errors
// }

export default reduxForm({
    form: 'loginForm'
    // validate
})(LoginForm)