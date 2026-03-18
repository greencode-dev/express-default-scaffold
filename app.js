import express from "express";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";


const app = express();
const port = 3000;



app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvenuto sul nostro Server Express!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Express avviato correttamente su http://localhost:${port}/`);
});
