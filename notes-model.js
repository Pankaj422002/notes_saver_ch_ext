const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, "Can't be Empty"],
    },
});

module.exports = mongoose.model("Note", NoteSchema, "notes");;
