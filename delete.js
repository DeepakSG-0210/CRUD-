const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

function deleteRecord(id, callback) {
    const filePath = path.join(dataDir, `${id}.json`);
    fs.unlink(filePath, err => {
        if (err) {
            callback(err);
            return;
        }
        callback(null);
    });
}

module.exports = deleteRecord;
