module.exports = app => {
    const Todos = require("./controller");
  
    var router = require("express").Router();
  
    // Create a new Todos
    router.post("/", Todos.create);
  
    // Retrieve all Todos
    router.get("/", Todos.findAll);
  
    // Update a Todos with id
    router.put("/:id", Todos.update);
  
    // Delete a Todos with id
    router.delete("/:id", Todos.delete);
  
    // Delete all Todos
    router.delete("/", Todos.deleteAll);
  
    app.use('/api/todos', router);
  };
  