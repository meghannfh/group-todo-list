const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/todos', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            todo: 'hjhkjhj',
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})


deleteButton.addEventListener('click', _ => {
    fetch('/todos',{
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            /*We are trying to delete the most recently added item on our database. How do we delete it without specificying explicity the name of what we are deleting? 
            The name changes each time we add something because it has a different object ID. */
            todo: todos[0] 
        })
    } )
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No task to delete') {
            messageDiv.textContent = 'No task to delete'
          } else {
        window.location.reload(true)
          }
    })
})
