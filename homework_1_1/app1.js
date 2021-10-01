//   --------------------------------- HOMEWORK 1.1 ---------------------------------------------
//  вам потрбіно перемісти всі файлики з вкладених
// папок в іншу папку. Зробити всі файли на одному рівні вкладеності.
//   ------------------------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');

const filteredFolders = path.join(__dirname, 'filteredFolders');
const movedFiles = path.join(__dirname, 'filteredFolders', 'movedFiles');

function moveFiles(dirForEdit) {
    fs.readdir(dirForEdit, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(file => {
            const oldPath = path.join(dirForEdit, file);

            fs.stat(oldPath, (err1, stats) => {
                if (err1) {
                    console.log(err1);
                    return;
                }

                if (stats.isDirectory()) {
                    moveFiles(oldPath);
                    return;
                }

                const newPath = path.join(movedFiles, file);

                fs.rename(oldPath, newPath, err2 => {
                    if (err2) {
                        console.log(err2);
                    }
                })
            })
        })
    })
}
moveFiles(filteredFolders);
