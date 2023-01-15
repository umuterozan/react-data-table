const HOST_NAME = "127.0.0.1";
const PORT = 3001;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./users");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/react_data_table", () => {
    console.log("Connected to MongoDB!");
});
const db = mongoose.connection;
db.once("open", async () => {
    if ((await User.countDocuments().exec()) > 0) return;

    Promise.all([
        User.create({ name: "John Doe", email: "johndoe@gmail.com", age: 24 }),
        User.create({
            name: "Leanne Graham",
            email: "lgraham@gmail.com",
            age: 29,
        }),
        User.create({
            name: "Ervin Howell",
            email: "ervinhowell@gmail.com",
            age: 35,
        }),
        User.create({
            name: "Clementine Bauch",
            email: "cbauch@gmail.com",
            age: 42,
        }),
        User.create({
            name: "Bird Ramsey",
            email: "birdramsey@nimon.com",
            age: 23,
        }),
        User.create({
            name: "Lillian Burgess",
            email: "lillianburgess@luxuria.com",
            age: 31,
        }),
        User.create({
            name: "Kristie Cole",
            email: "kristiecole@quadeebo.com",
            age: 34,
        }),
        User.create({
            name: "Leonor Cross",
            email: "leonorcross@gronk.com",
            age: 30,
        }),
        User.create({
            name: "Marsh Mccall",
            email: "marshmccall@ultrimax.com",
            age: 28,
        }),
        User.create({
            name: "Dexter Burns",
            email: "dexter@gmail.com",
            age: 25,
        }),
        User.create({
            name: "Louis Williams",
            email: "louis@gmail.com",
            age: 23,
        }),
        User.create({
            name: "Scott Gallagher",
            email: "scott@gmail.com",
            age: 23,
        }),
        User.create({
            name: "Henry Mccarthy",
            email: "henry@gmail.com",
            age: 25,
        }),
        User.create({ name: "Ewan Morgan", email: "ewan@gmail.com", age: 21 }),
        User.create({
            name: "Emiliano Pierce",
            email: "emiliano@gmail.com",
            age: 36,
        }),
        User.create({
            name: "Jonathan Goff",
            email: "jonathan@gmail.com",
            age: 34,
        }),
        User.create({ name: "Troy Fischer", email: "troy@gmail.com", age: 21 }),
        User.create({
            name: "Oliver Fisher",
            email: "oliver@gmail.com",
            age: 19,
        }),
        User.create({ name: "Joey Evans", email: "jeoy@gmail.com", age: 64 }),
        User.create({
            name: "Morgan Palmer",
            email: "morgan@gmail.com",
            age: 67,
        }),
        User.create({ name: "Lee Hudson", email: "lee@gmail.com", age: 34 }),
        User.create({
            name: "Franky Hayes",
            email: "franky@gmail.com",
            age: 65,
        }),
        User.create({
            name: "Aiden Stewart",
            email: "aiden@gmail.com",
            age: 45,
        }),
        User.create({ name: "Rowan Webb", email: "rowan@gmail.com", age: 54 }),
        User.create({
            name: "Bailey Parsons",
            email: "bailey@gmail.com",
            age: 36,
        }),
        User.create({ name: "Brice Vance", email: "brice@gmail.com", age: 52 }),
        User.create({ name: "Kiran Gould", email: "kiran@gmail.com", age: 34 }),
        User.create({ name: "Lane Mcclain", email: "lane@gmail.com", age: 56 }),
        User.create({
            name: "Taylor Luna",
            email: "taylor@gmail.com",
            age: 24,
        }),
        User.create({
            name: "Amelie White",
            email: "amelie@gmail.com",
            age: 56,
        }),
        User.create({ name: "Isla Parker", email: "isla@gmail.com", age: 34 }),
        User.create({
            name: "Isabelle Brown",
            email: "isabelle@gmail.com",
            age: 56,
        }),
        User.create({ name: "Eva Campbell", email: "eva@gmail.com", age: 65 }),
        User.create({
            name: "Lacey Knight",
            email: "lacey@gmail.com",
            age: 34,
        }),
        User.create({ name: "Nova Shepard", email: "nova@gmail.com", age: 32 }),
        User.create({ name: "Sam Clarke", email: "sam@gmail.com", age: 54 }),
        User.create({
            name: "Thomas Scott",
            email: "thomas@gmail.com",
            age: 34,
        }),
        User.create({ name: "Rory Barrett", email: "rory@gmail.com", age: 54 }),
        User.create({ name: "Issac Berg", email: "issac@gmail.com", age: 44 }),
        User.create({ name: "Rowan Weeks", email: "rowan@gmail.com", age: 33 }),
        User.create({
            name: "Devan Greene",
            email: "devan@gmail.com",
            age: 54,
        }),
        User.create({
            name: "Jessica Burke",
            email: "jessica@gmail.com",
            age: 35,
        }),
        User.create({ name: "Rosie Fox", email: "rosie@gmail.com", age: 22 }),
        User.create({
            name: "Lucy Thompson",
            email: "lucy@gmail.com",
            age: 21,
        }),
        User.create({
            name: "Samantha Carter",
            email: "samantha@gmail.com",
            age: 20,
        }),
        User.create({ name: "Megan Rose", email: "megan@gmail.com", age: 61 }),
        User.create({
            name: "Isabela Meyers",
            email: "isabela@gmail.com",
            age: 63,
        }),
        User.create({
            name: "Ezequiel Lawson",
            email: "ezequiel@gmail.com",
            age: 23,
        }),
        User.create({ name: "Jack Berry", email: "jack@gmail.com", age: 43 }),
        User.create({
            name: "Elliot Jones",
            email: "elliot@gmail.com",
            age: 48,
        }),
    ]).then(() => console.log("Added users!"));
});

app.use(cors());
app.options("*", cors());

app.get("/users", paginatedResults(User), (req, res) => {
    res.json(res.paginatedResults);
});

function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const dataCounts = await model.countDocuments().exec();
        const pageCounts = dataCounts / limit;

        const results = {};

        results.total = {
            dataCounts,
            pageCounts,
        };

        if (endIndex < (await model.countDocuments().exec())) {
            results.next = {
                page: page + 1,
                limit,
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit,
            };
        }

        try {
            results.result = await model
                .find()
                .limit(limit)
                .skip(startIndex)
                .exec();
            res.paginatedResults = results;
            next();
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
}

app.listen(PORT, HOST_NAME, () => {
    console.log(`App listening on http://${HOST_NAME}:${PORT}`);
});
