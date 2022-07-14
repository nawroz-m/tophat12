const bodyParser = require("body-parser");
const userRout = require("../router/user");
const middlewarConfig = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(userRout);
};

module.exports = middlewarConfig;
