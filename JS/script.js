const todoList = [];

class Todos {
    constructor(id, title, description, createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    console.log(event);
    const todoForm = document.getElementById('todoForm');
    const todoTitle = document.getElementById('todoTitle');
    const todoDescription = document.getElementById('todoDescription');
    const listContainer = document.getElementById('todoList');

    renderTodoList();

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (todoTitle.value.trim() && todoDescription.value.trim()) {
            const todoId = Math.floor(Math.random() * 101);
            const date = new Date();
            const newTodo = new Todos(todoId, todoTitle.value, todoDescription.value, date);
            todoList.push(newTodo);

            todoTitle.value = '';
            todoDescription.value = '';

            renderTodoList();
        } else {
            alert('Fields Required....');
        }
    });

    function renderTodoList() {
        listContainer.innerHTML = '';

        if (todoList.length) {
            todoList.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.title}: ${item.description}</span>
                    <span style="color: red; cursor: pointer; margin-left: 10px;" data-id="${item.id}" class="delete-btn">[Delete]</span>
                    <span style="color: green; cursor: pointer; margin-left: 10px;" data-id="${item.id}" class="edit-btn">[Edit]</span>
                `;
                listContainer.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No Todos To show';
            listContainer.appendChild(li);
        }
    }

    listContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const todoId = parseInt(event.target.getAttribute('data-id'), 10);
            deleteTodoById(todoId);
        } else if (event.target.classList.contains('edit-btn')) {
            const todoId = parseInt(event.target.getAttribute('data-id'), 10);
            editTodoById(todoId);
        }
    });

    function deleteTodoById(todoId) {
        const todoIndex = todoList.findIndex(todo => todo.id === todoId);
        if (todoIndex > -1) {
            todoList.splice(todoIndex, 1);
            renderTodoList();
        }
    }

    function editTodoById(todoId) {
        const todoItem = todoList.find(todo => todo.id === todoId);
        if (todoItem) {
            const newTitle = prompt('Enter new title:', todoItem.title);
            const newDescription = prompt('Enter new description:', todoItem.description);
            if (newTitle !== null && newDescription !== null) {
                todoItem.title = newTitle;
                todoItem.description = newDescription;
                renderTodoList();
            }
        }
    }
});
