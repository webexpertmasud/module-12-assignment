const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const alertArea = document.getElementById("alertArea");

// Load from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    showAlert("Please enter a task!", "danger");
    return;
  }

  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  updateLocalStorage();
  renderTasks();
  taskInput.value = "";
  showAlert("Task added successfully!", "success");
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.cursor = "pointer";
    span.onclick = () => toggleTask(index);

    const btn = document.createElement("button");
    btn.className = "btn btn-sm btn-danger";
    btn.textContent = "Delete";
    btn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(btn);
    taskList.appendChild(li);
  });

  taskCount.textContent = tasks.length;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
  showAlert("Task deleted!", "warning");
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showAlert(message, type = "info") {
  alertArea.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
}
