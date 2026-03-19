import db from "../data/db.js";

function index(req, res) {
    res.send("Index Page");
}

function show(req, res) {
    res.send("Show Page");
}

function store(req, res) {
    res.send("Store Page");
}

function update(req, res) {
    res.send("Update Page");
}

function destroy(req, res) {
    res.send("Destroy Page");
}

export default { index, show, store, update, destroy };   