$('.btn-delete').click(function(){
    alert('deleted button pressed')
})

$('#form').submit(function(e){
    e.preventDefault()
    const data = $('#todoInput').val()
    $('.todo-list').append(makeList(data))
    $('#todoInput').val('')
})


$('.btn-delete').click(() => {
    $
})

function makeList(val){
    const list = `
    <li class="list-item">
        <p class="todo">${val}</p>
        <div class="btn-container">
            <button class="btn btn-complete">mark as complete</button>
            <button class="btn btn-delete">Delete</button>
        </div>
    </li>`
    return list
}