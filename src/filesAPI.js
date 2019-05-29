const fs = require('fs');
const path = require('path');

const saveToJSONFile = (emails, fileName) => new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, './data', fileName), JSON.stringify(emails), (err) => {
        if (err) {
            reject(err)
        }
        resolve('saving success');
    });
});

const readFiles = fileName => new Promise(resolve => resolve(require(`./data/${fileName}`)));

module.exports = { saveToJSONFile, readFiles };
