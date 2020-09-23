const express = require('express');
const app = express();
const { sequelize } = require('./models');

const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        require('./routes/quote.routes')(app);
        console.log(`App listening on port ${PORT}`);

        app.emit('serverStarted');
    });
});

module.exports = app;
