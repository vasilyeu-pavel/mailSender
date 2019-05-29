const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const parseCSV = ({ fileName }) => new Promise((resolve, reject) => {
    const inputFilePath = path.join(__dirname, './data', fileName);
    const ideas = [];

    fs.createReadStream(inputFilePath)
        .pipe(csv())
        .on('data', (row) => {
            try {
                ideas.push(row);
            } catch (err) {
                reject(err);
            }
        })
        .on('end', () => {
            resolve(ideas);
        });
});

const getEmails = async ({ fileName }) => {
    const emails = [];
    const table = await parseCSV({ fileName });

    table.forEach(row => {
        if(row[Object.keys(row)[0]] && row[Object.keys(row)[0]].includes('@')) {
            const rowWithEmail = row[Object.keys(row)[0]];
            rowWithEmail.split(' ').forEach(chunk => {
                if (chunk.includes('@')) {
                    const chunkWithoutSymbol = chunk.replace(/,/g, '');

                    const chunkTransformToArray = chunkWithoutSymbol.split('.');

                    if (chunkTransformToArray[chunkTransformToArray.length - 1][0].toLowerCase() === 'c') {
                        chunkTransformToArray.pop();
                        chunkTransformToArray.push('.com');
                        emails.push(chunkTransformToArray.join(''));
                    } else {
                        emails.push(chunkWithoutSymbol);
                    }
                }
            });
        }
    });

    return emails;
};

module.exports = { getEmails };
