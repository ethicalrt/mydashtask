const validateEmail = (email) => {
  var emailCheck =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  if (!email?.length) return "Email Field Can't be Empty";
  if (!emailCheck.test(email)) return "Invalid Email Address";
  return true;
};
const validateNumber = (number) => {
  if (isNaN(number?.replace(/\s\s+/g, ""))) return "Not A valid Number";
  if (number?.replace(/\s\s+/g, "")?.length !== 10)
    return "Number Can't Be less than or greater than 10";
  return true;
};
const validatePassword = (pass, cpass) => {
  if (pass !== cpass) return "Password and confirm password not matching";
  if (pass?.length < 6 || cpass?.length < 6)
    return "Password is to short, length must be > 6";
  return true;
};
const getRandomName = () => {
  var a = ["Small", "Blue", "Ugly", "Cute", "White"];
  var b = ["Bear", "Dog", "Banana", "Mango", "Strawberry"];

  var rA = Math.floor(Math.random() * a.length);
  var rB = Math.floor(Math.random() * b.length);
  var name = a[rA] + b[rB];

  return name;
};
const generateData = (length, max) =>
  [...new Array(length)].map(() => {
    return {
      name: getRandomName(),
      score: Math.round(Math.random() * max * 10),
    };
  });
export {
  validateEmail,
  validateNumber,
  validatePassword,
  getRandomName,
  generateData,
};
