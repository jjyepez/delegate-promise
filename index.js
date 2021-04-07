const express = require('express');

const app = express();

app
    .use(express.json())
    .use('/static', express.static('static'))
;

app
    .use('/', require('./routes'))
;

app.listen('9000', 'localhost', () => {
    console.log('Servidor iniciado: http://localhost:9000');
})
;