const express = require("express");

const app = express();

// middleware to read JSON body
app.use(express.json());
app.use(express.static("public"));

app.use("/api", require("./routes/bookRoute"));


app.listen(3000, () => {
    console.log(`Server running on: ${PORT}`);
});