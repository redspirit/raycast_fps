
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public', {
    index: 'index.html'
}));

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        success: false,
        message: 'bad request'
    });
});

app.listen(9090, () => {
    console.log('Server listening on port', 9090);
});