require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth.routes").default;
const profileRoutes = require("./routes/profile.routes");

const app = express();

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
