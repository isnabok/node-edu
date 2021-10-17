## Синхронное чтение файла

Рассмотрим код

```javascript
'use strict';

// Подключаем библиотеку fs для работы с файлами
const fs = require('fs');

/*
* Используем метод readFileSync, который выполняет синхронную загрузку файла,
* вторым параметром обязательно передаем кодировку
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
[Пример кода](../code/1/1_example.js)

При таком подходе, например при загрузке 50 файлов, мы будем ожидать когда нам это вернет файловая система, в свою очередь файловая система будет ожидать ответ от контроллера диска. При этом получиться, что процессор, память, сеть и др. ресурсы будут заняты этим ожиданием.

## Синхронная запись в файл

Пример:
```javascript
'use strict';

// Подключаем библиотеку fs для работы с фай
const fs = require('fs');

const buffer = fs.readFileSync('code/1/1_example.js', 'utf8');
const src = buffer.toString();

// Убираем все разбиваем по переносу, и убираем пустые строки
const lines = src.split('\n').filter(line => !!line);
// То что получилось пишем в файл 1_example.txt и склеиваем по переносу строки. Будет создан файл 1_example.txt
fs.writeFileSync('code/1/1_example.txt', lines.join('\n'));
```
[Пример кода](../code/1/2_example.js)
Опять же, мы имеем проблему блокировки ресурсов

## Асинхронные функции для чтения и записи файлов

Пример кода:
```javascript
'use strict';

const fs = require('fs');

// readFile - асснхронная функция не блокирующая ресурсы.
// первый параметр - файл, второй - кодировка
// третий параметр - лямбда, где первый аргумент ошибка, второй текст файла
fs.readFile('code/1/1_example.js', 'utf8', (err, buffer) => {
    if (err) {
        console.log(err);
        // При ошибке осанавливаем процесс и выходим
        process.exit(0);
    }
    // если успешно, выводим длинну файла
    console.log('File Size: ' + buffer.length); // File Size: 298
    // Преобразуем к строке
    const src = buffer.toString();
    // Разбиваем строку по переносу строки и удаляем пустые строки
    // На выходе получем массив из строк
    const lines = src.split('\n').filter(line => !!line);
    // Объединяем массив в строку с переводом простроки
    const content = lines.join('\n');
    // Записываем асснхронно данные в новый файл
    // Первый аргумент файл, куда писать
    // Второй аргумент строка или buffer(то что считали)
    // Третий - лямбда или функция, куда может придти ошибка 
    fs.writeFile('code/1/1_asinc_example.js', content, err => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        console.log('New File Size: ' + content.length); // New File Size: 294
    });
});
// Эта строка выведется первой, поскольку верхняя часть кода работает асснхронно
console.log('Read file asinc example');
```
[Пример кода](../code/1/3_example.js)

Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку.

https://www.youtube.com/watch?v=eQGBS15vUac 8.52