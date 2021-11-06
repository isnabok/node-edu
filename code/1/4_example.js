'use strict';

const fs = require('fs');

const files = ['code/1/1_example.js', 'code/1/2_example.js', 'code/1/3_example.js'];

const status = new Array(files.length);

const maxIndex = files.length - 1;

const printResult = () => {
    console.dir({ status });
};

files.forEach((file, i) => {
    console.dir({ file, i });
    fs.lstat(file, (err, stat) => {
        if (err) {
            console.log(`File ${file} not found`);
        } else {
            status[i] = stat;
        }
        if (i === maxIndex) printResult();
    });
});