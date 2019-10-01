var fs = require('fs');
// let thisGuy = fs.readFileSync('obligationJSON.json')
// let forManipulation = JSON.parse(thisGuy);
// console.log(forManipulation);

// const todos = [
//     { id: 1, priority: 1, name: "Have Doctor Check Mysterious Growth", due_date: "October 27, 2019", isComplete: true },
//     { id: 2, priority: 2, name: "Disopose of Evidence", due_date: "October 1, 2019", isComplete: true },
//     { id: 3, priority: 3, name: "Pay Off Witness", due_date: "November 1, 2019", isComplete: false },
//     { id: 4, priority: 4, name: "Buy New Lamp", due_date: "January 1, 2020", isComplete: false }
//   ];
// let nextId = 5;

const obligationService = {
    getObligations: function() {
        let toDoJSON = fs.readFileSync('obligationJSON.json')
        let returnJSON = JSON.parse(toDoJSON);
        return returnJSON.obligationDataComplete.concat(returnJSON.obligationDataIncomplete);
    },
    findById: function(id) {
        let toDoJSON = fs.readFileSync('obligationJSON.json')
        let returnJSON = JSON.parse(toDoJSON);
        let concatTodos = returnJSON.obligationDataComplete.concat(returnJSON.obligationDataIncomplete);
        return concatTodos.find(t => t.id === id);
    },
    findByStatus: function(status) {
        let toDoJSON = fs.readFileSync('obligationJSON.json')
        let returnJSON = JSON.parse(toDoJSON);
        if(status.toLowerCase().trim()  == "complete") {
            console.log(returnJSON.obligationDataComplete);
        } else if (status.toLowerCase().trim() == "incomplete") {
            console.log(returnJSON.obligationDataIncomplete);
        } else {
            console.log("Status must be either complete or incomplete");
        }
    },
    save: function(todo) {
        let toDoJSON = fs.readFileSync('obligationJSON.json')
        let returnJSON = JSON.parse(toDoJSON);
        let toDoArray = returnJSON.obligationData;
        if (todo.id) {
            const oldTodo = this.findById(todo.id);
            console.log(oldTodo);
            const index = toDoArray.indexOf(oldTodo);
            toDoArray.splice(index, 1, todo);
            // console.log(toDoArray);
        }
    },
    // save: function(todo) {
    //   if (todo.id) {
    //       const oldTodo = this.findById(todo.id);
    //       const index = todos.indexOf(oldTodo);
    //       todos.splice(index, 1, todo);
    //   } else {
    //       todos.id = nextId++;
    //       todos.push(todo);
    //   }
    // },
    destroy: function(id) {
        const oldTodo = this.findById(id);
        const index = todos.indexOf(oldTodo);
        todos.splice(index, 1);
    }
}

obligationService.findByStatus("Complete");

module.exports = obligationService;