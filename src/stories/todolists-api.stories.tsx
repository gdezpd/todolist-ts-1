import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolist()
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
        todolistAPI.createTodolist(title)
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
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data.toString );
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '66cc4440-4e08-4750-b012-72efcbb0a5d9'
        const title = 'What is yor name'
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '9a01676a-4b1b-490e-8554-c0867f3a01e0';
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items);
            })

    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '9a01676a-4b1b-490e-8554-c0867f3a01e0';
        const taskId = '';
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })

    }, [])


    return <div> {JSON.stringify(state)}</div>
}