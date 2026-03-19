# Express Promise Scaffold

Scaffold/template per API REST con **Express 5**, **MySQL2** (promise-based) e **Node.js 20+**.

Struttura minimale pronta all'uso con architettura a layer (Router → Controller → Database), error handling centralizzato e zero dipendenze superflue.

## Tech Stack

| Tecnologia | Versione | Note |
|---|---|---|
| Node.js | >= 20 | Richiesto per `--env-file` e `--watch` |
| Express | 5.x | Supporto nativo alle Promise nei route handler |
| mysql2 | 3.x | Driver MySQL con API promise-based |
| ES Modules | - | `"type": "module"` in package.json |

## Struttura del progetto

```
my-express-promise-scaffold/
├── app.js                    # Entry point - configura Express e avvia il server
├── package.json
├── .env.example              # Template variabili d'ambiente
├── .gitignore
├── controller/
│   └── controller.js         # Funzioni handler CRUD (stub)
├── data/
│   └── db.js                 # Connection pool MySQL (promise)
├── middleware/
│   ├── errorHandler.js       # Error handler globale (500)
│   └── notFound.js           # Catch-all per rotte non trovate (404)
├── public/                   # File statici (CSS, immagini, JS client-side)
│   └── .gitkeep
└── router/
    └── router.js             # Definizione rotte RESTful
```

## Flusso della richiesta

```
Client Request
  │
  ├── express.static("public")     Serve file statici (se presenti)
  ├── express.json()                Parse del body JSON
  ├── GET "/"                       Rotta di benvenuto
  ├── /api/* → router.js            Dispatch alle rotte API
  │             └── controller.js   Logica CRUD → db.js (MySQL pool)
  ├── notFound.js                   404 per rotte non matchate
  └── errorHandler.js               500 per errori non gestiti
```

## Rotte API

Tutte montate sotto il prefisso `/api/`:

| Metodo | Path | Controller | Scopo |
|---|---|---|---|
| GET | `/api/` | `index` | Lista risorse |
| GET | `/api/:id` | `show` | Dettaglio risorsa |
| POST | `/api/` | `store` | Crea risorsa |
| PUT | `/api/:id` | `update` | Aggiorna risorsa |
| DELETE | `/api/:id` | `destroy` | Elimina risorsa |

## Quick Start

```bash
# 1. Clona il template
git clone https://github.com/greencode-dev/my-express-promise-scaffold.git nome-progetto
cd nome-progetto

# 2. Rimuovi la history git del template e inizializza un nuovo repo
rm -rf .git
git init

# 3. Installa le dipendenze
npm install

# 4. Configura le variabili d'ambiente
cp .env.example .env
# Modifica .env con i tuoi dati (database, porta)

# 5. Avvia in modalita' sviluppo
npm run dev
```

## Variabili d'ambiente

| Variabile | Descrizione | Esempio |
|---|---|---|
| `APP_PORT` | Porta su cui gira il server | `3000` |
| `DB_HOST` | Hostname del server MySQL | `localhost` |
| `DB_PORT` | Porta del server MySQL | `3306` |
| `DB_USER` | Username MySQL | `root` |
| `DB_PASS` | Password MySQL | `password` |
| `DB_NAME` | Nome del database/schema | `my_database` |

## Script npm

| Script | Comando | Descrizione |
|---|---|---|
| `dev` | `node --env-file=.env --watch app.js` | Avvio in dev mode con auto-restart e caricamento `.env` |
| `start` | `node --env-file=.env app.js` | Avvio in produzione (senza auto-restart) |

---

# Cookbook: Come ricreare questo scaffold da zero

Guida passo-passo per ricostruire l'intero template partendo da una cartella vuota.

## Prerequisiti

- **Node.js >= 20** installato (verifica con `node -v`)
- **MySQL** installato e in esecuzione
- Un database MySQL gia' creato

## Passo 1 - Inizializzare il progetto

```bash
mkdir my-express-promise-scaffold
cd my-express-promise-scaffold
npm init -y
```

Modifica `package.json` per abilitare gli ES Modules e aggiungere lo script dev:

