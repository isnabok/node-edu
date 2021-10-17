'use strict';

const fs = require('fs');

fs.readFile('code/1/1_example.js', 'utf8', (err, buffer) => {
    if (err) {
        console.log(err);
        process.exit(0);
    }
    console.log('File Size: ' + buffer.length); // File Size: 298
    const src = buffer.toString();
    const lines = src.split('\n').filter(line => !!line);
    // console.log(lines);
    const content = lines.join('\n');
    fs.writeFile('code/1/1_asinc_example.js', content, err => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        console.log('New File Size: ' + content.length); // New File Size: 294
    });
});
console.log('Read file asinc example');