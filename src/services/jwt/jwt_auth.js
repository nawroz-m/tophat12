const jwt = require("jsonwebtoken");
const SECRET = "jwtauthsecret";
class JWTAuth {
  /**Create Auth Token */
  async createToken(data) {
    return new Promise((resolve, reject) => {
      const payload = { data };
      try {
        const token = Promise.resolve(
          jwt.sign(payload, SECRET, { expiresIn: "24h" })
        );

        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  }

  /** Verify Auth Token */

  async verifyToken(accessToken) {
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt.verify(accessToken, SECRET);
        resolve(decoded);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = JWTAuth;
