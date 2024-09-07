const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const trainRoutes = require("./routes/trainRoutes");
const cors = require("cors")
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors())
// Train routes
app.use("/api/trains", trainRoutes);

const PORT = process.env.PORT || 5008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
