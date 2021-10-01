//---------------------------------- Homework T A S K -----------------------------------------
// Посортувати юзерів по папках.
//
// У вас є дві папки. 1800 та 2000.
// В кожній з цих папок є файлики аля Karina.txt в якому міститься {"gender": "female"}
// Oleg.txt в якому міститься {"gender": "male"}
//
// Вам потрібно перемістити всіх дівчат на 1800 а хлопців на 2000.
//-----------------------------------------------------------------------------------------------------

const fs = require('fs');
const path = require('path');

// const mkDir1800_1 = path.join(__dirname, '1800_1');
// fs.mkdir(mkDir1800_1, {recursive:true}, err => {
//     if(err) console.log(err);
// });
//
// const mkDir2000_1 = path.join(__dirname, '2000_1');
// fs.mkdir(mkDir2000_1, {recursive:true}, err => {
//     if(err) console.log(err);
// });
//
const femaleClass = path.join(__dirname, '1800_1');
const maleClass = path.join(__dirname, '2000_1');

//
// const textPathAlina = path.join(__dirname, '1800_1', 'Alina.json');
// const textPathVika = path.join(__dirname, '2000_1', 'Vika.json');
// const textPathGala = path.join(__dirname, '2000_1', 'Gala.json');
// const textPathAndriy = path.join(__dirname, '2000_1', 'Andriy.json');
// const textPathViktor = path.join(__dirname, '1800_1', 'Viktor.json');
// const textPathMax = path.join(__dirname, '1800_1', 'Max.json');
// const textPathDaniil = path.join(__dirname, '1800_1', 'Daniil.json');
//
// const infoAlina = '{"name": "Alina", "gender": "female"}';
// const infoVika = '{"name": "Vika", "gender": "female"}';
// const infoGala = '{"name": "Gala", "gender": "female"}';
// const infoAndriy = '{"name": "Andriy", "gender": "male"}';
// const infoViktor = '{"name": "Viktor", "gender": "male"}';
// const infoMax = '{"name": "Max", "gender": "male"}';
// const infoDaniil = '{"name": "Daniil", "gender": "male"}';
//
// fs.writeFile(textPathAlina, infoAlina, err => {
//     if(err) console.log(err);
// });
//
// fs.writeFile (textPathVika, infoVika, err => {
//     if(err) console.log(err);
// });
//
// fs.writeFile (textPathGala, infoGala, err => {
//     if(err) console.log(err);
// });
//
// fs.writeFile(textPathAndriy, infoAndriy, err => {
//     if(err) console.log(err);
// });
//
// fs.writeFile(textPathViktor, infoViktor, err => {
//     if(err) console.log(err);
// });
//
// fs.writeFile(textPathMax, infoMax, err => {
//     if(err) console.log(err);
// });
//
// fs.writeFile(textPathDaniil, infoDaniil, err => {
//     if(err) console.log(err);
// })

const sort = (directoryPath, gender, folder) => {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directoryPath, file);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                const user = JSON.parse(data);

                if (user.gender === gender) {
                    const filePath = path.join(directoryPath, file);
                    const finishPath = path.join(folder, file);

                    fs.rename(filePath, finishPath, err => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            })
        })
    })
}

sort(femaleClass, 'male', maleClass);
sort(maleClass, 'female', femaleClass);
