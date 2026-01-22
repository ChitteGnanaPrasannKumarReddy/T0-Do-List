let todos = JSON.parse(localStorage.getItem("todos")) || [];

const itemName = document.getElementById("itemName");
const itemDate = document.getElementById("itemDate");
const itemPriority = document.getElementById("itemPriority");

//  Prevent selecting past dates (HTML level
itemDate.min = new Date().toISOString().split("T")[0];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addItem() {
  const name = itemName.value.trim();
  const date = itemDate.value;
  const priority = itemPriority.value;

  if (!name || !date || !priority) {
    alert("All fields are required");
    return;
  }

  //  Correct date comparison (no time bug)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    alert("You can not Enter past Date");
    return;
  }

  todos.push({
    name,
    date,
    priority,
    completed: false
  });

  saveTodos();
  renderTodos();

  itemName.value = "";
  itemDate.value = "";
  itemPriority.value = "";
}

function deleteItem(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function renderTodos() {
  const todayList = document.getElementById("todayList");
  const futureList = document.getElementById("futureList");
  const completedList = document.getElementById("completedList");

  todayList.innerHTML = "";
  futureList.innerHTML = "";
  completedList.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];

  todos.forEach((todo, index) => {
    const div = document.createElement("div");
    div.className = `task ${todo.completed ? "completed" : "active"}`;

    div.innerHTML = `
      <span>${todo.name}</span>
      <span>${todo.date}</span>
      <span>Priority: ${todo.priority}</span>
      <div class="actions">
        ${!todo.completed ? `<button onclick="toggleComplete(${index})">✔</button>` : ""}
        <button onclick="deleteItem(${index})">🗑</button>
      </div>
    `;

    if (todo.completed) {
      completedList.appendChild(div);
    } else if (todo.date === today) {
      todayList.appendChild(div);
    } else {
      futureList.appendChild(div);
    }
  });
}

renderTodos();

