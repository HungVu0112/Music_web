const express = require('express');
const app = express();
const port = 9000;
const cors = require('cors');

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});


