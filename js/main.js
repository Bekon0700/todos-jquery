// get the size of the todos list
let index = $('todo-list').length;
let todoList = []
getFromStorage()


// get data from the form and add to the list
$('#form').on('submit', function (e) {
    e.preventDefault()
    const data = $('#todoInput').val()
    // $('.todo-list').append(makeList(data, index+1, false))
    index++;
    $('#todoInput').val('')
    todoList = [
        ...todoList,
        {
            title: data,
            isCompleted: false,
            id: index
        }
    ]
    const btnName = $('.active-btn').text()
    if (btnName == 'All task') {
        $('.todo-list').empty()
        todoList.forEach(el => $('.todo-list').append(makeList(el.title, el.id, el.isCompleted)))
    } else if(btnName == 'All incompleted task') {
        $('.todo-list').empty()
        todoList.forEach(el => !el.isCompleted && $('.todo-list').append(makeList(el.title, el.id, el.isCompleted)))
    }
    saveToStorage(todoList)
})


// delete an item from the todos list
$(document).on('click', '.btn-delete', function () {
    const id = $(this).data('id')
    todoList = todoList.filter(el => el.id != id)
    $(`#todo-${id}`).remove()
    saveToStorage(todoList)

})

// Mark an item as completed
$(document).on('click', '.btn-complete', function () {
    const titleId = $(this).data('id')

    const Completed = 'Mark as complete'
    const inCompleted = 'Mark as incomplete'

    const btnName = $('.active-btn').text()
    if ($(this).text() == inCompleted) {
        todoList = todoList.map(el => {
            if (el.id == titleId) {
                el.isCompleted = false
            }
            return el
        })
        $(this).text(Completed)
        if (btnName == 'All completed task') {
            $('.todo-list').empty()
            todoList.forEach(el => el.isCompleted && $('.todo-list').append(makeList(el.title, el.id, el.isCompleted)))
        }
        saveToStorage(todoList)
    } else {
        todoList = todoList.map(el => {
            if (el.id == titleId) {
                el.isCompleted = true
            }
            return el
        })
        $(this).text(inCompleted)
        if (btnName == 'All incompleted task') {
            $('.todo-list').empty()
            todoList.forEach(el => !el.isCompleted && $('.todo-list').append(makeList(el.title, el.id, el.isCompleted)))
        }
        saveToStorage(todoList)
    }

    $(`#title-${titleId}`).toggleClass('completed')
})

// find all completed task
$('.btn-all').on('click', function () {
    $('.todo-list').empty()
    $('.btn-all').removeClass('active-btn')
    $(this).addClass('active-btn')
    const btnName = $(this).text()
    if (btnName == 'All task') {
        todoList.forEach(el => $('.todo-list').append(makeList(el.title, el.id, el.isCompleted)))
        // $('todo-list')
    } else if (btnName == 'All completed task') {
        todoList.forEach(el => el.isCompleted && $('.todo-list').append(makeList(el.title, el.id, el.isCompleted)))
    } else if (btnName == 'All incompleted task') {
        todoList.forEach(el => !el.isCompleted && $('.todo-list').append(makeList(el.title, el.id, el.isCompleted)))
    }
})


// Add new item to the todos list
function makeList(val, id, status) {
    const list = `
    <li class="list-item" id="todo-${id}">
        <p class="todo ${status && 'completed'}" id='title-${id}'>${val}</p>
        <div class="btn-container">
            <button class="btn btn-complete" data-id='${id}'>${status ? 'Mark as incomplete' : 'Mark as complete'}</button>
            <button class="btn btn-delete" data-id="${id}">Delete</button>
        </div>
    </li>`
    return list
}

function saveToStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}
function getFromStorage() {
    const todos = JSON.parse(localStorage.getItem('todos'))
    todoList = [
        ...todoList,
        ...todos
    ]
    todoList.forEach(el => $('.todo-list').append(makeList(el.title, el.id, el.isCompleted)))
}