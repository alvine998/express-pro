const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name:"";
    data.email = !isEmpty(data.email) ? data.email:"";
    data.password1 = !isEmpty(data.password1) ? data.password1:"";
    data.password2 = !isEmpty(data.password2) ? data.password2:"";

    if(!validator.isLength(data.name,{min:3, max:50})){
        errors.name = "Nama harus terdiri dari 3 huruf atau lebih";
    }

    if(!validator.isLength(data.password1,{min:8, max:50})){
        errors.password1 = "Password minimal 8 huruf";
    }

    if(!validator.isEmpty(data.name)){
        errors.name = "Data nama dibutuhkan";
    }

    if(!validator.isEmpty(data.email)){
        errors.email = "Data email dibutuhkan";
    }

    if(!validator.isEmail(data.email)){
        errors.email = "Email tidak valid";
    }
    if(!validator.equals(data.password2, data.password1)){
        errors.password2 = "Data password dan confirmed password harus sama";
    }

    if(!validator.isEmpty(data.password2)){
        errors.password2 = "Data confirmed password dibutuhkan";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}