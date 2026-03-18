import express from "express";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import db from "./data/db.js";

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvenuto sul nostro Server Express!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.APP_PORT, () => {
    console.log(`Express avviato correttamente su http://localhost:${process.env.APP_PORT}/`);
});
