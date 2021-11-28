const ErrorMessages = {
  username: {
    matches: "Match error.",
    min: "Must be at least 6 character.",
  },
  password: {
    matches: "Match error.",
    min: "Must be at least 6 character.",
    max: "Must be at most 18 characters.",
  },
  email: {
    matches: "Match error.",
    min: "Must be at least 6 digit.",
  },
  cardname: {
    matches: "Please enter acceptable name.",
    min: "Must be at least 6 digit.",
  },
  cardnumber: {
    matches: "Match error.",
    min: "Must be at least 16 digit.",
    max: "Must be less than or equal to 16.",
    required: "Required field.",
    typeError: "Must be number.",
  },
  securitycode: {
    matches: "Match error.",
    min: "Must be at least 3 digit.",
    max: "Must be at most 3 digit.",
    required: "Required field.",
    typeError: "Must be number.",
  },
  phone: {
    matches: "Match error.",
    min: "Must be at least 3 digit.",
    max: "Must be at most 3 digit.",
    required: "Required field.",
    typeError: "Must be number.",
  },
  address: {
    matches: "Match error.",
    min: "Must be at least 3 digit.",
    max: "Must be at most 3 digit.",
    required: "Required field.",
    typeError: "Must be number.",
  },
};

export default ErrorMessages;
