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

// deleteButton.addEventListener('click', deleteTodo)

// async function deleteTodo(){
//     const tName = this.parentNode.childNodes[1].innerText
//     try{
//         const response = await fetch('deleteTodo', {
//             //need to change the path in app.delete in server.js
//             //to /deleteTodo 
//             method: 'delete',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 todo: tName
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.error(err)
//     }
// }


deleteButton.addEventListener('click', _ => {
    fetch('/todos',{
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
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
