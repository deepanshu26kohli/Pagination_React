export default function Validation(values) {
    const errors = {}
    const email_pattern = /^[^\s@]+@[^\s@].[^\s@]{2,6}$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    if (values.name === "") {
        errors.name = "name is Required"
    }
    if (values.email === "") {
        errors.email = "email is required"
    }
    else if (!email_pattern.test(values.email)) {
        errors.email = "Email did not match"
    }
    if (values.password === "") {
        errors.password = "Password is required"
    }
    else if (!password_pattern.test(values.password)) {
        errors.email = "Password did not match"
    }
    return errors
}