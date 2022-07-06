import express, { json } from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import { urlencoded } from 'body-parser'
require('dotenv').config()
const app = express()
const PORT = 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())

let connectionString = process.env.DB_STRING


MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('todo-list')
    const todoCollection = db.collection('todos')

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
          { todos : req.body.todo }
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No task to delete')
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


