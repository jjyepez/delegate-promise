"use strict";

const btn = document.getElementById('btn');
      btn.addEventListener('click', clickHandle);

async function clickHandle(){

    let txtDef = document.getElementById('txtDef').value;

    let def = `() => ${txtDef}`;

    let fn = (() => new Promise((rs, rj) => {
        let fetch = require('node-fetch');
        fetch('http://localhost:9000/dummy')
            .then(rslt => rslt.text())
            .then(txt => rs(txt))
            .catch(err => rj(err))
        ;
    }))
    .toString();

    let url = 'http://localhost:9000/delegate';
    let body = {
        def,
        fn
    };
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}