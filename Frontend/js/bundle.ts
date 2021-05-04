import React from 'react';

const form = document.querySelector('form')
const data = new FormData(form);

console.log(data)

async function foo() {
    try {
        var val = await getMeAPromise();
        console.log(val);
    }
    catch(err) {
        console.log('Error: ', err.message);
    }
}