```json
{
  "name": "express-default-scaffold",
  "version": "1.0.0",
  "description": "Scaffold per API REST con Express 5 e MySQL2 (promise-based)",
  "license": "ISC",
  "author": "Il Tuo Nome",
  "type": "module",
  "main": "app.js",
  "scripts": {
    "start": "node --env-file=.env app.js",
    "dev": "node --env-file=.env --watch app.js"
  }
}
```

Note:
- `"type": "module"` abilita la sintassi `import`/`export` (ES Modules)
- `--env-file=.env` carica le variabili d'ambiente dal file `.env` (feature nativa di Node.js 20+, niente `dotenv`)
- `--watch` riavvia automaticamente il server quando i file cambiano (feature nativa di Node.js 20+, niente `nodemon`)
- `start` avvia il server senza `--watch`, pensato per ambienti di produzione
- `dev` avvia il server con auto-restart ad ogni modifica, pensato per lo sviluppo

## Passo 2 - Installare le dipendenze

```bash
npm install express@5 mysql2
```

- **express@5**: la versione 5 ha il supporto nativo alle Promise nei route handler. Se un handler `async` lancia un errore, Express lo cattura automaticamente e lo passa all'error handler, senza bisogno di `try/catch` + `next(err)`.
- **mysql2**: driver MySQL veloce con API promise-based nativa.

## Passo 3 - Creare il `.gitignore`

Crea il file `.gitignore`:

```
node_modules
.env
```

> **Nota**: il file `package-lock.json` viene committato nel repository per garantire installazioni riproducibili (stesse versioni esatte delle dipendenze per tutti).

## Passo 4 - Creare il `.env.example`

