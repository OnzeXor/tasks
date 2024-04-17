import { Database } from './middlewares/database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"


const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler:(req, res)=>{
            const tasks = database.select('tasks')
        
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler:(req, res)=>{
            const {title, description} = req.body
        const task ={
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            created_at: new Date().toLocaleString(),
            updated_at: null
        }

        database.insert('tasks', task)

        return res
        .writeHead(201)
        .end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res)=>{
            const { id,completed_at, created_at, } = req.params
            const { title, description} = req.body
            const teste = database.select('tasks') 
            console.log(teste)
            database.update('tasks', id, {
                title,
                description,
                completed_at,
                created_at,
                updated_at :new Date().toLocaleString()
            })



            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res)=>{
            const {id} = req.params
            
            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
]