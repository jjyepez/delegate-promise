const delegate = async (params = {}) => {

    const {
        def,
        fn,
        res
    } = params;
    
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
}

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

module.exports = {
    delegate,
    resolve,
    reject
}
