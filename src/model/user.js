const { DBOperation } = require("../services/database/database_operation");
const SchemaModel = require("../services/database/schema_model");
const { v4 } = require("uuid");
const schema = {
  user_id: {
    type: String,
    default: v4,
    index: true,
  },

  verification_token: String,

  email: {
    type: String,
    unique: true,
    required: [true, "User email is required!"],
    trim: true,
    lowercase: true,
    // set: encryptText,
    // get: decryptText,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
};

const modelName = "Users";
const UserModel = new DBOperation().createModel(modelName, schema);

let user = new SchemaModel(UserModel);
module.exports.userModel = user;
// export default user;
