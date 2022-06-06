const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const PORT = 5000

const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb+srv://meg:nagaI2021@cluster0.hkmfzai.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('todo-list')
    const todoCollection = db.collection('todos')
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static('public'))
    app.use(bodyParser.json())

    app.get('/', (req, res) => {
      todoCollection.find().toArray()
      .then(results => {
        res.render('index.ejs', { todos: results })
      })
      .catch(error => {console.error(error)})
    })

    app.post('/todos', (req, res) => {
      todoCollection.insertOne(req.body)
      .then(result => {
        console.log(result)
        res.redirect('/')
      })
      .catch(error => console.error(error))
    })


    app.delete('/todos',(req,res) => {
        todoCollection.deleteOne(
        {todos: req.body.todo}
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No event on schedule')
              }
            res.json("You have completed your tasks!")
        })
        .catch(error => console.error(error))
    })

    app.listen(PORT, ()=>{
      console.log(`the server is running on ${PORT}`)
    })
  })
  .catch(error => console.error(error))