Crea il file `.env.example` (template per le variabili d'ambiente):

```env
APP_PORT=3000

DB_HOST="localhost"
DB_PORT=3306
DB_USER="your_username"
DB_PASS="your_password"
DB_NAME="your_database_name"
```

Poi copia il file e compila con i tuoi dati reali:

```bash
cp .env.example .env
```

## Passo 5 - Creare la connessione al database

Crea la cartella e il file `data/db.js`:

```bash
mkdir data
```

```js
// data/db.js
import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

const dbConnection = mysql.createPool(dbConfig);

dbConnection.getConnection()
    .then(connection => {
        console.log('Connessione a MySQL (Promise Pool) avvenuta con successo!');
        connection.release();
    })
    .catch(error => {
        console.error('ERRORE FATALE: Impossibile connettersi al database!', error);
        process.exit(1);
    });

export default dbConnection;
```

Cosa fa:
- Usa `mysql2/promise` per avere un'API basata su Promise (niente callback)
- Crea un **connection pool** (piu' performante di una singola connessione)
- All'avvio testa la connessione: se fallisce, termina il processo con codice 1
- Esporta il pool pronto per essere usato nei controller

## Passo 6 - Creare i middleware

Crea la cartella e i file middleware:

```bash
mkdir middleware
```

### `middleware/notFound.js` - Gestione 404

```js
// middleware/notFound.js
function notFound(req, res, next) {
    res.status(404).json({ error: "Pagina non trovata" });
}

export default notFound;
```

Questo middleware va montato **dopo** tutte le rotte. Se nessuna rotta ha matchato la richiesta, risponde con un 404 JSON.

### `middleware/errorHandler.js` - Gestione errori globale

```js
// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: err.name, message: err.message });
}

export default errorHandler;
```

Express riconosce questo come error handler grazie ai **4 parametri** (`err, req, res, next`). Cattura tutti gli errori non gestiti e risponde con un 500 JSON.

## Passo 7 - Creare il controller

Crea la cartella e il file:

```bash
mkdir controller
```

```js
// controller/controller.js
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
```

Queste sono funzioni **stub** (segnaposto). In un progetto reale qui si inseriscono le query al database. Esempio di implementazione reale:

```js
async function index(req, res) {
    const [rows] = await db.query("SELECT * FROM items");
    res.json(rows);
}

async function show(req, res) {
    const id = req.params.id;
    const [rows] = await db.query("SELECT * FROM items WHERE id = ?", [id]);
    if (rows.length === 0) {
        return res.status(404).json({ error: "Risorsa non trovata" });
    }
    res.json(rows[0]);
}

async function store(req, res) {
    const { name, description } = req.body;
    const [result] = await db.query(
        "INSERT INTO items (name, description) VALUES (?, ?)",
        [name, description]
    );
    res.status(201).json({ id: result.insertId, name, description });
}

async function update(req, res) {
    const id = req.params.id;
    const { name, description } = req.body;
    const [result] = await db.query(
        "UPDATE items SET name = ?, description = ? WHERE id = ?",
        [name, description, id]
    );
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Risorsa non trovata" });
    }
    res.json({ id, name, description });
}

async function destroy(req, res) {
    const id = req.params.id;
    const [result] = await db.query("DELETE FROM items WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Risorsa non trovata" });
    }
    res.status(204).end();
}
```

> Con **Express 5**, se una funzione `async` lancia un errore, Express lo cattura automaticamente e lo passa all'`errorHandler`. Non serve wrappare ogni handler in `try/catch`.

## Passo 8 - Creare il router

Crea la cartella e il file:

```bash
mkdir router
```

```js
// router/router.js
import express from "express";
import controller from "../controller/controller.js";

const router = express.Router();

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controller.store);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);

export default router;
```

Il router mappa i 5 metodi HTTP standard alle rispettive funzioni del controller, seguendo le convenzioni RESTful.

## Passo 9 - Creare l'entry point

Crea il file `app.js`:

```js
// app.js
import express from "express";
import router from "./router/router.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvenuto sul nostro Server Express!");
});

app.use("/api/", router);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.APP_PORT, () => {
    console.log(`Express avviato correttamente su http://localhost:${process.env.APP_PORT}/`);
});
```

L'ordine dei middleware e' importante:
1. `express.static("public")` - serve file statici (CSS, immagini, ecc.)
2. `express.json()` - parse del body JSON nelle richieste POST/PUT
3. Rotta root `/` - pagina di benvenuto
4. `/api/` - tutte le rotte API delegate al router
5. `notFound` - cattura le rotte non matchate (404)
6. `errorHandler` - cattura tutti gli errori (500) - **deve essere l'ultimo**

## Passo 10 - Creare la cartella per i file statici

`app.js` usa `express.static("public")` per servire file statici. Bisogna creare la cartella corrispondente:

```bash
mkdir public
```

Qui dentro andranno eventuali file CSS, immagini, JavaScript client-side, ecc. Per far si' che Git tracci la cartella anche se vuota, aggiungi un file `.gitkeep`:

```bash
touch public/.gitkeep
```

> **Nota**: `.gitkeep` non e' una feature di Git, e' una convenzione. Git non traccia cartelle vuote, quindi si usa un file segnaposto per forzarne l'inclusione nel repository.

## Passo 11 - Avviare il server

```bash
# Copia e compila il file .env
cp .env.example .env

# Avvia in modalita' sviluppo
npm run dev
```

Se tutto e' configurato correttamente, vedrai:

```
Connessione a MySQL (Promise Pool) avvenuta con successo!
Express avviato correttamente su http://localhost:3000/
```

## Passo 12 - Inizializzare Git

```bash
git init
git add .
git commit -m "Initial scaffold: Express 5 + MySQL2 promise template"
```

---

## Riepilogo struttura finale

```
my-express-promise-scaffold/
├── .env.example          # 4  - Template variabili d'ambiente
├── .gitignore            # 3  - File ignorati da Git
├── app.js                # 9  - Entry point dell'applicazione
├── package.json          # 1  - Manifest del progetto
├── controller/
│   └── controller.js     # 7  - Handler CRUD
├── data/
│   └── db.js             # 5  - Connection pool MySQL
├── middleware/
│   ├── errorHandler.js   # 6  - Error handler globale
│   └── notFound.js       # 6  - Handler 404
├── public/
│   └── .gitkeep          # 10 - Cartella file statici
└── router/
    └── router.js         # 8  - Definizione rotte
```

I numeri indicano il passo del cookbook in cui ogni file viene creato.
