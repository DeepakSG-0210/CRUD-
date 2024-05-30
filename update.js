const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

function updateRecord(id, newData, callback) {
    const filePath = path.join(dataDir, `${id}.json`);
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            callback(err);
            return;
        }
        const data = JSON.parse(content);
        const updatedData = { ...data, ...newData };
        fs.writeFile(filePath, JSON.stringify(updatedData), err => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, updatedData);
        });
    });
}

module.exports = updateRecord;
