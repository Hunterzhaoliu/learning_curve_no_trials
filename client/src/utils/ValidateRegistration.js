// https://stackoverflow.com/questions/14088714/regular-expression-for-name-field-in-javascript-validation
// this valid string also includes _
const isValidStringRegex = /^[a-zA-Z ]{0,30}$/;

export const isValidString = string => {
  return isValidStringRegex.test(string);
};

const isValidFilledStringRegex = /^[a-zA-Z ]{1,30}$/;

export const isValidFilledString = string => {
  return isValidFilledStringRegex.test(string);
};

const isValidNumberRegex = /^[0-9]*$/;
// isValidNumberRegex.test("") === true
export const isValidNumber = number => {
  return isValidNumberRegex.test(number);
};

const isValidFilledNumberRegex = /^[0-9]+$/;
// changing the * to + forces the input to have length > 0
export const isValidFilledNumber = number => {
  if (number === "") {
    return false;
  } else {
    return isValidFilledNumberRegex.test(number);
  }
};

const isValidEmailRegex = /\S+@\S+\.\S+/;
export const isValidEmail = email => {
  if (email === "") {
    // empty input
    return true;
  } else {
    return isValidEmailRegex.test(email);
  }
};

export const isValidFilledEmail = email => {
  //   isValidEmailRegex.test("") === false
  return isValidEmailRegex.test(email);
};

const isValidDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
export const isValidDate = date => {
  if (date === "") {
    return true;
  } else {
    return isValidDateRegex.test(date);
  }
};
