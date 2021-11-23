const ErrorMessages = {
    username: {
        matches: 'Match error',
        min: 'Min 6 digit'
    },
    password: {
        matches: 'Match error',
        min: 'Min digit 6',
        max: 'Max digit 18',
    },
    email: {
        matches: 'Match error',
        min: 'Min 6 digit'
    },
    cardname: {
        matches: 'Match error',
        min: 'Min 6 digit'
    },
    cardnumber: {
        matches: 'Match error',
        min: 'Min 16 digit',
        max: 'Must be less than or equal to 16',
        required: 'Required field',
        typeError: 'Must be number'
    },
    securitycode: {
        matches: 'Match error',
        min: 'Min 6 digit',
        required: 'Required field',
        typeError: 'Must be number'
    },
};

export default ErrorMessages;