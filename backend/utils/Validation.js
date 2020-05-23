const Validator = require('validator');
const isEmpty = require('is-empty');

function validateLogin(data) {
    const errors = {
    }

    isEmpty(data.email) ? errors.email = "Please enter your email!" : null;
    isEmpty(data.password) ? errors.password = "Please enter your password!" : null;

    if (!isEmpty(data.email)) {
        !Validator.isEmail(data.email) ? errors.email = "Please enter valid email!": null;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

function validateRegister(data) {
    const errors = {

    }

    isEmpty(data.name) ? errors.name = "Please enter your name!" : null;
    isEmpty(data.email) ? errors.email = "Please enter your email!" : null;
    isEmpty(data.password) ? errors.password = "Please enter password!" : null;
    isEmpty(data.password2) ? errors.password2 = "Please confirm your password!" : null;

    !isEmpty(data.email) && !Validator.isEmail(data.email) ? errors.email = "Please enter valid email!" : '';
    !isEmpty(data.password) && !Validator.isLength(data.password, {min: 6, max: 30}) ? errors.password = "Password must be at least 6 characters!" : '';
    !isEmpty(data.password, data.password2) && !Validator.equals(data.password, data.password2) ? errors.password2 = "Passwords must match!" : '';

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = {validateLogin, validateRegister}