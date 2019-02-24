/* eslint-disable no-useless-escape */
const emailValidation = (email) => {
  const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return re.test(String(email).toLowerCase());
};

export default emailValidation;
