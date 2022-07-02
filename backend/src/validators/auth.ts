import * as yup from 'yup';

/**
 * validator for signIn payload
 */
export const signInPayloadValidator = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

/**
 * validator for signUp payload
 */
export const signUpPayloadValidator = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});


