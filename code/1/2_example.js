'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('code/1/1_example.js', 'utf8');
const src = buffer.toString();

const lines = src.split('\n').filter(line => !!line);
fs.writeFileSync('code/1/1_example.txt', lines.join('\n'));