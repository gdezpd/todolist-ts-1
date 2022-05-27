import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodos()
            .then((res) => {
                setState(res.data);
            })

    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "angular"
        todolistAPI.createTodo(title)
            .then((res) => {
                setState(res.data.data.item);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '9a01676a-4b1b-490e-8554-c0867f3a01e0';
        todolistAPI.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '66cc4440-4e08-4750-b012-72efcbb0a5d9'
        const title = 'What is yor name'
        todolistAPI.updateTodo(todolistId, title)
            .then((res) => {
                setState(res.data.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
