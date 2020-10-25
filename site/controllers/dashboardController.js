const path = require('path');

module.exports = {
    index: async (req,res) => {
        res.sendFile(path.join(__dirname, '../public/build', 'index.html'));
    }
}