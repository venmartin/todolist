var todos = [];

// Selectors

const submitButton = document.getElementById("todo-btn");
const displayButton = document.getElementById("display-btn");
const editButton = document.getElementById("edit-btn");
// const removeButton = document.getElementById('remove-btn');
const toggleAllButton = document.getElementById("toggleAll-btn");

const delBtn = document.getElementsByClassName("delete-btn");
const editBtn = document.getElementsByClassName("edit-btn");
const togBtnOn = document.getElementsByClassName("toggle-on-btn");
const togBtnOff = document.getElementsByClassName("toggle-off-btn");

// Todo list specific selectors

const inputTodo = document.getElementById("todo-input");

// Event Listeners

submitButton.addEventListener("click", addTodo);
// displayButton.addEventListener('click', displayTodos);
// editButton.addEventListener('click', edit);
// removeButton.addEventListener('click', remove);
// toggleAllButton.addEventListener('click', toggleAll);

// Create UUID for each list item.

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

// Function to add todos

function addTodo(initialTodoText) {
  if (inputTodo.value.trim() === "") {
    alert("You must enter a todo item.");
    return;
  }

  // Finds the UL and creates the Li element

  let todoUl = document.getElementById("todo-list");
  let todoLi = document.createElement("li");
  let todoLiEdit = document.createElement("input");
  todoLiEdit.setAttribute("type", "text");
  todoLiEdit.id = "input-edit";

  // Creates a div for li element and buttons to sit in

  let liDiv = document.createElement("div");
  liDiv.classList.add("todo-div-li");

  // Delete Button

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.addEventListener("click", remove);

  // Toggle Button

  let toggleOnButton = document.createElement("button");
  toggleOnButton.classList.add("toggle-on-btn");
  toggleOnButton.innerHTML = '<i class="fas fa-toggle-on"></i>';
  toggleOnButton.addEventListener("click", toggle);

  // Toggle Button Div

  let toggleBtn = document.createElement("div");
  toggleBtn.classList.add("button");
  toggleBtn.classList.add("r");
  toggleBtn.classList.add("center");
  toggleBtn.id = "togBtn";
  let toggleBox = document.createElement("input", "checkbox");
  toggleBox.setAttribute("type", "checkbox");
  toggleBox.classList.add("checkbox");
  let toggleKnob = document.createElement("div");
  toggleKnob.classList.add("knobs");
  let toggleLayer = document.createElement("div");
  toggleLayer.classList.add("layer");

  toggleBtn.addEventListener("click", toggle);

  // Edit Button

  let editButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.addEventListener("click", edit);

  initialTodoText = inputTodo.value;

  todos.push(initialTodoText);

  // Appends the li, div and buttons to the UL.

  todoUl.appendChild(liDiv);
  liDiv.appendChild(todoLi);
  todoLi.appendChild(todoLiEdit);

  // toggle div button

  liDiv.appendChild(toggleBtn);
  toggleBtn.appendChild(toggleBox);
  toggleBtn.appendChild(toggleKnob);
  toggleBtn.appendChild(toggleLayer);

  // Edit and Delete Buttons at the end of div.
  liDiv.appendChild(editButton);
  liDiv.appendChild(deleteButton);

  todoLi.innerText = initialTodoText;

  let uuid = create_UUID();
  liDiv.id = uuid;
  let uuid_li = create_UUID();
  todoLi.id = uuid_li;

  // Input value is reset.

  inputTodo.value = "";
}

// MUST WORK ON THIS //
//
//
//
// // // // // // // //
function edit(event) {
  let idOfDiv = event.target.parentNode.id;
  let liDiv = document.getElementById(idOfDiv);
  let todoLi = liDiv.firstChild;

  // Change Todo item with prompt.

  // let todoPrompt = prompt('Please enter your new todo item.'); -- Original prompt that works

  // Change Todo Item with input.

  // todoLi.innerText = todoPrompt; -- Original prompt inner text


  // Changing Todo Item with bootbox.

  bootbox.prompt({
    size: "small",
    title: "Change your todo.",
    callback: function (result) {
      if (result === null) {
        // Cancel was clicked
        bootbox.alert({
          size: "small",
          title: "Cancelled",
          message: "You cancelled input",
        });
        return;
      }

      bootbox.alert({
        size: "small",
        title: "Updated",
        message: "Your Todo item is now " + result + "!",
      });
      todoLi.innerText = result;
    },
  });
}

// Function to remove todos from the list

function remove(event) {
  let item = event.target;
  // let idOfLi = event.target.parentNode.id;
  
  if (item.classList[0] === 'delete-btn') {
    let itemTodo = event.target.parentNode;
    itemTodo.classList.add('fall');
    itemTodo.addEventListener('transitionend', function() {
      itemTodo.remove();
  })
}

  // document.getElementById(idOfLi).remove();
}

// Toggle a single todo item

function toggle(e) {
  const item = e.target;

  if (item.classList[0] === "checkbox") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed-task");
  }

  if (item.classList[0] === "completed-task") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("checkbox");
  }
}

// Displays the todo items

function displayTodos() {
  for (var i = 0; i < todos.length; i++) {
    console.log(todos[i]);
  }
}

// Toggles all the todos to either completed or incomplete

function toggleAll() {
  var completedTodos = 0;

  for (var i = 0; i < todos.length; i++) {
    if (todos[i].completed === true) {
      completedTodos++;
    }
  }

  if (completedTodos === todos.length) {
    for (var i = 0; i < todos.length; i++) {
      todos[i].completed = false;
    }
  } else {
    for (var i = 0; i < todos.length; i++) {
      todos[i].completed = true;
    }
  }

  displayTodos();
}