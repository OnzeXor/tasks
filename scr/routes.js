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
            const { id } = req.params
            let { title, description} = req.body
            const listaTasks = database.select('tasks').find(obj => obj.id === id);
            title ??= listaTasks.title
            description ??= listaTasks.description
            const { completed_at, created_at } = listaTasks  
            
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
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res)=>{
            const {id} = req.params
            const listaTasks = database.select('tasks').find(obj => obj.id === id);
            const { title, description, created_at, updated_at } = listaTasks
            database.update('tasks', id, {
                title,
                description,
                completed_at :new Date().toLocaleString(), 
                created_at,
                updated_at 
            })

            return res.writeHead(204).end()
        }
    }
]