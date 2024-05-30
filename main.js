const readline = require('readline');
const createRecord = require('./create');
const { readRecords, readRecordById } = require('./read');
const updateRecord = require('./update');
const deleteRecord = require('./delete');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function continueOperation() {
    rl.question('Do you want to continue (Y|N): ', option => {
        switch(option){
            case 'Y':
                crud();
                break;
            case 'N':
                process.exit();
            default:
                break;
        }
    }) 
}
function crud() {
    rl.question('Enter operation (create, read, update, delete): ', operation => {
        switch (operation) {
            case 'create':
                rl.question('Enter data to create record(JSON Format): ', data => {
                    createRecord(JSON.parse(data), (err, record) => {
                        if (err) {
                            console.error(err);
                            crud();
                            return;
                        }
                        console.log('Created record:', record);
                        continueOperation();
                    });
                });
                break;
            case 'read':
                rl.question('Enter ID to read record (leave blank to read all records): ', id => {
                    if (id) {
                        readRecordById(id, (err, record) => {
                            if (err) {
                                console.error(err);
                                crud();
                                return;
                            }
                            console.log('Record:', record);
                            continueOperation();
                        });
                    } else {
                        readRecords((err, records) => {
                            if (err) {
                                console.error(err);
                                crud();
                                return;
                            }
                            console.log('All records:', records);
                            continueOperation();
                        });
                    }
                });
                break;
            case 'update':
                rl.question('Enter ID of record to update: ', id => {
                    rl.question('Enter new data (JSON format): ', newData => {
                        updateRecord(id, JSON.parse(newData), (err, updatedRecord) => {
                            if (err) {
                                console.error(err);
                                crud();
                                return;
                            }
                            console.log('Updated record:', updatedRecord);
                            continueOperation();
                        });
                    });
                });
                break;
            case 'delete':
                rl.question('Enter ID to delete record: ', id => {
                    deleteRecord(id, err => {
                        if (err) {
                            console.error(err);
                            crud();
                            return;
                        }
                        console.log('Record deleted successfully');
                        continueOperation();
                    });
                });
                break;
            default:
                console.log('Invalid operation. Please enter one of: create, read, update, delete');
                crud();
                break;
        }
    });
}

crud();
