const pool = require("../config/database");

class ProfileService {
  async createProfile(userId, profileData) {
    const connection = await pool.getConnection();
    try {
      await connection.execute(
        "UPDATE users SET name = ?, email = ?, company = ?, city = ? WHERE id = ?",
        [
          profileData.name,
          profileData.email,
          profileData.company,
          profileData.city,
          userId,
        ]
      );
      return true;
    } finally {
      connection.release();
    }
  }

  async getProfile(userId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        "SELECT name, email, company, city FROM users WHERE id = ?",
        [userId]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }
}

module.exports = new ProfileService();
