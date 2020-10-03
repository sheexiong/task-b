const express = require('express');
const app = express();
const { sequelize } = require('./models');
const serverless = require('serverless-http');

const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/index', async (req, res) => {
    res.send('Welcome to CS3219 Task B');
});

require('./routes/quote.routes')(app);

sequelize.sync().then(() => {
    app.listen(PORT, async () => {
        await sequelize.authenticate();
        console.log(`App listening on port ${PORT}`);
        app.emit('serverStarted');
    });
});

module.exports = app;
module.exports.handler = serverless(app);
