const express = require("express")
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes/route");
const cookieParser = require("cookie-parser");
const reciperouter = require("./routes/reciperoute");
const commentRoute = require("./routes/commentroute");
const app = express()
require("dotenv").config()
const PORT = 5000;

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser)


app.use("/auth", router)
app.use("/recipie", reciperouter)
app.use("/comments", commentRoute)

connectDB()
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});