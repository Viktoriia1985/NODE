// const builder = require('./helper/user-builder');
//
// let user = builder.createUser('Viktoriia', 36);
//
// console.log(user);

const fs = require('fs');
const path = require('path');

const appendFilePath = path.join(__dirname, 'files', 'bye.txt');
const mkDirPath = path.join(__dirname, 'files', 'user', '22', 'photos');
const newFilePath = path.join(mkDirPath, 'newFile2.txt');

console.log(appendFilePath);

// fs.readFile(`${__dirname}/files/test.txt`, ((err, data) => {        //зчитування файла
//     if (err) {
//         console.log(err)
//         return;
//     }
//     console.log(data.toString());
// }));
//
// fs.writeFile(`${__dirname}/files/write.txt`, 'Hello wOrLd!', (err) => {
//     console.log(err);                                  //  перезаписує контент у файлі з нуля
// });
//
// fs.appendFile(`${__dirname}/files/append.txt`, 'Hello wOrLd333!', (err) => {
//     console.log(err);                                  //  створює контент у файлі, додаючи нову інформація
// });                                                    //   що прописується в 'date'.

// fs.appendFile(appendFilePath, 'HellOOOO! \n', (err) => {
//     console.log(err);                                  //  створює контент у файлі, додаючи нову інформація
// });                                                    //   що прописується в 'date'.
//
// fs.mkdir(mkDirPath, { recursive: true },(err) => {  // створює папки
//     console.log(err);                            //  { recursive: true } має бути для рекурсивного процесу створення
// });
//
// fs.unlink(appendFilePath, err => {        //  стирання фалів
//     console.log(err);
// });

// fs.rename(
//     appendFilePath,
//     newFilePath,
//     err => {
//         console.log(err);
//     }
// );

// fs.stat(newFilePath, ((err, stats) => {
//     if (err) {
//         return;
//     }
//     console.log(stats);
// }));

fs.readdir(mkDirPath, (err, data) => {
    if (err) {
        console.log(err)
        return;
    }
    console.log(data);

    data.forEach(fileName => {
        fs.stat(path.join(mkDirPath, fileName), ((err, stats) => {
            if (err) {
                return;
            }
            console.log('------------------');
            console.log(stats.isDirectory());
            console.log(stats.isFile());
            console.log('------------------');

        }))
    })
});



