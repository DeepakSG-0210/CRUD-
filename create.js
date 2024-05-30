const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function createRecord(data, callback) {
    const id = generateId();
    const filePath = path.join(dataDir, `${id}.json`);
    fs.writeFile(filePath, JSON.stringify({ id, ...data }), err => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, { id, ...data });
    });
}

module.exports = createRecord;
