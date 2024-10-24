const pool = require("../config/database");
const { generateTokens } = require("../utils/jwt.utils");

class AuthService {
  async sendOTP(countryCode, mobileNumber) {
    const connection = await pool.getConnection();
    try {
      //generate 4 digit otp
      const otp = Math.floor(1000 + Math.random() * 9000).toString();

      // the mobile number and otp is stored in database
      await connection.execute(
        "INSERT INTO otps (mobile_number, otp) VALUES (?, ?)",
        [mobileNumber, otp]
      );

      //in this line we can send otp in our realtime application
      console.log(`Mock OTP for ${mobileNumber}: ${otp}`);

      return true;
    } finally {
      connection.release();
    }
  }

  async verifyOTP(mobileNumber, otp) {
    const connection = await pool.getConnection();
    try {
      // verify the recieved otp and recieved within 5 min
      const [rows] = await connection.execute(
        "SELECT * FROM otps WHERE mobile_number = ? AND otp = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)",
        [mobileNumber, otp]
      );

      //when there are no otp return null
      if (rows.length === 0) {
        return null;
      }

      // delete the used otp by mobile number
      await connection.execute("DELETE FROM otps WHERE mobile_number = ?", [
        mobileNumber,
      ]);

      // get the user or create the user
      let [users] = await connection.execute(
        "SELECT * FROM users WHERE mobile_number = ?",
        [mobileNumber]
      );

      let userId;
      if (users.length === 0) {
        const [result] = await connection.execute(
          "INSERT INTO users (mobile_number) VALUES (?)",
          [mobileNumber]
        );
        userId = result.insertId;
      } else {
        userId = users[0].id;
      }

      // generate tokens
      const tokens = generateTokens(userId, mobileNumber);

      // store the refresh token
      await connection.execute(
        "UPDATE users SET refresh_token = ? WHERE id = ?",
        [tokens.refreshToken, userId]
      );

      return tokens;
    } finally {
      connection.release();
    }
  }

  async refreshToken(refreshToken) {
    const connection = await pool.getConnection();
    try {
      const [users] = await connection.execute(
        "SELECT * FROM users WHERE refresh_token = ?",
        [refreshToken]
      );

      if (users.length === 0) {
        return null;
      }

      const tokens = generateTokens(users[0].id, users[0].mobile_number);

      await connection.execute(
        "UPDATE users SET refresh_token = ? WHERE id = ?",
        [tokens.refreshToken, users[0].id]
      );

      return tokens;
    } finally {
      connection.release();
    }
  }
}

module.exports = new AuthService();
