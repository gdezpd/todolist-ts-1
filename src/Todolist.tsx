import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {filterType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (tasksID: string) => void
    filteredTasks: (filterValue: filterType) => void
    addTask: (title: string) => void
}


export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>('')

    const onClickAddTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        // if(e.key === 'Enter'){
        //     onClickAddTask()
        // }
        e.key === 'Enter' && onClickAddTask()
    }

    const setAllFilter = () => props.filteredTasks('All')
    const setActiveFilter = () => props.filteredTasks('Active')
    const setCompletedFilter = () => props.filteredTasks('Completed')
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onClickRemoveTask = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        const {currentTarget: {dataset: {id}}} = e
        if (id) {
            props.removeTasks(id)
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddTask}
            />
            <button onClick={onClickAddTask}>+</button>
        </div>
        <ul>
            {props.tasks.map((m) => {
                return (
                    <li key={m.id}>
                        <button data-id={m.id} onClick={onClickRemoveTask}>X</button>
                        <input type="checkbox" checked={m.isDone}/>
                        <span>{m.title}</span>
                    </li>
                )
            })}

        </ul>
        <div>
            <button onClick={setAllFilter}>All</button>
            <button onClick={setActiveFilter}>Active</button>
            <button onClick={setCompletedFilter}>Completed</button>
        </div>
    </div>
}