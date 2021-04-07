const router = require('express').Router();
const path = require('path');

//let fetch = require('node-fetch');
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

        const resolve = (res, rsp) => {
            console.log('OK', rsp);
            res
                .status(200)
                .json({
                    error: false,
                    msg: 'OK',
                    rsp
                })
            ;
        }

        const reject = (res, err) => {
            console.log('ERR', err);
            res
                .status(500)
                .json({
                    error: true,
                    msg: 'ERR',
                    err
                })
            ;
        }

        const {
            def,
            fn
        } = req.body;

        console.log({def, fn});
        
        let b;
        try {
            let actualFn  = new Function(`return ${fn}`);
            let actualDef = new Function(`return ${def}`);
            
            console.log({actualFn, actualDef});
            
            // b = await actualFn()()
            //     .then((rsp)=>resolve(res, rsp))
            //     .catch(()=>reject(res, err))
            // ;

            b = await actualDef()()
                .then((rsp)=>resolve(res, rsp))
                .catch((err)=>reject(res, err))
            ;

        } catch(err) {

            reject(res, err);

        }
        
        console.log('Delegated.');
    })
;

module.exports = router;