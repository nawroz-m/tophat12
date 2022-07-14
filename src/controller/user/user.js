const { validationResult } = require("express-validator");
const { userRep } = require("../../repositories/user");
const { userModel } = require("../../model/user");
module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = { message: "Eroror" };
    return badRequestError(res, error);
  }

  try {
    const insertedUser = await userRep.addUser(req.body);

    res.status(200).json(insertedUser);
  } catch (err) {
    console.log("ERORR: ", err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = { message: "Eroror" };
    return badRequestError(res, error);
  }

  try {
    const foundUser = await userModel.get({ email: req.body.email });
    if (foundUser.length === 0) {
      res.status(400).send("User nodt found");
    }

    const user = await userRep.login(req.body);

    res.status(200).json(user);
  } catch (err) {
    console.log("ERORR: ", err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
