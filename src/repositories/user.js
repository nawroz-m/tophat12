const crypto = require("crypto");
const { encrypt, decrypt } = require("../util/utilities");
const { userModel } = require("../model/user");
const JWTAuth = require("../services/jwt/jwt_auth");
const addUser = async (body) => {
  const encryptPassword = await encrypt(body.password);
  const email = body.email.toLowerCase();
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await userModel.add({
    ...body,
    email,
    password: encryptPassword,
    verification_token: verificationToken,
  });
  return user;
};

const login = async (body, userAgent) => {
  let object;
  let { email, password } = body;
  email = body.email.toLowerCase();
  const [userDoc] = await userModel.get({ email });
  const decryptPassword = await decrypt(password, userDoc.password);
  if (decryptPassword) {
    const tokenPayload = {
      id: userDoc._id,
      user_id: userDoc.user_id,
      email: userDoc.email,
    };
    const auth = new JWTAuth();

    const accessToken = await auth.createToken(tokenPayload);

    let payload = {
      ...tokenPayload,
      accessToken,
    };

    object = {
      message: "Success_002",
      data: payload,
    };
  }
  let data = { object, decryptPassword };
  return data;
};

module.exports.userRep = { addUser, login };
