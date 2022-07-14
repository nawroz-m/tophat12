const HTTPStatus = require("http-status");
const bcrypt = require("bcryptjs");

const encrypt = async (data) => {
  const salt = await bcrypt.genSalt(10);
  let mystr = await bcrypt.hash(data, salt);
  return mystr;
};
const decrypt = async (data, hashData) => {
  const match = await bcrypt.compare(data, hashData);
  return match;
};

module.exports = {
  encrypt,
  decrypt,
};
