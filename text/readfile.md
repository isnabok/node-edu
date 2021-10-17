## Синхронное чтение файла

Рассмотрим код

```javascript
'use strict';

// Подключаем библиотеку fs для работы с файлами
const fs = require('fs');

/*
* Используем метод readFileSync, который выполняет синхронную загрузку файла, вторым параметром обязательно передаем кодировку
*/
const buffer = fs.readFileSync('code/1/1_example.js', 'utf8');
// readFileSync - работает синхронно, т.е. эта часть кода будет вызвана после загрузки файла
const src = buffer.toString();

console.log('Buffer length: ' + buffer.length);
console.log(buffer);
console.log(src);

// для примера: разбиваем на строки и фильтруем удаляя постые строки (line => !!line)
const lines = src.split('\n').filter(line => !!line);
console.log(lines);
```