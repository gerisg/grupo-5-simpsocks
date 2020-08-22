const fs = require('fs');
const path = require('path');

let model = function(tableName) {
    return {
        filePath: path.join(__dirname, `../data/${tableName}.json`),
        readFile() {
            const fileContent = fs.readFileSync(this.filePath, 'utf8');
            return fileContent ? JSON.parse(fileContent) : [];
        },
        writeFile(contents) {
            fs.writeFileSync(this.filePath, JSON.stringify(contents, null, " "));
        },
        nextId() {
            let rows = this.readFile();
            return rows.reduce((max,curr) => Math.max(max, curr.id),0) + 1;
        },
        all() {
            return this.readFile();
        },
        find(id) {
            let rows = this.readFile();
            return rows.find(row => row.id == id);
        },
        findByField(field, value) {
            if(!field || !value) { return []; }
            let rows = this.readFile();
            return rows.filter(row => row[field] == value);
        },
        findByFields(fields, value) {
            if(!fields || !value) { return []; }
            let rows = this.readFile();
            return rows.filter(row => 
                fields.find(field => 
                    row[field] && row[field].toLowerCase().includes(value.toLowerCase())
                ));
        },
        create(row) {
            row.id = this.nextId();
            let rows = this.readFile();
            rows.push(row);
            this.writeFile(rows);
            return row.id;
        },
        update(row) {
            let rows = this.readFile();
            let updatedRows = rows.map(r => r.id == row.id ? row : r);
            this.writeFile(updatedRows);
            return row.id;
        },
        delete(id) {
            let rows = this.readFile();
            let updatedRows = rows.filter(row => row.id != id);
            this.writeFile(updatedRows);
        }
    }
}

module.exports = model;