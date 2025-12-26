const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

let users = [
    { id: 1, name: "a" },
    { id: 2, name: "B" },
    { id: 3, name: "C" }
];

app.get("/", (req, res) => {
    res.render("Form", { users });
});

app.post("/add", (req, res) => {
    const { name, age } = req.body;

    users.push({
        id: Date.now(),
        name,
        age: age
    });

    res.redirect("/");
});

app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    const { name, age } = req.body;

    let addUsers = {
        age, name
    };

    users.push(addUsers);

    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on 3000");
});