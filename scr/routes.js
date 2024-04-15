import { Database } from './middlewares/database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"


const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler:(req, res)=>{
            const tasks = database.select('tasks')
        
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler:(req, res)=>{
            const {title, description,completed_at, updated_at} = req.body
        const task ={
            id: randomUUID(),
            title,
            description,
            completed_at,
            created_at: new Date().toLocaleString(),
            updated_at
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
            const { id } = req.params
            const { title, description, completed_at, created_at, } = req.body
            database.update('tasks', id, {
                title,
                description,
                completed_at,
                created_at,
                updated_at :new Date().toLocaleString()
            })

            return res.writeHead(204)
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/'),
        handler: (req, res)=>{
            console.log('aaaa')
            return res.writeHead(204)
        }
    },
]