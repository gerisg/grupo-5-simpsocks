const fs = require('fs');
const path = require('path');

let filePath;

function setup(tableName) {
    filePath = path.join(__dirname, `../data/${tableName}.json`);
}

function readFile() {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent ? JSON.parse(fileContent) : [];
}

function writeFile(contents) {
    fs.writeFileSync(filePath, JSON.stringify(contents, null, " "));
}

function nextId() {
    let rows = readFile();
    return rows.reduce((max,curr) => Math.max(max, curr.id),0) + 1;
}

let model = function(tableName) {
    setup(tableName);
    return {
        all() {
            return readFile();
        },
        find(id) {
            let rows = readFile();
            return rows.find(row => row.id == id);
        },
        findByField(field, value) {
            if(!field || !value) { return []; }
            let rows = readFile();
            return rows.find(row => row[field].toLowerCase() == value.toLowerCase());
        },
        findByFields(fields, value) {
            if(!fields || !value) { return []; }
            let rows = readFile();
            return rows.filter(row => 
                fields.find(field => 
                    row[field] && row[field].toLowerCase().includes(value.toLowerCase())
                ));
        },
        create(row) {
            row.id = nextId();
            let rows = readFile();
            rows.push(row);
            writeFile(rows);
            return row.id;
        },
        update(row) {
            let rows = readFile();
            let updatedRows = rows.map(r => r.id == row.id ? row : r);
            writeFile(updatedRows);
            return row.id;
        },
        delete(id) {
            let rows = readFile();
            let updatedRows = rows.filter(row => row.id != id);
            writeFile(updatedRows);
        }
    }
}

module.exports = model;