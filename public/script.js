async function fetchTodos() {
    const res = await fetch("/todos");
    const todos = await res.json();
    const list = document.getElementById("todoList");
    list.innerHTML = "";
    todos.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo.text + (todo.completed ? " ✅" : "");
      li.onclick = () => toggleTodo(todo._id, !todo.completed);
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.onclick = (e) => {
        e.stopPropagation();
        deleteTodo(todo._id);
      };
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }
  
  async function addTodo() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();
    if (!text) return;
    await fetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    input.value = "";
    fetchTodos();
  }
  
  async function toggleTodo(id, completed) {
    await fetch(`/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    fetchTodos();
  }
  
  async function deleteTodo(id) {
    await fetch(`/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  }
  
  fetchTodos();
  