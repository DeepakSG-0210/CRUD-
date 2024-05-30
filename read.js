const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

function readRecords(callback) {
    fs.readdir(dataDir, (err, files) => {
        if (err) {
            callback(err);
            return;
        }
        const records = [];
        files.forEach(file => {
            const filePath = path.join(dataDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            records.push(JSON.parse(content));
        });
        callback(null, records);
    });
}

function readRecordById(id, callback) {
    const filePath = path.join(dataDir, `${id}.json`);
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, JSON.parse(content));
    });
}

module.exports = { readRecords, readRecordById };
