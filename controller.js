const { ObjectId } = require("mongodb");
const notesModel = require("./notes-model");

const todoController = {
    create: async (req, res) => {
        const { task } = req.body;
        try {
            const dbTask = await notesModel.create({ task })
            res.status(200).json({ msg: "Added Successfully", task: dbTask })
        } catch (err) {
            res.status(400).json({ msg: 'todo can not be created, try again', err })
        }
    },
    findAll: (req, res) => {
        console.log("Get all todos");
    },
    update: (req, res) => {
        const id = req.params.id
        console.log("Update a Todos with id");
    },
    delete: async (req, res) => {
        const id = req.params.id
        try {
            await notesModel.deleteOne({ _id: ObjectId(id) })
            res.json(200).json({ msg: "Task Deleted Successfully" })
        } catch (error) {
            console.log(error);
            res.json(500).json({ error, msg: "Task not deleted, Try again" })
        }
    },
    deleteAll: async (req, res) => {
        try {
            await notesModel.deleteMany({});
            res.status(200).json({ msg: "All tasks Deleted Successfully" })
        } catch (error) {
            console.log(error);
            res.json(500).json({ error, msg: "Can't Delete" })
        }
    }
};
module.exports = todoController