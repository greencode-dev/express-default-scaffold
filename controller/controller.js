import db from "../data/db.js";

function index(req, res) {
    res.send("Hello World!");
}

function show(req, res) {
    res.send("Hello World!");
}

function store(req, res) {
    res.send("Hello World!");
}

function update(req, res) {
    res.send("Hello World!");
}

function destroy(req, res) {
    res.send("Hello World!");
}

export default { index, show, store, update, destroy };   