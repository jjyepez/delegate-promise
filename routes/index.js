const router = require('express').Router();
const path = require('path');
const delegateServices = require('../services/delegateServices');

global.require = require;

router

    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    })

    .get('/dummy', (req, res) => {
        setTimeout( () => {
            res
                .status(200)
                .send('GOT dummied!')
            ;
        }, 3000);
    })

    .post('/delegate', async (req, res) => {

        const {
            def,
            fn
        } = req.body;

        let x = await delegateServices.delegate({def, fn, res});
        
    })
;

module.exports = router;