const mongoose = require('mongoose');
function DBConnect() {
    const DB_URL = "mongodb://127.0.0.1:27017/NoteSaver"
    console.log(DB_URL);
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection Error'));
    db.once("open", () => {
        console.log("DB Connected..");
    });
}

module.exports = DBConnect;