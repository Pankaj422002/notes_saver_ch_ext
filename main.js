//Todo list app by Afolabi Sheriff
//features
//store in localstorage of browser

//delete list items
const BASE_URL = 'http://localhost:8000/api/todos'
var addButton = document.getElementById('addButton');
var addInput = document.getElementById('itemInput');
var todoList = document.getElementById('todoList');
var listArray = [];
//declare addToList function

function listItemObj(content, status) {
    this.content = '';
    this.id = '';
    this.status = 'incomplete';
}
var changeToComp = function () {
    var parent = this.parentElement;
    console.log('Changed to complete');
    parent.className = 'uncompleted well';
    this.innerText = 'Incomplete';
    this.removeEventListener('click', changeToComp);
    this.addEventListener('click', changeToInComp);
    changeListArray(parent.id, parent.firstChild.innerText, 'complete');

}

var changeToInComp = function () {
    var parent = this.parentElement;
    console.log('Changed to incomplete');
    parent.className = 'completed well';
    this.innerText = 'Complete';
    this.removeEventListener('click', changeToInComp);
    this.addEventListener('click', changeToComp);

    changeListArray(parent.id, parent.firstChild.innerText, 'incomplete');

}

var removeItem = async function () {
    var parent = this.parentElement.parentElement;
    var id = this.parentElement.id;
    if (!id) {
        console.log("id missing");
        return;
    }
    try {
        await axios.delete(`${BASE_URL}/${id}`)
        parent.removeChild(this.parentElement);
    } catch (error) {
        console.log(error);
        return;
    }

    for (var i = 0; i < listArray.length; i++) {
        console.log(listArray[i]);
        if (listArray[i].id == id) {
            listArray.splice(i, 1);
            refreshLocal();
            break;
        }
    }


}

//function to change the todo list array
var changeListArray = function (id, data, status) {

    for (var i = 0; i < listArray.length; i++) {

        if (listArray[i].id === id) {
            listArray[i].status = status;
            refreshLocal();
            break;
        }
    }
}

//function to chage the dom of the list of todo list
var createItemDom = function (id, text, status) {

    var listItem = document.createElement('li');

    var itemLabel = document.createElement('label');

    var itemCompBtn = document.createElement('button');

    var itemIncompBtn = document.createElement('button');

    listItem.className = (status == 'incomplete') ? 'completed well' : 'uncompleted well';
    listItem.id = id;
    itemLabel.innerText = text;
    itemCompBtn.className = 'btn btn-success';
    itemCompBtn.innerText = (status == 'incomplete') ? 'Complete' : 'Incomplete';
    if (status == 'incomplete') {
        itemCompBtn.addEventListener('click', changeToComp);
    } else {
        itemCompBtn.addEventListener('click', changeToInComp);
    }


    itemIncompBtn.className = 'btn btn-danger';
    itemIncompBtn.innerText = 'Delete';
    itemIncompBtn.addEventListener('click', removeItem);

    listItem.appendChild(itemLabel);
    listItem.appendChild(itemCompBtn);
    listItem.appendChild(itemIncompBtn);

    return listItem;
}

var refreshLocal = function () {
    var todos = listArray;
    console.log(todos);
    localStorage.removeItem('todoList');
    localStorage.setItem('todoList', JSON.stringify(todos));
}

var addToList = async function () {
    console.log('now adding todo to list');
    var newItem = new listItemObj();
    newItem.content = addInput.value.trim();
    if (!newItem.content)
        return

    // Add to database
    try {
        console.log("trying to add todo to database");
        const todo = await axios.post(`${BASE_URL}/`, { task: newItem.content })
        console.log(todo);
        if (todo.status === 200) {
            var item = createItemDom(todo.data.task._id, addInput.value, 'incomplete');
            newItem.id = item.id
            listArray.push(newItem);
            todoList.appendChild(item);
            addInput.value = '';
            //add to the local storage
            refreshLocal();
            return
        }
        console.log("Cann't add todo, try again");
    } catch (err) {
        console.log(err);
    }
    addInput.value = '';
}

//function to clear todo list array
var clearList = async function () {
    try {
        await axios.delete(`${BASE_URL}/`)
    } catch (error) {
        console.log(error);
        return;
    }
    listArray = [];
    localStorage.removeItem('todoList');
    todoList.innerHTML = '';

}

window.onload = function () {
    var list = localStorage.getItem('todoList');

    if (list != null) {
        todos = JSON.parse(list);
        listArray = todos;

        for (var i = 0; i < listArray.length; i++) {
            var data = listArray[i].content;
            var id = listArray[i].id;
            var item = createItemDom(id, data, listArray[i].status);
            todoList.appendChild(item);
        }

    }

};
//add an event binder to the button
addButton.addEventListener('click', addToList);
clearButton.addEventListener('click', clearList);
