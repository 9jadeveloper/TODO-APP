// DOM Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event) {

    // prevent form from submitting
    event.preventDefault();

    // create todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create li for newTodo
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    // add new li to todoDiv
    todoDiv.appendChild(newTodo)

    // add todo to local storage
    saveLocalTodos(todoInput.value);

    // create checkmark button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>'
    checkButton.classList.add('check-button');

    // add check button to todoDiv
    todoDiv.appendChild(checkButton);

    // create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-button');

    // add delete button to todoDiv
    todoDiv.appendChild(deleteButton);

    // add todo div to the ul
    todoList.appendChild(todoDiv);

    // clear todo input value
    todoInput.value = '';
}

// delete function
function deleteTodo (e) {
    const item = e.target;

    // delete todo
    if(item.classList[0] === "delete-button") {
        const todo = item.parentElement;

        // animation
        todo.classList.add('fall')
        deleteLocalTodos(todo);
        todo.addEventListener('trasitionend', function() {
            todo.remove();
        });
    }

    // check todo
    if(item.classList[0] === "check-button") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
            todo.style.display = "flex";
            break;
            case "completed":
            if(todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
            break;
            case "uncompleted":
            if(!todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
            break;
        }
    });
}

function saveLocalTodos(todo) {
    // check if we already have todos
    let todos;
    if(localStorage.getItem("todos") === null ) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
    
  // check if we already have todos
  let todos;
  if(localStorage.getItem("todos") === null ) {
      todos = [];
  } else {
      todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  todos.forEach(function(todo){

    // create todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create li for newTodo
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');

    // add new li to todoDiv
    todoDiv.appendChild(newTodo)

    // create checkmark button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>'
    checkButton.classList.add('check-button');

    // add check button to todoDiv
    todoDiv.appendChild(checkButton);

    // create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-button');

    // add delete button to todoDiv
    todoDiv.appendChild(deleteButton);

    // add todo div to the ul
    todoList.appendChild(todoDiv);
  });
}

function deleteLocalTodos(todo) {
      // check if we already have todos
  let todos;
  if(localStorage.getItem("todos") === null ) {
      todos = [];
  } else {
      todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex= todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  }